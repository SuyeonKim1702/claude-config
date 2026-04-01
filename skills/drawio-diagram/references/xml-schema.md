# draw.io XML Schema Reference

## File Structure

```xml
<mxGraphModel dx="1422" dy="762" grid="1" gridSize="10" guides="1"
              tooltips="1" connect="1" arrows="1" fold="1"
              page="0" pageScale="1" pageWidth="1654" pageHeight="1169"
              math="0" shadow="0">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />
    <!-- shape and edge cells here -->
  </root>
</mxGraphModel>
```

**Always required:**
- `id="0"` and `id="1"` cells must be first inside `<root>`
- All top-level cells have `parent="1"`
- Cells nested inside a container have `parent="container_id"`

---

## Cell Types

| Cell Type | Key Attributes |
|-----------|----------------|
| Shape (vertex) | `vertex="1"` |
| Edge (arrow/connection) | `edge="1"` + `source="id"` + `target="id"` |
| Container (swimlane, group) | `vertex="1"` + children use `parent="this_id"` |

---

## Shape Cell

```xml
<mxCell id="UNIQUE_ID" value="Label Text"
        style="STYLE_STRING"
        vertex="1" parent="1">
  <mxGeometry x="X" y="Y" width="W" height="H" as="geometry" />
</mxCell>
```

## Edge Cell

```xml
<mxCell id="UNIQUE_ID" value="Optional Label"
        style="EDGE_STYLE"
        edge="1" source="SOURCE_ID" target="TARGET_ID" parent="1">
  <mxGeometry relative="1" as="geometry" />
</mxCell>
```

Edge with explicit waypoints:
```xml
<mxCell id="edge1" value="" style="edgeStyle=orthogonalEdgeStyle;"
        edge="1" source="a" target="b" parent="1">
  <mxGeometry relative="1" as="geometry">
    <Array as="points">
      <mxPoint x="300" y="150" />
      <mxPoint x="300" y="250" />
    </Array>
  </mxGeometry>
</mxCell>
```

## Swimlane Container

```xml
<!-- Parent swimlane container -->
<mxCell id="lane1" value="Phase 1: Setup"
        style="swimlane;fillColor=#f8faff;strokeColor=#94a3b8;fontStyle=1;fontSize=14;fontColor=#1e40af;"
        vertex="1" parent="1">
  <mxGeometry x="0" y="0" width="800" height="300" as="geometry" />
</mxCell>

<!-- Child cell inside the swimlane -->
<mxCell id="child1" value="Step A"
        style="rounded=1;fillColor=#3b82f6;strokeColor=#1e3a5f;fontColor=#ffffff;"
        vertex="1" parent="lane1">
  <mxGeometry x="50" y="80" width="120" height="60" as="geometry" />
</mxCell>
```

---

## Style Properties Reference

### Shape Properties

| Property | Example Values | Description |
|----------|----------------|-------------|
| `fillColor` | `#dae8fc`, `none` | Background fill color |
| `strokeColor` | `#6c8ebf`, `none` | Border/outline color |
| `fontColor` | `#374151` | Text color |
| `fontSize` | `14`, `16`, `20` | Text size in pixels |
| `fontStyle` | `0`, `1`, `2`, `3` | 0=normal, 1=bold, 2=italic, 3=bold+italic |
| `align` | `left`, `center`, `right` | Horizontal text alignment |
| `verticalAlign` | `top`, `middle`, `bottom` | Vertical text alignment |
| `strokeWidth` | `1`, `2`, `3` | Border thickness |
| `rounded` | `0`, `1` | Rounded corners |
| `arcSize` | `10`, `50` | Corner arc radius % (with `rounded=1`) |
| `dashed` | `0`, `1` | Dashed border |
| `dashPattern` | `8 8` | Dash pattern (px on, px off) |
| `opacity` | `0`–`100` | Shape opacity (always use 100) |
| `whiteSpace` | `wrap` | Enable text wrapping |
| `html` | `1` | Enable HTML in labels |
| `overflow` | `hidden` | Clip text to shape bounds |

### Shape Type Flags

| Flag | Effect |
|------|--------|
| `ellipse;` | Renders as ellipse/circle |
| `rhombus;` | Renders as diamond |
| `text;` | Text-only, no shape border |
| `swimlane;` | Swimlane container with header |
| `shape=cylinder3;` | 3D cylinder (for databases) |
| `shape=mxgraph.flowchart.start_2;` | Flowchart start shape |

### Edge Properties

| Property | Example Values | Description |
|----------|----------------|-------------|
| `edgeStyle` | `orthogonalEdgeStyle`, `elbowEdgeStyle`, `none` | Routing algorithm |
| `curved` | `0`, `1` | Curved edge |
| `rounded` | `0`, `1` | Rounded edge corners |
| `exitX` | `0`, `0.5`, `1` | Horizontal exit point (0=left, 1=right) |
| `exitY` | `0`, `0.5`, `1` | Vertical exit point (0=top, 1=bottom) |
| `entryX` | `0`, `0.5`, `1` | Horizontal entry point |
| `entryY` | `0`, `0.5`, `1` | Vertical entry point |
| `endArrow` | `block`, `open`, `none`, `oval`, `diamond` | Arrowhead at target |
| `startArrow` | `block`, `open`, `none` | Arrowhead at source |
| `endFill` | `0`, `1` | Filled arrowhead at target |
| `startFill` | `0`, `1` | Filled arrowhead at source |
| `strokeColor` | `#hex` | Arrow color |
| `strokeWidth` | `1`, `2` | Arrow thickness |

---

## Common Style Recipes

### Plain rectangle (no rounded corners)
```
whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;
```

### Rounded rectangle
```
rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;
```

### Ellipse
```
ellipse;whiteSpace=wrap;html=1;fillColor=#fed7aa;strokeColor=#c2410c;
```

### Diamond (decision)
```
rhombus;whiteSpace=wrap;html=1;fillColor=#fef3c7;strokeColor=#b45309;
```

### Free-floating text (no border)
```
text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;
```

### Dashed container/group
```
rounded=1;whiteSpace=wrap;html=1;fillColor=none;strokeColor=#94a3b8;dashed=1;dashPattern=8 8;verticalAlign=top;
```

### Swimlane
```
swimlane;fillColor=#f8faff;strokeColor=#94a3b8;fontStyle=1;fontSize=14;fontColor=#1e40af;
```

### Orthogonal arrow
```
edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;strokeColor=#1e3a5f;strokeWidth=2;endArrow=block;endFill=1;
```

### Curved arrow
```
curved=1;rounded=1;strokeColor=#1e3a5f;strokeWidth=2;endArrow=block;endFill=1;
```

---

## mxGraphModel Attributes

| Attribute | Recommended Value | Description |
|-----------|-------------------|-------------|
| `dx`, `dy` | `1422`, `762` | Diagram scroll offset (leave as default) |
| `grid` | `1` | Show grid |
| `gridSize` | `10` | Grid snap size in pixels |
| `page` | `0` | `0` = no page border (cleaner exports) |
| `pageWidth` | `1654` | A3 landscape width (px at 96dpi) |
| `pageHeight` | `1169` | A3 landscape height |
| `math` | `0` | Disable math rendering |
| `shadow` | `0` | Disable drop shadows |
