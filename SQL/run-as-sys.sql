-- RUN as SYS
GRANT EXECUTE ON UTL_HTTP to edw_ops_tst;
GRANT EXECUTE ON DBMS_CQ_NOTIFICATION TO EDW_OPS_TST;

GRANT CHANGE NOTIFICATION TO edw_ops;

ALTER SYSTEM SET "JOB_QUEUE_PROCESSES"=4;


DECLARE

    acl_path VARCHAR2(4000);
  
BEGIN

    SELECT acl 
    INTO acl_path 
    FROM dba_network_acls
    WHERE host = '*' 
        AND lower_port IS NULL 
        AND upper_port IS NULL;
    
    IF dbms_network_acl_admin.check_privilege(acl_path, 'edw_ops', 'connect') IS NULL 
    THEN
        dbms_network_acl_admin.add_privilege(acl_path, 'edw_ops', TRUE, 'connect');
    END IF;
 
EXCEPTION

    WHEN NO_DATA_FOUND 
    THEN
     dbms_network_acl_admin.create_acl('power_users.xml','ACL that lets power users to connect to everywhere','edw_ops',TRUE,'connect');
        
     dbms_network_acl_admin.assign_acl('power_users.xml','*');
  
END;
/
