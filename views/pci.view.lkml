view: Pci {
  derived_table: {
    sql: select "unassigned" as owner_id,  "0" as status_new,  "0" as status_open,  "0" as status_closed, union all
      select "assigned" as owner_id,  "0" as status_new,  "1" as status_open,  "0" as status_closed;;
  }

  dimension: Owner {
    type: string
    sql: ${TABLE}.owner_id ;;
  }

  dimension: New {
    type: string
    sql: ${TABLE}.status_new ;;
  }

  dimension: Open {
    type: string
    sql: ${TABLE}.status_open ;;
  }

  dimension: Closed {
    type: string
    sql: ${TABLE}.status_closed ;;
  }

  measure: count {
    label: "count"
    type: count
  }
}
