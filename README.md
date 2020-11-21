# Descriere

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Planificarea studentilor nu este intotdeauna una perfecta, avand in vedere volumul de informatii pe care ei sunt nevoiti sa le acumuleze in decursul unui semestru universitar. Aceasta este o aplicatie utilizata de studenti pentru ***gestionarea notitelor*** luate in cadrul orelor de curs si seminar, vizand atat fiecare materie in parte cat si orele dedicate studiului individual. Astfel, notitele sunt prezentate intr-o maniera organizata si pot fi accesate de catre studenti la nevoie, in format electronic.

# Mod de functionare
## Logare (TBA)


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Studentii se logheaza in aplicatie folosind contul institutional ASE, concept introdus in aplicatie prin ***utilizarea protocolului stateless token***. E usor de configurat deoarece nu stocheaza credentiale etc. Se creaza un request catre endpoint-ul de login care primeste utilizatorul implicit, avand informatiile referitoare la autorizare (un username si o parola), iar daca acestea corespund cu ce exista in baza de date, se va emite un token cu adresa de email al utilizatorului. Tokenul pe care il trimitem se encodeaza cu ajutorul Base64. Payload si token logare (pt a arata principiul):

```javascript
app.get("/login", (req, res)=>{
    if(req.query.email == user.email && req.query.password == user.password){
        let payload = { email: user.email,  role: user.role }   let token = generateJwt(payload)
        res.status(200).send({token: token}); }
    else{res.status(404).send("User not found!") }}
```

## Baze de date

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Organizarea notitelor se poate face dupa materii, data, tag-uri, iar notitele pot fi adaugate, sterse si editate de student. Acest lucru este posibil prin utilizarea bazei de date relationale, impropriu numita astfel, ea fiind generata prin ***O/R Mapping folosind Sequelize***. Sincronizarea cu baza de date (principiu):

```javascript
app.get("/api/sync", (req, res) => { 
    database.sync({ force: true })
    .then(() => res.status(201).send("Sincronizare reusita cu baza de date!") )
    .catch((error) => res.status(500).send(`Sincronizare nereusita. ${error}`) ); 
}); 
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Entitatile de care dispunem sunt: Student, Course, Note, Group, StudentXGroup, GroupXNote, Link si Tag. Relatiile dintre acestea, in vederea realizarii functionalitatilor de care avem nevoie, sunt urmatoarele:

![schema](https://i.ibb.co/f4SQRkh/schema.png)

# Sequitur

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In final, notitele pot avea integrat continut audio-vizual si pot fi partajate cu alti colegi. Se observa cum functionalitatile prezentate aduc aminte de cele folosite in [StuDocu](https://www.studocu.com/ro) sau [Evernote](https://evernote.com/).
