# Un-hide and use this explore, or copy the joins into another explore, to get all the fully nested relationships from this view
- explore: ingestion_metrics
  hidden: yes
  joins:
    - join: ingestion_metrics__buckets
      view_label: "Ingestion Metrics: Buckets"
      sql: LEFT JOIN UNNEST(${ingestion_metrics.buckets}) as ingestion_metrics__buckets
      relationship: one_to_many
    - join: ingestion_metrics__bucketer_lower_bounds
      view_label: "Ingestion Metrics: Bucketer Lower Bounds"
      sql: LEFT JOIN UNNEST(${ingestion_metrics.bucketer_lower_bounds}) as ingestion_metrics__bucketer_lower_bounds
      relationship: one_to_many
- view: ingestion_metrics
  sql_table_name: |
      `chronicle-crds.datalake.ingestion_metrics`

  fields:

  - dimension: bucketer_growth_factor
    type: number
    sql: ${TABLE}.bucketer_growth_factor

  - dimension: bucketer_lower_bounds
    hidden: yes
    sql: ${TABLE}.bucketer_lower_bounds

  - dimension: bucketer_num_finite_buckets
    type: number
    sql: ${TABLE}.bucketer_num_finite_buckets

  - dimension: bucketer_scale_factor
    type: number
    sql: ${TABLE}.bucketer_scale_factor

  - dimension: bucketer_width
    type: number
    sql: ${TABLE}.bucketer_width

  - dimension: buckets
    hidden: yes
    sql: ${TABLE}.buckets

  - dimension: buffer_type
    type: string
    sql: ${TABLE}.buffer_type

  - dimension: buffer_used
    type: number
    sql: ${TABLE}.buffer_used

  - dimension: collector_id
    type: string
    sql: ${TABLE}.collector_id

  - dimension: component
    type: string
    sql: ${TABLE}.component

  - dimension: cpu_used
    type: number
    sql: ${TABLE}.cpu_used

  - dimension: disk_used
    type: number
    sql: ${TABLE}.disk_used

  - dimension: drop_count
    type: number
    sql: ${TABLE}.drop_count

  - dimension: drop_reason_code
    type: string
    sql: ${TABLE}.drop_reason_code

  - dimension_group: end
    type: time
    timeframes: [raw, time, date, week, month, quarter, year]
    sql: ${TABLE}.end_time

  - dimension: error_code
    type: string
    sql: ${TABLE}.error_code

  - dimension: event_count
    type: number
    sql: ${TABLE}.event_count

  - dimension: event_type
    type: string
    sql: ${TABLE}.event_type

  - dimension: feed_id
    type: string
    sql: ${TABLE}.feed_id

  - dimension: ingestion_source
    type: string
    sql: ${TABLE}.ingestion_source

  - dimension: input_type
    type: string
    sql: ${TABLE}.input_type

  - dimension_group: last_heartbeat
    type: time
    timeframes: [raw, time, date, week, month, quarter, year]
    sql: ${TABLE}.last_heartbeat_time

  - dimension: latency_count
    type: number
    sql: ${TABLE}.latency_count

  - dimension: latency_overflow
    type: number
    sql: ${TABLE}.latency_overflow

  - dimension: latency_underflow
    type: number
    sql: ${TABLE}.latency_underflow

  - dimension: log_count
    type: number
    sql: ${TABLE}.log_count

  - dimension: log_type
    type: string
    sql: ${TABLE}.log_type

  - dimension: log_volume
    type: number
    sql: ${TABLE}.log_volume

  - dimension: memory_used
    type: number
    sql: ${TABLE}.memory_used

  - dimension: namespace
    type: string
    sql: ${TABLE}.namespace

  - dimension: regex_filter
    type: string
    sql: ${TABLE}.regex_filter

  - dimension_group: start
    type: time
    timeframes: [raw, time, date, week, month, quarter, year]
    sql: ${TABLE}.start_time

  - dimension: state
    type: string
    sql: ${TABLE}.state

  - measure: count
    type: count
    drill_fields: []


- view: ingestion_metrics__buckets

  fields:

  - dimension: ingestion_metrics__buckets
    type: number
    sql: ingestion_metrics__buckets


- view: ingestion_metrics__bucketer_lower_bounds

  fields:

  - dimension: ingestion_metrics__bucketer_lower_bounds
    type: number
    sql: ingestion_metrics__bucketer_lower_bounds

