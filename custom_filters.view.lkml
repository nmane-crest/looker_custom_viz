view: custom_filters {
  dimension: order_date {
    type: date
    sql: ${TABLE}.order_date ;;
    description: "The order date"
  }

  # Create the date range filter
  dimension: order_date_filter {
    type: date
    sql: ${TABLE}.order_date ;;
    description: "Filter orders between two dates"
    between_filter: yes
    datagroup: last_3_months_datagroup
  }
}

datagroup: last_3_months_datagroup {
  type: raw # or type: looker_date
  sql: ;;
timeframes: [raw, month]
triggers: {
  # Set the datagroup to refresh every day
  cron: "0 0 * * *"
  timezone: "America/New_York" # Adjust the timezone accordingly
}
}
