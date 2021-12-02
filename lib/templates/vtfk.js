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
      #vtfk_signature {
        font-family: Calibri, Arial, sans-serif;
        font-size: 11pt;
      }
      #vtfk_signature a {
        color: #005260;
        text-decoration: none;
      }
      #vtfk_person a {
        color: #000000;
      }
      #vtfk_company img {
        width: 44px;
        height: 80px;
      }
    </style>
</head>
<body>
<div id="content">
    {{{body}}}
</div>
<br />
<br />
<div id="vtfk_signature">
  <div id="vtfk_person">
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
  <div id="vtfk_company">
    <img src="https://logo.api.vtfk.no/epost/fylkesvapen.png" alt="Fylkesvåpen, Vestfold og Telemark fylkeskommune"><br />
    {{#if signature.virksomhet}}
        {{#if signature.company}}
            <b>{{signature.company}}</b><br />
        {{else}}
            <b>Vestfold og Telemark fylkeskommune</b><br />
        {{/if}}
    {{else}}
        <b>Vestfold og Telemark fylkeskommune</b><br />
    {{/if}}
    
    {{#if signature.webpage}}
        <a href="https://{{signature.webpage}}">{{signature.webpage}}</a>
    {{else}}
        <a href="https://www.vtfk.no/">www.vtfk.no</a>
    {{/if}}
  </div>
</div>
</body>
</html>`;
    }