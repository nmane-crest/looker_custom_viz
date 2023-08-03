- dashboard: log_hunting
  title: Log Hunting
  layout: newspaper
  preferred_viewer: dashboards-next
  description: ''
  refresh: 15 minutes
  preferred_slug: 3f8UlRzVMx9reEkgJuHUOm
  elements:
  - title: Log Hunting 1
    name: Log Hunting 1
    model: custom_visualization
    explore: events
    type: looker_pie
    fields: [events.metadata__product_event_type, events.count]
    filters: {}
    sorts: [events.count desc 0]
    limit: 10
    column_limit: 50
    dynamic_fields:
    - measure: count_of_metadata_product_event_type
      based_on: events.metadata__product_event_type
      expression: ''
      label: Count of Metadata Product Event Type
      type: count_distinct
      _kind_hint: measure
      _type_hint: number
    value_labels: labels
    label_type: lab
    color_application:
      collection_id: 6c27c30e-5523-4080-82ae-272146e699d0
      palette_id: 87654122-8144-4720-8259-82ac9908d5f4
      options:
        steps: 5
    series_colors: {}
    hidden_pivots: {}
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
    listen:
      Metadata Vendor Name: events.metadata__vendor_name
      Metadata Product Event Type: events.metadata__product_event_type
      Event Timestamp Time: events.event_timestamp_time
    row: 0
    col: 0
    width: 11
    height: 6
  - name: Log Hunting 2
    title: Log Hunting 2
    model: corelight-chronicle-1
    explore: events
    type: looker_bar
    fields: [events.metadata__product_event_type, events.count]
    filters: {}
    sorts: [events.count desc 0]
    limit: 10
    column_limit: 50
    dynamic_fields:
    - measure: count_of_metadata_product_event_type
      based_on: events.metadata__product_event_type
      expression: ''
      label: Count of Metadata Product Event Type
      type: count_distinct
      _kind_hint: measure
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
    color_application:
      collection_id: 5591d8d1-6b49-4f8e-bafa-b874d82f8eb7
      palette_id: 18d0c733-1d87-42a9-934f-4ba8ef81d736
      options:
        steps: 5
    y_axes: [{label: Count, orientation: bottom, series: [{axisId: events.count, id: events.count,
            name: Events}], showLabels: true, showValues: true, unpinAxis: false,
        tickDensity: default, tickDensityCustom: 5, type: linear}]
    x_axis_label: Product Event Type
    x_axis_zoom: true
    y_axis_zoom: true
    series_colors: {}
    value_labels: labels
    label_type: lab
    hidden_pivots: {}
    defaults_version: 1
    listen:
      Metadata Vendor Name: events.metadata__vendor_name
      Metadata Product Event Type: events.metadata__product_event_type
      Event Timestamp Time: events.event_timestamp_time
    row: 0
    col: 11
    width: 13
    height: 6
  - title: Log Hunting 3
    name: Log Hunting 3
    model: corelight-chronicle-1
    explore: events
    type: looker_grid
    fields: [events.event_timestamp_time, events.metadata__product_event_type, events__principal__ip.events__principal__ip,
      events__target__ip.events__target__ip, events.target__port, events.metadata__id]
    filters: {}
    sorts: [events.event_timestamp_time desc]
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
    show_null_points: true
    interpolation: linear
    defaults_version: 1
    listen:
      Metadata Vendor Name: events.metadata__vendor_name
      Metadata Product Event Type: events.metadata__product_event_type
      Event Timestamp Time: events.event_timestamp_time
    row: 6
    col: 0
    width: 24
    height: 8
  filters:
  - name: Metadata Vendor Name
    title: Metadata Vendor Name
    type: field_filter
    default_value: Corelight
    allow_multiple_values: true
    required: false
    ui_config:
      type: advanced
      display: popover
    model: corelight-chronicle-1
    explore: events
    listens_to_filters: []
    field: events.metadata__vendor_name
  - name: Metadata Product Event Type
    title: Metadata Product Event Type
    type: field_filter
    default_value: ''
    allow_multiple_values: true
    required: false
    ui_config:
      type: advanced
      display: popover
    model: corelight-chronicle-1
    explore: events
    listens_to_filters: [Metadata Vendor Name]
    field: events.metadata__product_event_type
  - name: Event Timestamp Time
    title: Event Timestamp Time
    type: field_filter
    default_value: after 2023/07/18 12:30
    allow_multiple_values: true
    required: false
    ui_config:
      type: advanced
      display: popover
      options: []
    model: corelight-chronicle-1
    explore: events
    listens_to_filters: []
    field: events.event_timestamp_time
