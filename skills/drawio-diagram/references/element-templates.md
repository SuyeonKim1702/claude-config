# Element Templates

Copy-paste XML templates for each draw.io element type. The `fillColor`, `strokeColor`, and `fontColor` values are placeholders — always pull actual colors from `color-palette.md` based on the element's semantic purpose.

---

## File Wrapper (always start here)

```xml
<mxGraphModel dx="1422" dy="762" grid="1" gridSize="10" guides="1"
              tooltips="1" connect="1" arrows="1" fold="1"
              page="0" pageScale="1" pageWidth="1654" pageHeight="1169"
              math="0" shadow="0">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />

    <!-- Your elements go here -->

  </root>
</mxGraphModel>
```

---

## Free-Floating Text (no container)

### Section Title
```xml
<mxCell id="title1" value="Section Title"
        style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontSize=22;fontStyle=1;fontColor=#1e40af;"
        vertex="1" parent="1">
  <mxGeometry x="100" y="80" width="320" height="32" as="geometry" />
</mxCell>
```

### Subtitle
```xml
<mxCell id="sub1" value="Supporting description"
        style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontSize=14;fontColor=#3b82f6;"
        vertex="1" parent="1">
  <mxGeometry x="100" y="120" width="320" height="22" as="geometry" />
</mxCell>
```

### Body / Annotation
```xml
<mxCell id="body1" value="Detailed description or annotation text"
        style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;fontSize=12;fontColor=#64748b;"
        vertex="1" parent="1">
  <mxGeometry x="100" y="150" width="280" height="50" as="geometry" />
</mxCell>
```

---

## Rectangle (Process / Action)

```xml
<mxCell id="rect1" value="Process Name"
        style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#3b82f6;strokeColor=#1e3a5f;fontColor=#ffffff;fontSize=14;strokeWidth=2;"
        vertex="1" parent="1">
  <mxGeometry x="200" y="200" width="160" height="80" as="geometry" />
</mxCell>
```

---

## Ellipse (Start / End)

### Start / Trigger
```xml
<mxCell id="start1" value="Start"
        style="ellipse;whiteSpace=wrap;html=1;fillColor=#fed7aa;strokeColor=#c2410c;fontColor=#7c2d12;fontSize=14;strokeWidth=2;"
        vertex="1" parent="1">
  <mxGeometry x="100" y="200" width="120" height="60" as="geometry" />
</mxCell>
```

### End / Result
```xml
<mxCell id="end1" value="End"
        style="ellipse;whiteSpace=wrap;html=1;fillColor=#a7f3d0;strokeColor=#047857;fontColor=#064e3b;fontSize=14;strokeWidth=2;"
        vertex="1" parent="1">
  <mxGeometry x="500" y="200" width="120" height="60" as="geometry" />
</mxCell>
```

---

## Diamond (Decision)

```xml
<mxCell id="decision1" value="Condition?"
        style="rhombus;whiteSpace=wrap;html=1;fillColor=#fef3c7;strokeColor=#b45309;fontColor=#78350f;fontSize=13;strokeWidth=2;"
        vertex="1" parent="1">
  <mxGeometry x="300" y="180" width="140" height="100" as="geometry" />
</mxCell>
```

---

## Small Marker Dot (Timeline / Bullet)

```xml
<mxCell id="dot1" value=""
        style="ellipse;fillColor=#3b82f6;strokeColor=#1e3a5f;strokeWidth=1;"
        vertex="1" parent="1">
  <mxGeometry x="148" y="148" width="20" height="20" as="geometry" />
</mxCell>
```

---

## Structural Line (Timeline / Divider)

### Vertical line (timeline spine)
```xml
<mxCell id="line1" value=""
        style="endArrow=none;startArrow=none;strokeColor=#64748b;strokeWidth=2;"
        edge="1" parent="1">
  <mxGeometry x="160" y="100" width="1" height="400" as="geometry">
    <Array as="points" />
  </mxGeometry>
</mxCell>
```

> Note: For a plain structural line, use `edge="1"` with no source/target and provide explicit point coordinates.

### Horizontal divider
```xml
<mxCell id="divider1" value=""
        style="endArrow=none;startArrow=none;strokeColor=#94a3b8;strokeWidth=1;dashed=1;dashPattern=6 6;"
        edge="1" parent="1">
  <mxGeometry x="80" y="350" width="800" height="1" as="geometry">
    <Array as="points" />
  </mxGeometry>
</mxCell>
```

---

## Arrow (Edge)

### Standard orthogonal arrow
```xml
<mxCell id="arrow1" value=""
        style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;strokeColor=#1e3a5f;strokeWidth=2;endArrow=block;endFill=1;"
        edge="1" source="rect1" target="rect2" parent="1">
  <mxGeometry relative="1" as="geometry" />
</mxCell>
```

