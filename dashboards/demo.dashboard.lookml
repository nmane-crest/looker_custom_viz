- dashboard: custom_visualization
  title: custom_visualization
  layout: newspaper
  preferred_viewer: dashboards-next
  preferred_slug: f3aZpjcNRzYohN2lGqLzWO
  elements:
  - title: New Tile
    name: New Tile
    model: system__activity
    explore: dashboard
    type: custom_visualization::custom_label
    fields: [dashboard.title]
    filters:
      dashboard.moved_to_trash: 'No'
    sorts: [dashboard.title]
    limit: 500
    column_limit: 50
    hidden_fields: []
    hidden_points_if_no: []
    series_labels: {}
    show_view_names: true
    series_types: {}
    defaults_version: 0
    listen: {}
    row:
    col:
    width:
    height:
