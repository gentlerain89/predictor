predictor
=========

An test assignment from GrabTaxi

##Step to run the test
+Step 1
Pull the source code with all dependencies (node modules) at : https://github.com/gentlerain89/predictor

+Step 2
Execute the sql backup file (\predictor\sql\predictor_backup_20140621.sql) to restore database

+Step 3:
Start Redis server with default configuration

+Step 4:
execute the command: npm test to see the module run

##Logic that has been implemented to the module:

1.Prequesite:
+We assumpt a time block is 30 minutes (ex: from 11:30 to 12:30 is a time block)
+We assumpt that each driver is tracked after a time block, he will detected (associated) in a specific area at a time.
+The tracked data of driver is stored in table "driver_travel_logs
+The booking data is stored in table "booking"
+The area data is stored in table "area"
+The driver detail is stored in table "driver"

2.The logic to recognize an area is next targeted area:

The logic is super simple
+We assumpt that the historical data used to predicts is the data of yesterday
  For example:
  Current time : 08:00 am (20/06/2014)
  We want to know next hot areas in between 11:30 am - 12:00 am (20/06/2014)
  To get predict for a current time, we look and analyse the data of same time block of previous date(19/06/2014):
  + If the ratio between available taxis and bookings are too low (<40%) and the number of missed booking (passenger fail to catch a taxi) is quite high (>3)
  --> the area will be push to Redis as next target

 3. With the test data, we see that for area with id=1, there are 6 bookings (in between 11:30 and 12:00 19/06/2014), but only 2 drivers are available. 
 The ratio between supply and demand is lower than 40% --> this area will be returned.
  
