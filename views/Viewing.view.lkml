
view: Viewing {
  derived_table: {
    sql: select "Firewall rule activity" as view,   "admin" as user,  "Yes" as viewed_today,  "New" as status, union all
            select "Network Traffic activity" as view,   "admin" as user,  "Yes" as viewed_today, "Open" as status, union all
            select "Prohibited Services" as view,   "" as user,  "No" as viewed_today, "Close" as status,;;
  }

  dimension: view {
    type: string
    sql: ${TABLE}.view ;;
  }

  dimension: user {
    type: string
    sql: ${TABLE}.user ;;
  }

  dimension: viewed_today {
    type: string
    sql: ${TABLE}.viewed_today ;;
  }

  dimension: status {
    type: string
    sql: ${TABLE}.status ;;
  }

  measure: count {
    label: "count"
    type: count
  }
}
