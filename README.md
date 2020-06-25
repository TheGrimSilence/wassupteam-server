# WassupTeam Server

This server's intended purpose is pretty much a custom API chain; listening for events, conducting commands, and posting to various social media pages managed by WassupTeam.

## Rationale

I don't like paying for services that I can build myself, and I'm always looking to expand my experience. So, this server is my first ever production application. Say we (WassupTeam Administratives) add an event to our Google Calendar. Before I joined the team as their engineer and business partner, they'd have each member individually add the event to their pages, or use their access to do so one at a time. Not ideal.

So when I joined I helped structure the team and bring automation to the administrative toolbelt. This server, running on a Linode in Atlanta where we're based, is meant to listen for events via webhooks and execute the assigned action. The server may expand over time, and no credentials are hardcoded, so it's nice to have in my portfolio.

## Structure

<!-- TODO: finish later -->

```
⊢ scripts/
  ⊢ bin/
    ∟ wassup.service  // The startup-enabled service (it'll be copied into /etc/systemd/system/)
  ⊢ setup.js          // Handles the initial setup such as copying the service to its correct location when first installed
  ∟ start.js          // Starts the server
```

## Services (initial: remove or create wiki when larger)

### Triggers

#### Google Calendar::New Event

When a new event is added (under the appropriate calendar) we make sure that event is relative to our artists (making sure they're attending at least) and all relevant artist's facebook page then receives the event and adds it. These events almost always get added to the wassupteam facebook page as well.

### Google Calendar::Updated Event

Same as a `New Event` event, all relevant artists and wassupteam page.

### Actions