# WassupTeam Server

This server's intended purpuse is pretty much a custom API chain; listening for events, conducting commands, and posting to various social media pages managed by WassupTeam. 

## Rationale

I don't like paying for services that I can build myself, and I'm always looking to expand my experience. So, this server is my first ever production application. Say we (WassupTeam Administratives) add an event to our Google Calendar. Before I joined the team as their engineer and business partner, they'd have each member individually add the event to their pages, or use their access to do so one at a time. Not ideal.

So when I joined I helped structure the team and bring automation to the administrative toolbelt. This server, running on a Linode in Atlanta where we're based, is meant to listen for events via webhooks and execute the assigned action. The server may expand over time, and no credentials are hardcoded, so it's nice to have in my portfolio.