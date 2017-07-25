var test_connection_1 = {
    user          : "edw_ops",
    password      : "edw_ops",
    connectString : "rcoinftst01:1530/INFRTST09.REDCROSS.NET",
    externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
}

module.exports = test_connection_1;