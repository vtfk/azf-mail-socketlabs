module.exports = () => {
  return `<!doctype html>
<html lang="no">
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <style>
      body {
        font-family: Calibri, Arial, sans-serif;
        font-size: 12pt;
      }
      a {
        color: #005260;
      }
      #signature {
        font-family: Calibri, Arial, sans-serif;
        font-size: 11pt;
      }
      #signature a {
        color: #005260;
        text-decoration: none;
      }
      #person a {
        color: #000000;
      }
      #company img {
        width: 128px;
        height: 128px;
      }
    </style>
</head>
<body>
<div id="content">
    {{{body}}}
</div>
<br />
<br />
<div id="signature">
  <div id="person">
    Vennlig hilsen<br />
    <br />
    <b>{{signature.name}}</b><br />
    
    {{#if signature.title}}
        {{signature.title}}<br />
    {{/if}}
    
    {{#if signature.department}}
        {{signature.department}}<br/>
    {{/if}}
    
    {{#if signature.company}}
        {{#unless signature.virksomhet}}
            {{signature.company}}<br/>
        {{/unless}}
    {{/if}}
    {{#if signature.phone}}
        <br/>
        Telefon: <a href="tel:{{signature.phone}}">{{signature.phone}}</a>
        
        {{#if signature.mobile}}
             / 
        {{/if}}
    {{/if}}
    {{#if signature.mobile}}
        {{#unless signature.phone}}
            <br/>
        {{/unless}}
        
        Mobil: <a href="tel:{{signature.mobile}}">{{signature.mobile}}</a>
    {{/if}}
  </div>
  <div id="company">
    <img src="https://icons.iconarchive.com/icons/wwalczyszyn/android-style/128/Internet-icon.png" alt="Example image"><br />
    {{#if signature.virksomhet}}
        {{#if signature.company}}
            <b>{{signature.company}}</b><br />
        {{else}}
            <b>Example company</b><br />
        {{/if}}
    {{else}}
        <b>Example company</b><br />
    {{/if}}
    
    {{#if signature.webpage}}
        <a href="https://{{signature.webpage}}">{{signature.webpage}}</a>
    {{else}}
        <a href="https://www.example.com/">www.example.com</a>
    {{/if}}
  </div>
</div>
</body>
</html>`;
    }