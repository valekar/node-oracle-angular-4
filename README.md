We are installing the 32 bit version for supporting 32 bit version of server

When deploying to server a fresh copy uninstall node 6 and install version 5.12 and build the package by typing "npm install" command 
	
	NOTE - the above step is done only when new node modules are install, otherwise just copying only necessary file would 	be sufficient
	
Why are we not using version 5.12 nodejs while developing?
	
	--> because angular-cli doesnt support node versions below 6
	
1. How to install oracledb node module? (WARNING - Follow the below steps only if oracledb module is not present)

	1) For Details follow --> https://github.com/oracle/node-oracledb/blob/master/INSTALL.md#instwin
	
	2) First download nodejs version 6 and above **32 bit**
	
	3) Download instantclient_basic-windows.x86-12.1.0.2.0.zip and instantclient_sdk-windows.x86-12.1.0.2.0.zip from 		http://www.oracle.com/technetwork/topics/winx64soft-089540.html
	
	4) Extract instantclient_basic-windows.x86-12.1.0.2.0.zip and instantclient_sdk-windows.x86-12.1.0.2.0.zip to the same 		directory.
	
	5) put both of them into C:\oracle\instantclient 
	
	6) type in command prompt : set OCI_LIB_DIR=C:\oracle\instantclient\sdk\lib\msvc
	
	7) type in command prompt : set OCI_INC_DIR=C:\oracle\instantclient\sdk\include
	
	8) In visual studios : From VS2013 Menu Select "Tools", then Select "External Tools". Enter as below:
	
	9) Title: "VS2013 Native Tools-Command Prompt" would be good
		Command: C:\Windows\System32\cmd.exe
		Arguments: /k "C:\Program Files (x86)\Microsoft Visual Studio 12.0\Common7\Tools\VsDevCmd.bat"
		Initial Directory: Select as suits your needs. 
		Click OK. Now you have command prompt access under the Tools Menu.
	
	10) close Visual Studios
	
	11) set the environment variable in path: c:\windows\system32
	
	12) install python 2.7 set variable: c:\python27\
	
	13) Again open the Visual Studios As ADMIN and under tools drop down, open command prompt that you have just created and 
		go to your project folder
	
	14) now install node-gyp --> npm install -g node-gyp
	
	15) now install package dependencies --> npm install  
	
	16) now install oracledb package  --->  npm install oracledb --save from visual studios
	
	
How to do the development?

	1) GO to the Dashboard folder 
	
	2) open a command prompt
	
	3) run "nodemon" when doing changes on the server side, otherwise run "node server"
	
	4) next go to "angular4" project then open another command prompt
	
	5) install package dependencies (npm install) if required
	
	6) now run "ng build --watch" and now  you can do changes in the client project and no need to clear the browser cache   

Deploying

	1) just copy entire project to the server
	
	2) Go the project where you copied it
	
	3) Now run "node server"
	
	4) Now access your application directly in your browser by using the url --> http://rcowebtstchi004:3007/
	

Running SQL Scripts - Run the scripts from SQL folder - Run these scripts for activating real time updates.
	
	1) FIRST RUN run-as-sys.sql
	
	2) Then run the remaining sql scripts 		