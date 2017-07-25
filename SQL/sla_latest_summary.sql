-- run as edw_ops
DECLARE

   l_reginfo CQ_NOTIFICATION$_REG_INFO;
   l_cursor  SYS_REFCURSOR;
   l_regid   NUMBER;

BEGIN

    l_reginfo := cq_notification$_reg_info (
        'query_callback_for_sla_latest_summ_change',
        dbms_cq_notification.qos_query,
        0, 0, 0
    );

    l_regid := dbms_cq_notification.new_reg_start(l_reginfo);

    OPEN l_cursor FOR
       select * from latest_sla_smry_v order by SLA_DELIVERY_TS desc;
    CLOSE l_cursor;

    dbms_cq_notification.reg_end;

END;
/


-- 
--The following procedure will be executed when the query results are changed
--Set the IP address in the url param to the IP address where where Node.js is listening
CREATE OR REPLACE PROCEDURE query_callback_for_sla_latest_summ_change(
    ntfnds IN CQ_NOTIFICATION$_DESCRIPTOR
)

AS

    l_req  UTL_HTTP.REQ;
    l_resp UTL_HTTP.RESP;

BEGIN

    l_req := utl_http.begin_request(
        url    => '10.135.240.200:3007/api/slas/latest/summary/db/change',
        method => 'GET'
    );

    l_resp := utl_http.get_response(r => l_req);

    utl_http.end_response(r => l_resp);

END;
/