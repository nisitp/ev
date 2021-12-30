using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using System.Security.Cryptography;
using System.Net;
using System.IO;
using Newtonsoft.Json.Linq;

public partial class _Default: System.Web.UI.Page {
 string tweetResult;
 DateTime ct;
 public string query = "umerpasha";
 //    public string url = "https://api.twitter.com/1.1/users/search.json" ;
 public string url = "https://api.twitter.com/1.1/statuses/user_timeline.json";

 protected void Page_Load(object sender, EventArgs e) {
  Console.WriteLine("HERE");
  var tweetFile = "~/cache/twitter.txt";
  var tweetFileExact = Server.MapPath(tweetFile);
  var testOutput = "~/cache/test.txt";
  var testOutputE = Server.MapPath(testOutput);
  if (File.Exists(Server.MapPath(tweetFile))) {
   DateTime dt = File.GetLastWriteTime(tweetFileExact);
   TimeSpan diff = DateTime.Now - dt;
   if (diff.TotalMinutes >= 60) {
    findUserTwitter(url, query);
    File.WriteAllText(tweetFileExact, tweetResult);
    File.WriteAllText(testOutputE, "Rewriting again...  " + diff.TotalMinutes);
   } else {
    File.WriteAllText(testOutputE, "Time since rewrite...  " + TimeAgo(DateTime.Now));
   }
  } else {
   findUserTwitter(url, query);
   File.WriteAllText(tweetFileExact, tweetResult);
   File.WriteAllText(testOutputE, "File didn't exist");
  }
 }

 public void findUserTwitter(string resource_url, string q) {
  // oauth application keys
  var oauth_token = "773927670379929600-T4khjj7QDCnpvtJNKOQl57gtcM86VQs";
  var oauth_token_secret = "l0arzcH110MM4dO7zQ9XP61UcfOffX6x1hTj0YxuUn7tw";
  var oauth_consumer_key = "UXx5AuIKJVP5lKRDHvtmQ9F4t";
  var oauth_consumer_secret = "CPJT4RWadbHaH0RTzX1DaFdjwPMwBPqEqRvENt2kgBN94lkbll";

  // oauth implementation details
  var oauth_version = "1.0";
  var oauth_signature_method = "HMAC-SHA1";

  // unique request details
  var oauth_nonce = Convert.ToBase64String(new ASCIIEncoding().GetBytes(DateTime.Now.Ticks.ToString()));
  var timeSpan = DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
  var oauth_timestamp = Convert.ToInt64(timeSpan.TotalSeconds).ToString();

  // create oauth signature
  var baseFormat = "oauth_consumer_key={0}&oauth_nonce={1}&oauth_signature_method={2}" +
   "&oauth_timestamp={3}&oauth_token={4}&oauth_version={5}&q={6}";

  var baseString = string.Format(baseFormat,
   oauth_consumer_key,
   oauth_nonce,
   oauth_signature_method,
   oauth_timestamp,
   oauth_token,
   oauth_version,
   Uri.EscapeDataString(q)
  );
  baseString = string.Concat("GET&", Uri.EscapeDataString(resource_url), "&", Uri.EscapeDataString(baseString));

  var compositeKey = string.Concat(Uri.EscapeDataString(oauth_consumer_secret),
   "&", Uri.EscapeDataString(oauth_token_secret));
  string oauth_signature;
  using(HMACSHA1 hasher = new HMACSHA1(ASCIIEncoding.ASCII.GetBytes(compositeKey))) {
   oauth_signature = Convert.ToBase64String(
    hasher.ComputeHash(ASCIIEncoding.ASCII.GetBytes(baseString)));
  }

  // create the request header
  var headerFormat = "OAuth oauth_nonce=\"{0}\", oauth_signature_method=\"{1}\", " +
   "oauth_timestamp=\"{2}\", oauth_consumer_key=\"{3}\", " +
   "oauth_token=\"{4}\", oauth_signature=\"{5}\", " +
   "oauth_version=\"{6}\"";

  var authHeader = string.Format(headerFormat,
   Uri.EscapeDataString(oauth_nonce),
   Uri.EscapeDataString(oauth_signature_method),
   Uri.EscapeDataString(oauth_timestamp),
   Uri.EscapeDataString(oauth_consumer_key),
   Uri.EscapeDataString(oauth_token),
   Uri.EscapeDataString(oauth_signature),
   Uri.EscapeDataString(oauth_version)
  );
  ServicePointManager.Expect100Continue = false;

  // make the request
  var postBody = "q=" + Uri.EscapeDataString(q); //
  resource_url += "?" + postBody;
  HttpWebRequest request = (HttpWebRequest) WebRequest.Create(resource_url);
  request.Headers.Add("Authorization", authHeader);
  request.Method = "GET";
  request.ContentType = "application/x-www-form-urlencoded";
  var response = (HttpWebResponse) request.GetResponse();
  var reader = new StreamReader(response.GetResponseStream());
  var objText = reader.ReadToEnd();
  string createdTime;
  string createdTimeMod;
  string html = "";
  try {
   JArray jsonDat = JArray.Parse(objText);
   html += "<div class='tweets'>";
   for (int x = 0; x < 3; x++) {
    createdTime = jsonDat[x]["created_at"].ToString();
    string dayOfWeek = createdTime.Substring(0, 3).Trim();
    string month = createdTime.Substring(4, 3).Trim();
    string dayInMonth = createdTime.Substring(8, 2).Trim();
    string time = createdTime.Substring(11, 9).Trim();
    string offset = createdTime.Substring(20, 5).Trim();
    string year = createdTime.Substring(25, 5).Trim();
    string dateTime = string.Format("{0}-{1}-{2} {3}", dayInMonth, month, year, time);
    createdTimeMod = TimeAgo(DateTime.Parse(dateTime)).ToString();
    html += "<div class='tweet'>";
    html += "<a href='https://twitter.com/GulfPower/status/" + jsonDat[x]["id"].ToString() + "' target='_blank' class='profile-link' tabindex='0'>";
      html += "<img src='/images/icons/Twitter-Icon.jpg'/>";
      html += "<span class='title'>@Revolution_EV</span>";
      html += "<span class='meta'>" + createdTimeMod + "</span>";
      html += "<span class='status'>" + jsonDat[x]["text"].ToString() + "</span>";
      html += "</a>";
    html += "</div>";
   }
   html += "</div>";
   tweetResult = html;
  } catch (Exception twit_error) {
   tweetResult = html + twit_error.ToString();
  }
 }
 public static string TimeAgo(DateTime dt) {
  TimeSpan span = DateTime.Now - dt;
  if (span.Days > 365) {
   int years = (span.Days / 365);
   if (span.Days % 365 != 0)
    years += 1;
   return String.Format("{0} {1} ago",
    years, years == 1 ? "year" : "years");
  }
  if (span.Days > 30) {
   int months = (span.Days / 30);
   if (span.Days % 31 != 0)
    months += 1;
   return String.Format("{0} {1} ago",
    months, months == 1 ? "month" : "months");
  }
  if (span.Days > 0)
   return String.Format("{0} {1} ago",
    span.Days, span.Days == 1 ? "day" : "days");
  if (span.Hours > 0)
   return String.Format("{0} {1} ago",
    span.Hours, span.Hours == 1 ? "hour" : "hours");
  if (span.Minutes > 0)
   return String.Format("{0} {1} ago",
    span.Minutes, span.Minutes == 1 ? "minute" : "minutes");
  if (span.Seconds > 5)
   return String.Format("{0} seconds ago", span.Seconds);
  if (span.Seconds <= 5)
   return "just now";
  return string.Empty;
 }
}
