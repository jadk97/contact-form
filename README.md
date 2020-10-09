# Contact Form
A simple contact form created with React, Node, Express, and PostgreSQL. It sends an email to an address of your choosing upon successful submission and then saves it to a PSQL database.

## Setup



First things first, navigate to the back-end directory and do the following:
<ol>
<li>Run <code>npm install</code></li>
<li> From there, you'll want to boot up <code>psql</code> from the command line, create a database with whatever name you'd like, and connect to it.</li>
<li>Run <code>\i db/migrations/01_schema.sql</code></li>
<li>Fill in the <code>.env.example</code> file with the relevant information.</li>
<ul>
  <li><code>PORT</code> and all the fields beginning with <code>PG</code> correspond to your local Postgres credentials. I already set <code>PORT=5000</code> and <code>PGHOST=localhost</code> for convenience's sake.</li>
  <li><code>MAILHOST</code> corresponds to whatever SMTP the app will be connecting to.</li>
  <li><code>MAILPORT</code> corresponds to the port on said SMTP.</li>
  <li><code>MAILUSER</code> and <code>MAILPASSWORD</code> correspond to your credentials on the SMTP.</li>
  <li><code>MAILRECEIVER</code> corresponds to the address you'd like to send emails to.</li>
</ul>
<li>Save your changes and either run <code>cp .env.example .env</code> or simply rename the file to <code>.env</code></li>
<li>Run <code>npm start</code></i>
</ol>

Then, navigate to the front-end directory:
<ol>
<li>Run <code>npm install</code></li>
<li>Fill in the <code>.env.example</code> file with the backend's address or just leave it as is if you didn't change the <code>PORT</code> or <code>PGHOST</code> earlier.</li>
<li>Save your changes if you made any, and either run <code>cp .env.example .env.development.local</code> or rename it to <code>.env.development.local</code></li>
<li>Run <code>npm start</code></li>
</ol>
