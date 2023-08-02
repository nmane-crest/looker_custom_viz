view: pci {
  derived_table: {
    sql: select "unassigned" as owner_id, 99 as status_new,657 as status_open, 463 as status_closed,'2022 June 20' as date, 50 as notable_events, 30 as risk_score,'2023-07-19T08:30:00Z' as timestamp, union all
      select "assigned" as owner_id, 135 as status_new, 100 as status_open, 700 as status_closed,'2023 June 23' as date,40 as notable_events, 90 as risk_score,'2023-07-25T08:30:00Z' as timestamp,union all
      select "unknown" as owner_id, 400 as status_new, 800 as status_open, 560 as status_closed,'2022 July 30'as date,10 as notable_events, 10 as risk_score,'2023-06-19T08:30:00Z' as timestamp,union all
      select "Nikhil" as owner_id, 30 as status_new, 80 as status_open, 56 as status_closed,'2023 August 15' as date,80 as notable_events, 80 as risk_score,'2023-06-10T08:30:00Z' as timestamp,union all
      select "Sanket" as owner_id, 99 as status_new,657 as status_open, 463 as status_closed,'2022 July 15' as date, 40 as notable_events, 30 as risk_score,'2023-07-1T08:30:00Z' as timestamp,union all
      select "kiran" as owner_id, 135 as status_new, 100 as status_open, 700 as status_closed,'2023 August 25' as date,20 as notable_events, 90 as risk_score,'2023-06-14T08:30:00Z' as timestamp,union all
      select "Bhavesha" as owner_id, 400 as status_new, 800 as status_open, 560 as status_closed,'2023 October' as date,90 as notable_events, 60 as risk_score,'2023-07-19T08:30:00Z' as timestamp;;
  }

  dimension: Owner {
    type: string
    sql: ${TABLE}.owner_id ;;
  }

  dimension: New {
    type: number
    sql: ${TABLE}.status_new ;;
  }

  dimension: Open {
    type: number
    sql: ${TABLE}.status_open ;;
  }

  dimension: Closed {
    type: number
    sql: ${TABLE}.status_closed ;;
  }
  dimension: Notable_events{
    label: "Notable Events"
    type: number
    sql: ${TABLE}.notable_events ;;
  }
  dimension: Risk_Score {
    label: "Risk Score"
    type: number
    sql: ${TABLE}.risk_score ;;
  }

  measure: count {
    label: "count"
    type: count
  }
  measure: Total {
    label: "Total"
    type: sum
    sql: ${New} + ${Open} + ${Closed} ;;
  }

  # dimension: date {
  #     label: "date"
  #     type: string
  #     sql: ${TABLE}.date ;;
  #   }
  # dimension: timestamp {
  #   type: date
  #   sql: ${TABLE}.timestamp ;;
  # }

  dimension: timestamp_date {
    type: date
    sql: ${TABLE}.timestamp ;;
  }
}
view: users {
  dimension: id {
    type: number
    primary_key: yes
  }
  dimension: name {
    type: string
  }
  dimension: city {
    type: string
  }

  # Define the custom filter
  filter: custom_filter {
    type: string
    description: "Custom filter based on the City field."
    default_value: "New York" # Optional: Set a default value for the filter
  }
}
