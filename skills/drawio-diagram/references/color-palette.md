# Color Palette & Brand Style

**This is the single source of truth for all colors and brand-specific styles.** To customize diagrams for your own brand, edit this file — everything else in the skill is universal.

---

## Shape Colors (Semantic)

Colors encode meaning, not decoration. Each semantic purpose has a fill/stroke/font color triple for use in draw.io style strings.

| Semantic Purpose | fillColor | strokeColor | fontColor |
|------------------|-----------|-------------|-----------|
| Primary/Neutral | `#3b82f6` | `#1e3a5f` | `#ffffff` |
| Secondary | `#60a5fa` | `#1e3a5f` | `#1e3a5f` |
| Tertiary | `#93c5fd` | `#1e3a5f` | `#1e3a5f` |
| Start/Trigger | `#fed7aa` | `#c2410c` | `#7c2d12` |
| End/Success | `#a7f3d0` | `#047857` | `#064e3b` |
| Warning/Reset | `#fee2e2` | `#dc2626` | `#7f1d1d` |
| Decision | `#fef3c7` | `#b45309` | `#78350f` |
| AI/LLM | `#ddd6fe` | `#6d28d9` | `#3b0764` |
| Inactive/Disabled | `#dbeafe` | `#1e40af` | `#1e3a5f` (use `dashed=1;`) |
| Error | `#fecaca` | `#b91c1c` | `#7f1d1d` |

**Rule**: Always pair a darker stroke with a lighter fill for contrast.

---

## Text Colors (Hierarchy)

Use `fontColor` on free-floating text cells to create visual hierarchy without containers.

| Level | fontColor | Use For |
|-------|-----------|---------|
| Title | `#1e40af` | Section headings, major labels |
| Subtitle | `#3b82f6` | Subheadings, secondary labels |
| Body/Detail | `#64748b` | Descriptions, annotations, metadata |
| On light fills | `#374151` | Text inside light-colored shapes |
| On dark fills | `#ffffff` | Text inside dark-colored shapes |

---

## Evidence Artifact Colors

Used for code snippets, data examples, and other concrete evidence inside technical diagrams.

| Artifact | fillColor | fontColor | Notes |
|----------|-----------|-----------|-------|
| Code snippet | `#1e293b` | `#e2e8f0` | Use `fontFamily=Courier New` or monospace |
| JSON/data example | `#1e293b` | `#22c55e` | Green text on dark background |
| Highlight/emphasis | `#1e293b` | `#facc15` | Yellow for key values |

Use `align=left;whiteSpace=wrap;` for code blocks so text wraps correctly.

---

## Default Stroke & Line Colors

| Element | strokeColor |
|---------|-------------|
| Arrows | Match the stroke color of the source element's semantic purpose |
| Structural lines (dividers, timelines) | `#64748b` (slate) |
| Marker dots (fill + stroke) | `#3b82f6` (primary fill) |
| Container/group borders | `#94a3b8` with `dashed=1;` |

---

## Background

| Property | Value |
|----------|-------|
| Canvas background | `#ffffff` |

---

## Complete Style String Examples

Copy these as starting points, then adjust colors based on semantic purpose:

**Primary shape (process/action):**
```
rounded=1;whiteSpace=wrap;html=1;fillColor=#3b82f6;strokeColor=#1e3a5f;fontColor=#ffffff;fontSize=14;strokeWidth=2;
```

**Start/trigger ellipse:**
```
ellipse;whiteSpace=wrap;html=1;fillColor=#fed7aa;strokeColor=#c2410c;fontColor=#7c2d12;fontSize=14;strokeWidth=2;
```

**Decision diamond:**
```
rhombus;whiteSpace=wrap;html=1;fillColor=#fef3c7;strokeColor=#b45309;fontColor=#78350f;fontSize=13;strokeWidth=2;
```

**Free-floating section title:**
```
text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontSize=22;fontStyle=1;fontColor=#1e40af;
```

**Free-floating subtitle:**
```
text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontSize=14;fontColor=#3b82f6;
```

**Free-floating body text:**
```
text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;fontSize=12;fontColor=#64748b;
```

**Code snippet block:**
```
rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#334155;fontColor=#e2e8f0;fontSize=12;align=left;verticalAlign=top;strokeWidth=1;
```

**JSON/data block:**
```
rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#334155;fontColor=#22c55e;fontSize=12;align=left;verticalAlign=top;strokeWidth=1;
```

**Container/group (dashed border):**
```
rounded=1;whiteSpace=wrap;html=1;fillColor=none;strokeColor=#94a3b8;fontSize=14;dashed=1;dashPattern=8 8;strokeWidth=1;verticalAlign=top;
```

**Small marker dot:**
```
ellipse;fillColor=#3b82f6;strokeColor=#1e3a5f;
```

**Primary arrow:**
```
edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;strokeColor=#1e3a5f;strokeWidth=2;endArrow=block;endFill=1;
```
