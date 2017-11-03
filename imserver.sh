#!/bin/bash
server_name="imServer"
file_name="imserver.sh"
if [ ! -n "$1" ]
then
    echo "Usages: sh $file_name [start|stop|restart|status|log]"
    exit 0
fi

if [ $1 = start ]
then
    psid=`ps aux | grep "node" | grep $server_name.js | grep -v "grep" | wc -l`
    if [ $psid -gt 0 ]
    then
        echo "$server_name is running!"
        exit 0
    else
        nohup node $server_name.js > $server_name.log 2>&1 &
        echo "Start $server_name service [OK]"
    fi
    

elif [ $1 = stop ];then
    ps -ef | grep $server_name.js | grep -v grep | cut -c 10-15 | xargs kill -9
    echo "Stop $server_name service [OK]"

elif [ $1 = restart ];then
    ps -ef | grep $server_name.js | grep -v grep | cut -c 10-15 | xargs kill -9
    echo "Stop $server_name service [OK]"
    sleep 2
    nohup node $server_name.js > $server_name.log 2>&1 &
    echo "Start $server_name service [OK]"

elif [ $1 = status  ];then
    ps -ef | grep $server_name | grep -v grep | grep -v $server_name.sh

elif [ $1 = log  ];then
    tail -f $server_name.log
        
else
    echo "Usages: sh $file_name [start|stop|restart|status|log]"
fi
