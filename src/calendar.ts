import { google } from "googleapis";
import util from "util";
import dotenv from "dotenv";
dotenv.config();

console.log(`Calender ID << ${process.env.CAL_ID}`);

const serviceAuth = new google.auth.JWT({
  keyFile: "./.temp/secret.json",
  scopes: [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.readonly",
    "https://www.googleapis.com/auth/calendar.events",
    "https://www.googleapis.com/auth/calendar.events.readonly",
  ],
});

const calendar = google.calendar({ version: "v3", auth: serviceAuth });

/**
 * Returns the calendars on the user's calendar list.
 */
export const listCalendars = async () => {
  const response = await calendar.calendarList.list({
    showHidden: true,
    showDeleted: true,
  });

  console.log("Listing calendars...");
  console.log(util.inspect(response.data, { depth: Infinity, colors: true }));
};

/**
 * Creates a secondary calender, which only the service can see.
 * @param calendarName The name of the new calendar.
 */
export const insertCalendar = async (calendarName: string) => {
  const response = await calendar.calendars.insert({
    requestBody: {
      summary: calendarName,
    },
  });

  console.log("Creating calendar...");
  console.log(util.inspect(response.data, { depth: Infinity, colors: true }));
};

/**
 * Creates an access control rule which adds the user to the calendar as an owner.
 * @param userEmail The Google user to invite as an owner.
 */
export const addCalendarToUser = async (userEmail: string) => {
  const response = await calendar.acl.insert({
    calendarId: process.env.CAL_ID,
    sendNotifications: true,
    requestBody: {
      role: "owner",
      scope: {
        type: "user",
        value: userEmail,
      },
    },
  });

  console.log("Adding calendar to user...");
  console.log(util.inspect(response.data, { depth: Infinity, colors: true }));
};

/**
 * Creates an event.
 * @param startTime The (inclusive) start time of the event, accepts the format of "July 9 2020 06:30 PM UTC" and converts to ISO.
 * @param endTime The exclusive end time of the event, accepts the format of "July 9 2020 10:00 PM UTC" and converts to ISO.
 * @param timeZone Formatted as an IANA Time Zone Database name, e.g. "America/New_York".
 */
export const insertEvent = async (
  startTime: string,
  endTime: string,
  timeZone: string = "America/New_York"
) => {
  const response = await calendar.events.insert({
    calendarId: process.env.CAL_ID,
    requestBody: {
      summary: "Testing event!",
      start: {
        dateTime: new Date(startTime).toISOString(), // new Date().toISOString(); "2020-07-09T18:30:00-05:00"
        timeZone: timeZone,
      },
      end: {
        dateTime: new Date(endTime).toISOString(),
        timeZone: timeZone,
      },
    },
  });

  console.log("Inserting event...");
  console.log(util.inspect(response.data, { depth: Infinity, colors: true }));
};

/**
 * Returns events on the current calender.
 */
export const listEvents = async () => {
  const response = await calendar.events.list({
    calendarId: process.env.CAL_ID,
  });

  console.log("Listing events...");
  console.log(util.inspect(response.data, { depth: Infinity, colors: true }));
};

// insertCalendar().catch((err) => console.error(err));
listCalendars().catch((err) => console.error(err));
listEvents().catch((err) => console.error(err));
// addCalendarToUser().catch((err) => console.error(err));
