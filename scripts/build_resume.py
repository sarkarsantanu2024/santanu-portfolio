"""Builds the downloadable CV from the site's own data, so the PDF can't drift
from the website.

    npm run resume        (or: python scripts/build_resume.py)

Sources: data/siteData.json, data/caseStudies.json, data/resume.json (CV-only
content). Output path comes from nav.resume.href in siteData.json.
Requires: pip install reportlab
"""
import json
import re
import sys
from datetime import date
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parent.parent
INK = HexColor("#111827")
BODY = HexColor("#374151")
MUTED = HexColor("#6B7280")
RULE = HexColor("#CBD5E1")
ACCENT = HexColor("#0B5394")
ACCENT_HEX = "#0B5394"

MARGIN_X = 16 * mm
WIDTH = A4[0] - 2 * MARGIN_X - 12  # the frame pads 6pt each side

MONTHS = {m: i + 1 for i, m in enumerate(
    "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split())}


def load(name):
    return json.loads((ROOT / "data" / name).read_text(encoding="utf-8"))


def esc(text):
    """Escape for ReportLab markup; the built-in fonts have no arrow glyph."""
    text = str(text).replace("→", "to")
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def link(href, label=None):
    label = label or re.sub(r"^https?://(www\.)?", "", href).rstrip("/")
    return f'<a href="{esc(href)}" color="{ACCENT_HEX}">{esc(label)}</a>'


def career_years(roles, today=None):
    """Whole years since the earliest role on the site (same rule as lib/career.js)."""
    today = today or date.today()
    starts = []
    for role in roles:
        m = re.match(r"\s*([A-Za-z]{3})\w*\s+(\d{4})", role["period"])
        if m and m.group(1).title() in MONTHS:
            starts.append((int(m.group(2)), MONTHS[m.group(1).title()]))
    year, month = min(starts)
    return today.year - year - (1 if today.month < month else 0)


def style(name, **kw):
    base = dict(fontName="Helvetica", fontSize=9.4, leading=13, textColor=BODY)
    base.update(kw)
    return ParagraphStyle(name, **base)


S = {
    "name": style("name", fontName="Helvetica-Bold", fontSize=23, leading=27, textColor=INK),
    "headline": style("headline", fontName="Helvetica-Bold", fontSize=11, leading=15, textColor=ACCENT),
    "contact": style("contact", fontSize=9, leading=13, textColor=BODY),
    "section": style("section", fontName="Helvetica-Bold", fontSize=9.6, leading=12, textColor=ACCENT),
    "body": style("body"),
    "role": style("role", fontName="Helvetica-Bold", fontSize=10.2, leading=13.5, textColor=INK),
    "sub": style("sub", fontSize=9.2, leading=12.5, textColor=MUTED),
    "right": style("right", fontSize=9, leading=13.5, textColor=MUTED, alignment=TA_RIGHT),
    "bullet": style("bullet", leftIndent=10, bulletIndent=1, spaceBefore=1.5),
    "label": style("label", fontName="Helvetica-Bold", fontSize=9.2, textColor=INK),
}


def section(title):
    return [
        Spacer(1, 9),
        Paragraph(esc(title.upper()), S["section"]),
        HRFlowable(width="100%", thickness=0.8, color=ACCENT, spaceBefore=2, spaceAfter=5),
    ]


def split_row(left, right, right_width=46 * mm):
    table = Table(
        [[Paragraph(left, S["role"]), Paragraph(esc(right), S["right"])]],
        colWidths=[WIDTH - right_width, right_width], hAlign="LEFT",
    )
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return table


def bullets(items):
    return [Paragraph(esc(b), S["bullet"], bulletText="•") for b in items]


def footer(name):
    def draw(canvas, doc):
        canvas.saveState()
        canvas.setFont("Helvetica", 7.5)
        canvas.setFillColor(MUTED)
        canvas.drawString(MARGIN_X, 9 * mm, f"{name} · Curriculum Vitae")
        canvas.drawRightString(A4[0] - MARGIN_X, 9 * mm, f"Page {doc.page}")
        canvas.restoreState()
    return draw


def build():
    site = load("siteData.json")
    cases = load("caseStudies.json")
    cv = load("resume.json")

    name = site["nav"]["brand"]
    roles = site["experience"]["roles"]
    years = career_years(roles)
    contact = {c["icon"]: c for c in site["contact"]["items"]}
    socials = {s["label"]: s["href"] for s in site.get("socials", [])}
    linkedin = socials.get("LinkedIn") or site["contact"]["secondaryCta"]["href"]

    story = [
        Paragraph(esc(name), S["name"]),
        Paragraph(esc(cv["headline"]), S["headline"]),
        Spacer(1, 3),
    ]
    line = [esc(contact["location_on"]["value"]),
            link(contact["phone"]["href"], contact["phone"]["value"]),
            link(contact["email"]["href"], contact["email"]["value"])]
    story.append(Paragraph("  |  ".join(line), S["contact"]))
    web = [link(linkedin)]
    if socials.get("Portfolio"):
        web.append(link(socials["Portfolio"]))
    story.append(Paragraph("  |  ".join(web), S["contact"]))

    story += section("Professional Summary")
    story.append(Paragraph(esc(cv["summary"].replace("{years}", str(years))), S["body"]))

    story += section("Technical Skills")
    rows = [
        [Paragraph(esc(g["heading"]), S["label"]), Paragraph(esc(", ".join(g["items"])), S["body"])]
        for g in site["skills"]["groups"] + cv.get("extraSkills", [])
    ]
    skills = Table(rows, colWidths=[48 * mm, WIDTH - 48 * mm], hAlign="LEFT")
    skills.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 1.5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5),
    ]))
    story.append(skills)

    def role_block(role):
        extra = next((v for k, v in cv.get("extraBullets", {}).items()
                      if role["company"].startswith(k)), [])
        return KeepTogether([
            split_row(esc(role["title"]), role["period"]),
            Paragraph(esc(role["company"]), S["sub"]),
            *bullets(role["bullets"] + extra),
            Spacer(1, 7),
        ])

    story += section("Professional Experience")
    story.append(role_block(roles[0]))

    products = cv["products"]
    story.append(KeepTogether([
        split_row(esc(products["heading"]), products["period"]),
        Paragraph(esc(products["company"]), S["sub"]),
        Spacer(1, 2),
        Paragraph(esc(cases["roleStatement"]), S["body"]),
        Spacer(1, 5),
    ]))
    for item in cases["items"]:
        head = f'{esc(item["title"])} <font name="Helvetica" color="#374151">– {esc(item["kicker"])}</font>'
        meta = [link(item["links"]["live"])] if item.get("links", {}).get("live") else []
        meta.append(esc(", ".join(item["tags"])))
        points = products["bullets"].get(item["slug"]) or [item["summary"]]
        story.append(KeepTogether([
            split_row(head, item["status"], right_width=50 * mm),
            Paragraph("  |  ".join(meta), S["sub"]),
            *bullets(points),
            Spacer(1, 6),
        ]))

    for role in roles[1:] + cv.get("earlierRoles", []):
        story.append(role_block(role))

    story += section("Selected Client Projects")
    for p in site["projects"]["items"] + cv.get("moreProjects", []):
        head = esc(p["title"])
        if p.get("url"):
            head += f'  <font name="Helvetica" size="9">{link(p["url"])}</font>'
        story.append(KeepTogether([
            split_row(head, p.get("year", ""), right_width=24 * mm),
            Paragraph(f'{esc(p["description"])} <font color="#6B7280">{esc(" · ".join(p["tags"]))}</font>', S["body"]),
            Spacer(1, 4),
        ]))

    tail = section("Education & Additional")
    for e in cv["education"]:
        tail.append(split_row(
            f'{esc(e["title"])} <font name="Helvetica" color="#374151">– {esc(e["school"])}</font>',
            e["year"], right_width=20 * mm))
    tail.append(Spacer(1, 4))
    if cv.get("certifications"):
        tail.append(Paragraph(f'<b>Certifications:</b> {esc(", ".join(cv["certifications"]))}', S["body"]))
    if cv.get("languages"):
        tail.append(Paragraph(f'<b>Languages:</b> {esc(", ".join(cv["languages"]))}', S["body"]))
    story.append(KeepTogether(tail))

    out = ROOT / "public" / site["nav"]["resume"]["href"].lstrip("/")
    out.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(out), pagesize=A4,
        leftMargin=MARGIN_X, rightMargin=MARGIN_X, topMargin=14 * mm, bottomMargin=16 * mm,
        title=f"{name} – CV", author=name, subject=cv["headline"],
        keywords="Frontend Architect, Senior Frontend Engineer, React, Next.js, Vue, TypeScript, Headless Drupal",
    )
    draw = footer(name)
    doc.build(story, onFirstPage=draw, onLaterPages=draw)
    print(f"Wrote {out.relative_to(ROOT)} ({doc.page} pages, {years}+ years)")


if __name__ == "__main__":
    sys.exit(build())