### Arrow with label
```xml
<mxCell id="arrow2" value="calls"
        style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#64748b;strokeWidth=1;endArrow=block;endFill=1;fontSize=11;fontColor=#64748b;"
        edge="1" source="rect1" target="rect2" parent="1">
  <mxGeometry relative="1" as="geometry" />
</mxCell>
```

### Curved arrow
```xml
<mxCell id="arrow3" value=""
        style="curved=1;rounded=1;strokeColor=#1e3a5f;strokeWidth=2;endArrow=block;endFill=1;"
        edge="1" source="rect1" target="rect3" parent="1">
  <mxGeometry relative="1" as="geometry" />
</mxCell>
```

### Arrow with forced connection points (left→right)
```xml
<mxCell id="arrow4" value=""
        style="edgeStyle=orthogonalEdgeStyle;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;strokeColor=#1e3a5f;strokeWidth=2;endArrow=block;endFill=1;"
        edge="1" source="rect1" target="rect2" parent="1">
  <mxGeometry relative="1" as="geometry" />
</mxCell>
```

### Arrow with waypoints
```xml
<mxCell id="arrow5" value=""
        style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#1e3a5f;strokeWidth=2;endArrow=block;endFill=1;"
        edge="1" source="rect1" target="rect2" parent="1">
  <mxGeometry relative="1" as="geometry">
    <Array as="points">
      <mxPoint x="350" y="140" />
      <mxPoint x="350" y="280" />
    </Array>
  </mxGeometry>
</mxCell>
```

---

## Container (Dashed Group Border)

```xml
<mxCell id="group1" value="Group Label"
        style="rounded=1;whiteSpace=wrap;html=1;fillColor=none;strokeColor=#94a3b8;dashed=1;dashPattern=8 8;strokeWidth=1;fontSize=14;fontStyle=1;fontColor=#64748b;verticalAlign=top;align=left;spacingLeft=10;"
        vertex="1" parent="1">
  <mxGeometry x="80" y="160" width="600" height="300" as="geometry" />
</mxCell>
```

---

## Swimlane Container

```xml
<!-- Swimlane parent (horizontal lanes) -->
<mxCell id="swim1" value="Actor / Phase"
        style="shape=pool;html=1;childLayout=stackLayout;horizontal=1;startSize=30;fillColor=#f8faff;strokeColor=#94a3b8;fontStyle=1;fontSize=14;fontColor=#1e40af;strokeWidth=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;collapsible=0;marginBottom=0;"
        vertex="1" parent="1">
  <mxGeometry x="0" y="0" width="900" height="300" as="geometry" />
</mxCell>

<!-- Lane inside the swimlane -->
<mxCell id="lane1" value="Lane Name"
        style="swimlane;html=1;startSize=30;fillColor=#f8faff;strokeColor=#94a3b8;fontStyle=0;fontSize=13;fontColor=#374151;"
        vertex="1" parent="swim1">
  <mxGeometry x="0" y="30" width="900" height="270" as="geometry" />
</mxCell>
```

---

## Evidence Artifact: Code Snippet

```xml
<mxCell id="code1" value="&lt;font face=&quot;Courier New&quot;&gt;const response = await fetch(url);&lt;br&gt;const data = await response.json();&lt;/font&gt;"
        style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#334155;fontColor=#e2e8f0;fontSize=12;align=left;verticalAlign=top;strokeWidth=1;spacingLeft=8;spacingTop=8;"
        vertex="1" parent="1">
  <mxGeometry x="400" y="200" width="300" height="80" as="geometry" />
</mxCell>
```

## Evidence Artifact: JSON / Data Block

```xml
<mxCell id="json1" value="&lt;font face=&quot;Courier New&quot;&gt;{&lt;br&gt;&amp;nbsp;&amp;nbsp;&quot;event&quot;: &quot;RUN_STARTED&quot;,&lt;br&gt;&amp;nbsp;&amp;nbsp;&quot;id&quot;: &quot;abc-123&quot;&lt;br&gt;}&lt;/font&gt;"
        style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#334155;fontColor=#22c55e;fontSize=12;align=left;verticalAlign=top;strokeWidth=1;spacingLeft=8;spacingTop=8;"
        vertex="1" parent="1">
  <mxGeometry x="400" y="300" width="260" height="90" as="geometry" />
</mxCell>
```

> **Note on HTML encoding in `value`:**
> - `<` → `&lt;`
> - `>` → `&gt;`
> - `"` inside attributes → `&quot;`
> - `&nbsp;` for non-breaking space (indentation)
> - `<br>` for line breaks (requires `html=1` in style)
