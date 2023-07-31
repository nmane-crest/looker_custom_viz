- dashboard: pci_dashboard
  title: PCI_Dashboard
  layout: newspaper
  preferred_viewer: dashboards-next
  description: ''
  preferred_slug: iwUe2FX8I3iO02yS75koDf
  elements:
  - title: Notable Events By Owner - Last 24 Hours
    name: Notable Events By Owner - Last 24 Hours
    model: sample_viz
    explore: test
    type: looker_grid
    fields: [test.Owner, test.New, test.Open, test.Closed]
    sorts: [test.Owner]
    limit: 500
    column_limit: 50
    show_view_names: false
    show_row_numbers: true
    transpose: false
    truncate_text: true
    hide_totals: false
    hide_row_totals: false
    size_to_fit: true
    table_theme: white
    limit_displayed_rows: false
    enable_conditional_formatting: false
    header_text_alignment: left
    header_font_size: 12
    rows_font_size: 12
    conditional_formatting_include_totals: false
    conditional_formatting_include_nulls: false
    defaults_version: 1
    row: 0
    col: 16
    width: 8
    height: 6
  - title: Views - Last 24 Hours
    name: Views - Last 24 Hours
    model: sample_viz
    explore: testing
    type: looker_grid
    fields: [testing.view, testing.user, testing.viewed_today]
    sorts: [testing.view]
    limit: 500
    column_limit: 50
    show_view_names: false
    show_row_numbers: true
    transpose: false
    truncate_text: true
    hide_totals: false
    hide_row_totals: false
    size_to_fit: true
    table_theme: white
    limit_displayed_rows: false
    enable_conditional_formatting: false
    header_text_alignment: left
    header_font_size: 12
    rows_font_size: 12
    conditional_formatting_include_totals: false
    conditional_formatting_include_nulls: false
    x_axis_gridlines: false
    y_axis_gridlines: true
    show_y_axis_labels: true
    show_y_axis_ticks: true
    y_axis_tick_density: default
    y_axis_tick_density_custom: 5
    show_x_axis_label: true
    show_x_axis_ticks: true
    y_axis_scale_mode: linear
    x_axis_reversed: false
    y_axis_reversed: false
    plot_size_by_field: false
    trellis: ''
    stacking: ''
    legend_position: center
    point_style: none
    show_value_labels: false
    label_density: 25
    x_axis_scale: auto
    y_axis_combined: true
    ordering: none
    show_null_labels: false
    show_totals_labels: false
    show_silhouette: false
    totals_color: "#808080"
    defaults_version: 1
    row: 6
    col: 0
    width: 12
    height: 6
  - title: Notable Event History
    name: Notable Event History
    model: sample_viz
    explore: testing
    type: looker_line
    fields: [testing.Notable_Events, testing.Time, testing.count]
    sorts: [testing.Time]
    limit: 500
    column_limit: 50
    dynamic_fields:
    - category: table_calculation
      expression: "${testing.Notable_Events} + (0 * ${testing.count})"
      label: Notable Events
      value_format:
      value_format_name:
      _kind_hint: measure
      table_calculation: notable_events
      _type_hint: number
    x_axis_gridlines: false
    y_axis_gridlines: true
    show_view_names: true
    show_y_axis_labels: true
    show_y_axis_ticks: true
    y_axis_tick_density: default
    y_axis_tick_density_custom: 5
    show_x_axis_label: true
    show_x_axis_ticks: true
    y_axis_scale_mode: linear
    x_axis_reversed: false
    y_axis_reversed: false
    plot_size_by_field: false
    trellis: ''
    stacking: ''
    limit_displayed_rows: false
    legend_position: center
    point_style: none
    show_value_labels: false
    label_density: 25
    x_axis_scale: auto
    y_axis_combined: true
    show_null_points: true
    interpolation: linear
    color_application:
      collection_id: aed851c8-b22d-4b01-8fff-4b02b91fe78d
      palette_id: c36094e3-d04d-4aa4-8ec7-bc9af9f851f4
      options:
        steps: 5
    y_axes: [{label: '', orientation: left, series: [{axisId: testing.count, id: testing.count,
            name: Testing count}, {axisId: notable_events, id: notable_events, name: Notable
              Events}], showLabels: false, showValues: true, unpinAxis: false, tickDensity: default,
        tickDensityCustom: 5, type: linear}]
    x_axis_zoom: true
    y_axis_zoom: true
    hide_legend: true
    series_colors:
      testing.count: "#55A3B3"
      notable_events: "#CD3B8A"
    ordering: none
    show_null_labels: false
    show_totals_labels: false
    show_silhouette: false
    totals_color: "#808080"
    defaults_version: 1
    hidden_pivots: {}
    hidden_fields: [testing.Notable_Events]
    listen: {}
    row: 6
    col: 12
    width: 12
    height: 6
  - title: Risk Modifiers Over Time
    name: Risk Modifiers Over Time
    model: sample_viz
    explore: testing
    type: looker_column
    fields: [testing.Risk_Score, testing.Time, testing.count, testing.Notable_Events]
    sorts: [testing.Risk_Score]
    limit: 500
    column_limit: 50
    dynamic_fields:
    - category: table_calculation
      expression: "${testing.Risk_Score} + (0 * ${testing.count})"
      label: Risk Score
      value_format:
      value_format_name:
      _kind_hint: measure
      table_calculation: risk_score
      _type_hint: number
    - category: table_calculation
      expression: "${testing.Notable_Events} + (0 * ${testing.count})"
      label: Count
      value_format:
      value_format_name:
      _kind_hint: measure
      table_calculation: count
      _type_hint: number
    x_axis_gridlines: false
    y_axis_gridlines: true
    show_view_names: false
    show_y_axis_labels: true
    show_y_axis_ticks: true
    y_axis_tick_density: default
    y_axis_tick_density_custom: 5
    show_x_axis_label: true
    show_x_axis_ticks: true
    y_axis_scale_mode: linear
    x_axis_reversed: false
    y_axis_reversed: false
    plot_size_by_field: false
    trellis: ''
    stacking: ''
    limit_displayed_rows: false
    legend_position: center
    point_style: none
    show_value_labels: false
    label_density: 25
    x_axis_scale: auto
    y_axis_combined: true
    ordering: none
    show_null_labels: false
    show_totals_labels: false
    show_silhouette: false
    totals_color: "#808080"
    y_axes: [{label: '', orientation: left, series: [{axisId: risk_score, id: risk_score,
            name: Risk Score}], showLabels: true, showValues: true, maxValue: 200,
        minValue: 0, unpinAxis: false, tickDensity: custom, tickDensityCustom: 27,
        type: linear}, {label: !!null '', orientation: right, series: [{axisId: count,
            id: count, name: Count}, {axisId: testing.count, id: testing.count, name: count}],
        showLabels: true, showValues: true, minValue: 1, unpinAxis: false, tickDensity: default,
        tickDensityCustom: 5, type: linear}]
    x_axis_zoom: true
    y_axis_zoom: true
    series_types:
      testing.count: line
    series_colors:
      testing.count: "#E8710A"
      testing.Risk_Score: "#E8710A"
      risk_score: "#E8710A"
      count: "#FF8168"
    label_color: []
    defaults_version: 1
    hidden_pivots: {}
    hidden_fields: [testing.Risk_Score, testing.Notable_Events, testing.count]
    listen: {}
    row: 12
    col: 12
    width: 12
    height: 6
  - title: Compliance Status - Last 24 Hours
    name: Compliance Status - Last 24 Hours
    model: sample_viz
    explore: rule_detections
    type: custom_visualization::check
    fields: [rule_detections.count]
    filters:
      rule_detections.rule_name: UserCreationThenDeletion
    limit: 500
    column_limit: 50
    hidden_fields: []
    hidden_points_if_no: []
    show_view_names: false
    x_axis_gridlines: false
    y_axis_gridlines: true
    show_y_axis_labels: true
    show_y_axis_ticks: true
    y_axis_tick_density: default
    y_axis_tick_density_custom: 5
    show_x_axis_label: true
    show_x_axis_ticks: true
    y_axis_scale_mode: linear
    x_axis_reversed: false
    y_axis_reversed: false
    plot_size_by_field: false
    trellis: ''
    stacking: ''
    limit_displayed_rows: false
    legend_position: center
    point_style: none
    show_value_labels: false
    label_density: 25
    x_axis_scale: auto
    y_axis_combined: true
    ordering: none
    show_null_labels: false
    show_totals_labels: false
    show_silhouette: false
    totals_color: "#808080"
    defaults_version: 0
    hidden_pivots: {}
    listen: {}
    row: 0
    col: 0
    width: 8
    height: 6
  - title: Notable Events By Urgency - Last 24 Hours
    name: Notable Events By Urgency - Last 24 Hours
    model: sample_viz
    explore: rule_detections
    type: looker_bar
    fields: [rule_detections.count, rule_detections.rule_name]
    filters:
      rule_detections.rule_name: UserCreationThenDeletion
    sorts: [rule_detections.count desc 0]
    limit: 500
    column_limit: 50
    x_axis_gridlines: false
    y_axis_gridlines: true
    show_view_names: false
    show_y_axis_labels: true
    show_y_axis_ticks: true
    y_axis_tick_density: default
    y_axis_tick_density_custom: 5
    show_x_axis_label: true
    show_x_axis_ticks: false
    y_axis_scale_mode: linear
    x_axis_reversed: false
    y_axis_reversed: false
    plot_size_by_field: false
    trellis: ''
    stacking: ''
    limit_displayed_rows: false
    legend_position: center
    point_style: none
    show_value_labels: false
    label_density: 25
    x_axis_scale: auto
    y_axis_combined: true
    ordering: none
    show_null_labels: false
    show_totals_labels: false
    show_silhouette: false
    totals_color: "#808080"
    y_axes: [{label: '', orientation: bottom, series: [{axisId: rule_detections.count,
            id: rule_detections.count, name: Rule Detections}], showLabels: true,
        showValues: true, maxValue: 100, minValue: 0, unpinAxis: false, tickDensity: default,
        tickDensityCustom: 5, type: linear}]
    x_axis_zoom: true
    y_axis_zoom: true
    defaults_version: 1
    listen: {}
    row: 0
    col: 8
    width: 8
    height: 6
  - title: Risk Modifiers By Severity - Last 24 Hours
    name: Risk Modifiers By Severity - Last 24 Hours
    model: sample_viz
    explore: rule_detections
    type: looker_pie
    fields: [rule_detections.severity, rule_detections.count]
    filters:
      rule_detections.severity: Low
    sorts: [rule_detections.count desc 0]
    limit: 500
    column_limit: 50
    value_labels: labels
    label_type: labPer
    color_application:
      collection_id: 6c27c30e-5523-4080-82ae-272146e699d0
      palette_id: 87654122-8144-4720-8259-82ac9908d5f4
      options:
        steps: 5
    series_colors:
      Low: "#B8AF6A"
    x_axis_gridlines: false
    y_axis_gridlines: true
    show_view_names: false
    show_y_axis_labels: true
    show_y_axis_ticks: true
    y_axis_tick_density: default
    y_axis_tick_density_custom: 5
    show_x_axis_label: true
    show_x_axis_ticks: true
    y_axis_scale_mode: linear
    x_axis_reversed: false
    y_axis_reversed: false
    plot_size_by_field: false
    trellis: ''
    stacking: ''
    limit_displayed_rows: false
    legend_position: center
    point_style: none
    show_value_labels: false
    label_density: 25
    x_axis_scale: auto
    y_axis_combined: true
    ordering: none
    show_null_labels: false
    show_totals_labels: false
    show_silhouette: false
    totals_color: "#808080"
    defaults_version: 1
    listen: {}
    row: 12
    col: 0
    width: 12
    height: 6
