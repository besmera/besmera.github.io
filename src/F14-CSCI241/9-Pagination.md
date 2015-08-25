% Pagination
% Dr. Andrew Besmer

# Pagination

## Pagination

* Reconsider the telemarketing example
* Do you want all of these items displayed at once?


```csv
1,Dictum Eu Company,1-194-286-3041
2,Proin Industries,1-319-137-9279
3,Enim Sit Industries,1-562-872-9219
4,Phasellus In Corp,1-128-930-9807
5,Dolor Quam Elementum PC,1-928-801-9652
6,Nibh Lacinia Orci PC,1-332-594-5321
7,Donec Porttitor Tellus Company,1-873-991-8646
8,Ut Dolor Consulting,1-514-308-9570
9,Suspendisse Ac Metus PC,1-466-488-2655
10,Lorem Incorporated,1-778-863-7253
11,Curabitur Consequat Incorporated,1-496-807-1201
12,Non Company,1-383-777-6247
13,Enim Inc,1-441-333-2507
14,Quisque Libero Industries,1-821-364-5581
15,At Pretium Aliquet Incorporated,1-651-831-1982
16,Mi Consulting,1-358-903-2637
17,Lacus Varius LLP,1-493-938-0338
18,Nibh Dolor Foundation,1-706-129-8454
19,Risus Associates,1-657-994-6688
20,Viverra LLC,1-857-231-3877
21,Nunc Corp,1-652-403-0424
22,Praesent Luctus Curabitur Foundation,1-363-243-2228
23,Risus PC,1-110-328-3877
24,Eleifend Nunc Risus Associates,1-873-927-9209
25,Vel Convallis LLP,1-430-846-6335
```

## Pagination

* What about the contacts example from lab 6?

```php
$contacts = array(
	array("name"=>"Tara Parks","phone"=>"1-410-938-2172","email"=>"Maecenas.iaculis.aliquet@auctorquis.com","address"=>"Ap #129-3344 Mattis. Av.","city"=>"Wilmington","state"=>"DE","zip"=>"27437","age"=>48),
	array("name"=>"Patricia Vincent","phone"=>"1-211-588-5734","email"=>"amet@nullaante.com","address"=>"213-3762 Semper, Rd.","city"=>"Wichita","state"=>"KS","zip"=>"84179","age"=>29),
	array("name"=>"Pamela Roach","phone"=>"1-591-869-2945","email"=>"sollicitudin@feugiatmetus.co.uk","address"=>"Ap #394-3270 Ornare. Rd.","city"=>"Bear","state"=>"DE","zip"=>"23560","age"=>47),
	array("name"=>"Lillith Lara","phone"=>"1-439-436-8647","email"=>"In@tincidunttempus.org","address"=>"344-6540 Nascetur Rd.","city"=>"Rockville","state"=>"MD","zip"=>"93250","age"=>35),
	array("name"=>"Lamar Dyer","phone"=>"1-993-511-1447","email"=>"sapien@Crasconvallis.net","address"=>"Ap #386-5250 Non St.","city"=>"Colchester","state"=>"VT","zip"=>"79893","age"=>37),
	array("name"=>"Darius Stout","phone"=>"1-530-649-2424","email"=>"tincidunt.nibh@primisinfaucibus.net","address"=>"Ap #678-394 Morbi St.","city"=>"South Burlington","state"=>"VT","zip"=>"71069","age"=>67),
	array("name"=>"Tanya Ramsey","phone"=>"1-231-922-1427","email"=>"Nam.tempor@nislQuisquefringilla.org","address"=>"Ap #533-2118 Mollis St.","city"=>"Wilmington","state"=>"DE","zip"=>"99217","age"=>28),
	array("name"=>"Ulla Ewing","phone"=>"1-632-141-7036","email"=>"risus.Donec@vulputateullamcorpermagna.com","address"=>"Ap #455-9845 Vulputate, Road","city"=>"Bellevue","state"=>"NE","zip"=>"76339","age"=>50),
	array("name"=>"Alfonso Leon","phone"=>"1-272-675-0262","email"=>"pede@Inornare.net","address"=>"762-7826 Interdum. St.","city"=>"Hartford","state"=>"CT","zip"=>"11552","age"=>54),
	array("name"=>"Rebekah Vargas","phone"=>"1-438-398-8490","email"=>"leo@lacusvestibulum.co.uk","address"=>"P.O. Box 102, 9088 Mauris. Rd.","city"=>"Kailua","state"=>"HI","zip"=>"16434","age"=>73),
	array("name"=>"Kevyn Faulkner","phone"=>"1-825-744-7130","email"=>"venenatis.a@temporbibendumDonec.com","address"=>"Ap #502-403 Eu Avenue","city"=>"Glendale","state"=>"AZ","zip"=>"85924","age"=>30),
	array("name"=>"Courtney Barnett","phone"=>"1-251-374-4295","email"=>"sit.amet.dapibus@nec.ca","address"=>"296 Etiam St.","city"=>"Toledo","state"=>"OH","zip"=>"96184","age"=>45),
	array("name"=>"Hammett West","phone"=>"1-240-903-1851","email"=>"lorem@pellentesqueSeddictum.edu","address"=>"9783 Habitant Rd.","city"=>"Baton Rouge","state"=>"LA","zip"=>"73424","age"=>43),
	array("name"=>"Alexa Parsons","phone"=>"1-510-251-7370","email"=>"dolor.vitae@sapienNunc.edu","address"=>"Ap #524-9604 Posuere, Road","city"=>"Pocatello","state"=>"ID","zip"=>"62553","age"=>79),
	array("name"=>"Abdul Ramos","phone"=>"1-191-897-9876","email"=>"vehicula@ultricies.org","address"=>"Ap #300-6620 Suspendisse Rd.","city"=>"Philadelphia","state"=>"PA","zip"=>"71711","age"=>58),
	array("name"=>"Germaine Barber","phone"=>"1-226-377-6348","email"=>"convallis@ligulatortordictum.com","address"=>"754-8118 Nunc St.","city"=>"Lansing","state"=>"MI","zip"=>"52098","age"=>72),
	array("name"=>"Nyssa Shaw","phone"=>"1-403-987-4824","email"=>"Aenean.eget@ipsumSuspendisse.net","address"=>"P.O. Box 163, 2711 Ut Street","city"=>"Norman","state"=>"OK","zip"=>"28700","age"=>61),
	array("name"=>"Jelani Stewart","phone"=>"1-576-619-6667","email"=>"placerat.augue@Nuncmauris.com","address"=>"808-2302 Sodales Rd.","city"=>"Honolulu","state"=>"HI","zip"=>"78929","age"=>70),
	array("name"=>"Roth Bright","phone"=>"1-366-230-8114","email"=>"Aenean@scelerisquescelerisque.com","address"=>"Ap #116-2530 Mattis. Avenue","city"=>"Memphis","state"=>"TN","zip"=>"34666","age"=>48),
	array("name"=>"Connor Roman","phone"=>"1-270-224-8193","email"=>"ligula.tortor@euultricessit.edu","address"=>"233-663 Eget Rd.","city"=>"Columbus","state"=>"GA","zip"=>"19930","age"=>43),
	array("name"=>"Armand Hobbs","phone"=>"1-210-901-9865","email"=>"mi.Aliquam@varius.org","address"=>"Ap #585-8771 Augue Road","city"=>"Chesapeake","state"=>"VA","zip"=>"17722","age"=>55),
	array("name"=>"Herrod Richard","phone"=>"1-892-586-8065","email"=>"Proin.mi.Aliquam@etrutrumeu.co.uk","address"=>"844-1789 Sit St.","city"=>"Miami","state"=>"FL","zip"=>"16962","age"=>57),
	array("name"=>"Vivien Barker","phone"=>"1-751-375-9615","email"=>"ullamcorper@urnaNunc.edu","address"=>"Ap #655-1658 Vestibulum Avenue","city"=>"Stamford","state"=>"CT","zip"=>"93961","age"=>72),
	array("name"=>"Imogene Bean","phone"=>"1-615-935-3318","email"=>"velit.egestas@eueleifend.co.uk","address"=>"Ap #554-1147 Integer Avenue","city"=>"New Haven","state"=>"CT","zip"=>"71314","age"=>45),
	array("name"=>"Dustin Pacheco","phone"=>"1-997-818-1816","email"=>"Aliquam.ultrices.iaculis@ipsum.org","address"=>"625-114 Egestas. Rd.","city"=>"Hartford","state"=>"CT","zip"=>"23854","age"=>78),
	array("name"=>"Zachery Gentry","phone"=>"1-759-891-4106","email"=>"est.vitae.sodales@Maecenas.com","address"=>"618-3902 Sociis Ave","city"=>"Knoxville","state"=>"TN","zip"=>"88894","age"=>28),
	array("name"=>"Dolan Nieves","phone"=>"1-725-476-1923","email"=>"lacinia.mattis.Integer@imperdiet.org","address"=>"761-840 Et, Avenue","city"=>"Idaho Falls","state"=>"ID","zip"=>"13576","age"=>66),
	array("name"=>"Oprah Cooper","phone"=>"1-561-767-1085","email"=>"lorem.eu.metus@Cumsociis.co.uk","address"=>"237-3926 Nisl. Avenue","city"=>"Covington","state"=>"KY","zip"=>"91204","age"=>42),
	array("name"=>"Deborah Stone","phone"=>"1-339-329-3788","email"=>"Cum@egetvolutpat.edu","address"=>"Ap #415-8513 Enim. Road","city"=>"Des Moines","state"=>"IA","zip"=>"18690","age"=>57),
	array("name"=>"Randall Richards","phone"=>"1-749-677-0442","email"=>"aliquam.adipiscing.lacus@nonenim.org","address"=>"Ap #504-1846 Nullam Road","city"=>"Chandler","state"=>"AZ","zip"=>"86844","age"=>40),
	array("name"=>"Adria Schmidt","phone"=>"1-575-970-6694","email"=>"vitae@Suspendissealiquetmolestie.org","address"=>"940-2249 Sollicitudin Rd.","city"=>"Independence","state"=>"MO","zip"=>"78638","age"=>46),
	array("name"=>"Thomas Harper","phone"=>"1-446-234-7906","email"=>"sagittis@Sednecmetus.net","address"=>"P.O. Box 379, 654 Turpis. Rd.","city"=>"Sterling Heights","state"=>"MI","zip"=>"27115","age"=>67),
	array("name"=>"Lewis York","phone"=>"1-457-868-8098","email"=>"molestie.dapibus.ligula@ante.edu","address"=>"Ap #581-4195 Non Rd.","city"=>"Independence","state"=>"MO","zip"=>"23545","age"=>39),
	array("name"=>"Odysseus Sanders","phone"=>"1-397-828-8982","email"=>"eu.dolor.egestas@idlibero.ca","address"=>"P.O. Box 769, 9107 Velit Rd.","city"=>"Columbus","state"=>"GA","zip"=>"59727","age"=>44),
	array("name"=>"Sage Stanton","phone"=>"1-152-219-3788","email"=>"velit.egestas.lacinia@enimNunc.edu","address"=>"4344 In Road","city"=>"Dover","state"=>"DE","zip"=>"61755","age"=>39),
	array("name"=>"Chastity Delaney","phone"=>"1-927-470-1425","email"=>"orci@placeratorcilacus.com","address"=>"Ap #156-6988 Ac Rd.","city"=>"Columbus","state"=>"GA","zip"=>"22496","age"=>23),
	array("name"=>"Ethan Mcmahon","phone"=>"1-464-250-3855","email"=>"fames@lobortisquama.edu","address"=>"630-3810 Nunc St.","city"=>"Cheyenne","state"=>"WY","zip"=>"41146","age"=>72),
	array("name"=>"Colorado Sweet","phone"=>"1-149-336-2146","email"=>"dolor@nonummy.co.uk","address"=>"Ap #557-6746 Mus. Road","city"=>"Stamford","state"=>"CT","zip"=>"88044","age"=>67),
	array("name"=>"Graham Huber","phone"=>"1-462-488-3755","email"=>"urna.Nunc@massa.org","address"=>"P.O. Box 122, 6175 In Ave","city"=>"Sacramento","state"=>"CA","zip"=>"90720","age"=>40),
	array("name"=>"Isabella Wyatt","phone"=>"1-324-872-4786","email"=>"mollis.Integer@necurnaet.ca","address"=>"Ap #221-2265 Aenean St.","city"=>"Glendale","state"=>"AZ","zip"=>"86433","age"=>27),
	array("name"=>"Evangeline Rocha","phone"=>"1-912-375-3455","email"=>"tempor.arcu.Vestibulum@non.org","address"=>"295-839 Ipsum St.","city"=>"Austin","state"=>"TX","zip"=>"40431","age"=>18),
	array("name"=>"Cherokee Kirk","phone"=>"1-933-506-4075","email"=>"et.netus.et@velitAliquam.edu","address"=>"5516 Dui Rd.","city"=>"Montgomery","state"=>"AL","zip"=>"35499","age"=>60),
	array("name"=>"Connor Walsh","phone"=>"1-319-168-2749","email"=>"pellentesque.eget@vulputateposuere.ca","address"=>"Ap #102-6193 Euismod St.","city"=>"Carson City","state"=>"NV","zip"=>"42186","age"=>37),
	array("name"=>"Kylan Butler","phone"=>"1-446-834-1886","email"=>"mollis.vitae@auctornon.com","address"=>"2904 Libero. Road","city"=>"Grand Island","state"=>"NE","zip"=>"61508","age"=>48),
	array("name"=>"Reagan Campos","phone"=>"1-757-522-9926","email"=>"pede.nec.ante@vestibulumneque.com","address"=>"473-3005 Aliquam Avenue","city"=>"Metairie","state"=>"LA","zip"=>"65825","age"=>54),
	array("name"=>"Stuart Sherman","phone"=>"1-430-175-5881","email"=>"et.magnis@at.com","address"=>"1500 Sed Street","city"=>"Annapolis","state"=>"MD","zip"=>"94494","age"=>64),
	array("name"=>"Cally Allison","phone"=>"1-283-247-6073","email"=>"sit.amet.consectetuer@Aenean.net","address"=>"Ap #559-7888 Duis Rd.","city"=>"Montpelier","state"=>"VT","zip"=>"26072","age"=>32),
	array("name"=>"Keelie Carlson","phone"=>"1-613-139-8524","email"=>"est.ac@Aliquamrutrumlorem.net","address"=>"P.O. Box 603, 4405 Purus Av.","city"=>"Los Angeles","state"=>"CA","zip"=>"94386","age"=>41),
	array("name"=>"Dustin Jenkins","phone"=>"1-679-468-8708","email"=>"faucibus.lectus@molestie.com","address"=>"Ap #791-5656 Netus St.","city"=>"Oklahoma City","state"=>"OK","zip"=>"83475","age"=>49),
	array("name"=>"Martina Callahan","phone"=>"1-954-754-6381","email"=>"feugiat.metus.sit@ultricesDuisvolutpat.net","address"=>"Ap #794-2860 Accumsan Road","city"=>"Richmond","state"=>"VA","zip"=>"61232","age"=>65),
	array("name"=>"Yardley Gentry","phone"=>"1-482-124-9963","email"=>"nec@orci.co.uk","address"=>"1922 Neque. Rd.","city"=>"Joliet","state"=>"IL","zip"=>"18216","age"=>78),
	array("name"=>"May Wong","phone"=>"1-665-261-2559","email"=>"tempus.eu.ligula@eleifendnunc.org","address"=>"Ap #471-1515 Nisi. Rd.","city"=>"South Burlington","state"=>"VT","zip"=>"86543","age"=>69),
	array("name"=>"Ivy Martin","phone"=>"1-475-781-8293","email"=>"sit.amet@pedeCras.net","address"=>"5180 Euismod Avenue","city"=>"Jonesboro","state"=>"AR","zip"=>"71017","age"=>46),
	array("name"=>"Nehru Flores","phone"=>"1-112-720-9542","email"=>"neque.pellentesque.massa@in.net","address"=>"P.O. Box 130, 8095 Congue. St.","city"=>"Henderson","state"=>"NV","zip"=>"64604","age"=>72),
	array("name"=>"Emery Chase","phone"=>"1-836-615-3811","email"=>"quis@etipsum.edu","address"=>"P.O. Box 456, 5206 Mauris Rd.","city"=>"Las Vegas","state"=>"NV","zip"=>"73913","age"=>26),
	array("name"=>"Evelyn Fuentes","phone"=>"1-427-598-0179","email"=>"elit.sed@Aeneansed.com","address"=>"P.O. Box 678, 1178 Mauris Street","city"=>"Baltimore","state"=>"MD","zip"=>"41068","age"=>22),
	array("name"=>"Ocean Wooten","phone"=>"1-133-219-1398","email"=>"ipsum.leo.elementum@tempus.ca","address"=>"213-3507 Mauris. Road","city"=>"Tulsa","state"=>"OK","zip"=>"43556","age"=>65),
	array("name"=>"Kato Murphy","phone"=>"1-915-562-5856","email"=>"feugiat.placerat.velit@malesuada.net","address"=>"5299 Nunc Street","city"=>"Cleveland","state"=>"OH","zip"=>"72584","age"=>61),
	array("name"=>"Karina Rosa","phone"=>"1-817-158-8547","email"=>"ultricies.dignissim.lacus@pedeet.org","address"=>"P.O. Box 621, 6028 Nulla Avenue","city"=>"Omaha","state"=>"NE","zip"=>"30970","age"=>51),
	array("name"=>"Kamal Carpenter","phone"=>"1-770-208-1756","email"=>"aliquet@aliquet.com","address"=>"610-5218 Tincidunt St.","city"=>"Rochester","state"=>"MN","zip"=>"83502","age"=>62),
	array("name"=>"Graiden Ruiz","phone"=>"1-610-742-5065","email"=>"placerat.eget.venenatis@laoreet.org","address"=>"3141 Arcu St.","city"=>"Gillette","state"=>"WY","zip"=>"76575","age"=>23),
	array("name"=>"Priscilla Nolan","phone"=>"1-555-680-0404","email"=>"sit.amet.consectetuer@ligula.edu","address"=>"1702 Vel Rd.","city"=>"Georgia","state"=>"GA","zip"=>"67878","age"=>30),
	array("name"=>"Brenda Randall","phone"=>"1-111-741-6619","email"=>"et.commodo.at@purusgravidasagittis.ca","address"=>"Ap #788-1099 Nulla. Rd.","city"=>"Naperville","state"=>"IL","zip"=>"90449","age"=>58),
	array("name"=>"Travis Graham","phone"=>"1-895-779-5974","email"=>"ac.feugiat.non@mattisIntegereu.net","address"=>"P.O. Box 125, 268 Nunc Street","city"=>"Athens","state"=>"GA","zip"=>"71389","age"=>37),
	array("name"=>"Vance Gibbs","phone"=>"1-546-993-2915","email"=>"senectus.et.netus@nisiaodio.org","address"=>"4229 Mattis. Rd.","city"=>"Colchester","state"=>"VT","zip"=>"53714","age"=>69),
	array("name"=>"Jolene Huber","phone"=>"1-755-219-2906","email"=>"ac@pretium.edu","address"=>"P.O. Box 251, 8542 Fames Av.","city"=>"Columbus","state"=>"GA","zip"=>"39807","age"=>50),
	array("name"=>"Barbara Bruce","phone"=>"1-674-944-7280","email"=>"congue@libero.ca","address"=>"626-3352 Rutrum Rd.","city"=>"West Jordan","state"=>"UT","zip"=>"40890","age"=>61),
	array("name"=>"Kasimir Peters","phone"=>"1-698-115-9220","email"=>"eget@ornarefacilisis.co.uk","address"=>"665-2876 Augue St.","city"=>"Newark","state"=>"DE","zip"=>"84413","age"=>71),
	array("name"=>"Macaulay Dale","phone"=>"1-216-300-4575","email"=>"vel@Donecfeugiatmetus.ca","address"=>"221-4936 Tempus Road","city"=>"Bellevue","state"=>"WA","zip"=>"49553","age"=>75),
	array("name"=>"William Benton","phone"=>"1-900-234-1297","email"=>"odio.auctor@Aenean.net","address"=>"982-4086 Nulla Rd.","city"=>"Casper","state"=>"WY","zip"=>"94584","age"=>29),
	array("name"=>"Dara Flores","phone"=>"1-969-575-2511","email"=>"Vivamus.rhoncus@gravidanon.edu","address"=>"682-8969 Eget Av.","city"=>"Waterbury","state"=>"CT","zip"=>"75229","age"=>57),
	array("name"=>"Flavia Graves","phone"=>"1-225-433-4728","email"=>"id.ante.Nunc@dolorFuscefeugiat.com","address"=>"P.O. Box 141, 1583 Pellentesque, Avenue","city"=>"Sacramento","state"=>"CA","zip"=>"91708","age"=>79),
	array("name"=>"Cullen Huff","phone"=>"1-166-974-9696","email"=>"rutrum.lorem.ac@leo.co.uk","address"=>"202-4712 Consequat Ave","city"=>"Indianapolis","state"=>"IN","zip"=>"72931","age"=>73),
	array("name"=>"Aspen Moon","phone"=>"1-467-877-8578","email"=>"leo.elementum.sem@Uttincidunt.ca","address"=>"P.O. Box 336, 5762 Faucibus St.","city"=>"Birmingham","state"=>"AL","zip"=>"35041","age"=>78),
	array("name"=>"Denton Valencia","phone"=>"1-997-464-7704","email"=>"nibh.Aliquam@commodo.ca","address"=>"Ap #423-4962 Arcu. Av.","city"=>"Southaven","state"=>"MS","zip"=>"65355","age"=>63),
	array("name"=>"Jared Rollins","phone"=>"1-680-565-7415","email"=>"venenatis@egestasblanditNam.net","address"=>"P.O. Box 749, 6592 Magna. Rd.","city"=>"Nampa","state"=>"ID","zip"=>"79657","age"=>31),
	array("name"=>"Kirk Kim","phone"=>"1-253-327-0394","email"=>"auctor@in.edu","address"=>"P.O. Box 126, 1339 Consectetuer Av.","city"=>"Spokane","state"=>"WA","zip"=>"59618","age"=>42),
	array("name"=>"Amity Atkins","phone"=>"1-317-492-2200","email"=>"semper.Nam.tempor@arcu.edu","address"=>"212-3944 Nunc Rd.","city"=>"Tampa","state"=>"FL","zip"=>"99200","age"=>48),
	array("name"=>"Marcia Martin","phone"=>"1-149-500-4690","email"=>"Nullam.nisl.Maecenas@ligulaDonecluctus.com","address"=>"Ap #983-8835 Eleifend St.","city"=>"Cambridge","state"=>"MA","zip"=>"24492","age"=>33),
	array("name"=>"Kasper Cameron","phone"=>"1-824-319-8634","email"=>"Aenean.eget.magna@magnaNam.org","address"=>"P.O. Box 215, 837 Eget St.","city"=>"Duluth","state"=>"MN","zip"=>"55724","age"=>46),
	array("name"=>"Zachary Powers","phone"=>"1-384-122-2854","email"=>"nisl@velitAliquamnisl.edu","address"=>"Ap #591-4092 Cum St.","city"=>"Oklahoma City","state"=>"OK","zip"=>"83933","age"=>24),
	array("name"=>"Stone Preston","phone"=>"1-181-127-4778","email"=>"pede.ac@Quisque.com","address"=>"Ap #738-8125 Class Ave","city"=>"Great Falls","state"=>"MT","zip"=>"28008","age"=>42),
	array("name"=>"Jaden Riddle","phone"=>"1-910-163-8990","email"=>"ut.mi.Duis@urnanec.ca","address"=>"P.O. Box 933, 5095 Aliquam St.","city"=>"Springfield","state"=>"MO","zip"=>"18055","age"=>54),
	array("name"=>"Sarah Armstrong","phone"=>"1-741-367-9061","email"=>"nec@vitae.edu","address"=>"P.O. Box 560, 9295 Quam St.","city"=>"Springfield","state"=>"MA","zip"=>"77679","age"=>78),
	array("name"=>"Ian Melton","phone"=>"1-612-152-8226","email"=>"justo.Praesent@auctor.edu","address"=>"1731 Rutrum Street","city"=>"Madison","state"=>"WI","zip"=>"95638","age"=>54),
	array("name"=>"Rama Zimmerman","phone"=>"1-851-885-1520","email"=>"Suspendisse.eleifend.Cras@risusNullaeget.com","address"=>"337-6953 Lorem Rd.","city"=>"Topeka","state"=>"KS","zip"=>"22193","age"=>26),
	array("name"=>"Adara Baxter","phone"=>"1-739-430-5457","email"=>"tristique.ac@luctusaliquetodio.edu","address"=>"753-8918 Vestibulum Road","city"=>"Milwaukee","state"=>"WI","zip"=>"66927","age"=>58),
	array("name"=>"Aileen Dalton","phone"=>"1-455-294-7253","email"=>"a.magna.Lorem@tristique.co.uk","address"=>"Ap #560-7491 Fringilla St.","city"=>"Chesapeake","state"=>"VA","zip"=>"73795","age"=>36),
	array("name"=>"Ava Miller","phone"=>"1-201-879-0467","email"=>"quis@imperdiet.com","address"=>"8887 Ligula. St.","city"=>"Lowell","state"=>"MA","zip"=>"98423","age"=>49),
	array("name"=>"Brady Hester","phone"=>"1-301-771-2452","email"=>"ante.lectus@magna.co.uk","address"=>"356 Convallis Rd.","city"=>"Nampa","state"=>"ID","zip"=>"18647","age"=>77),
	array("name"=>"Bruce Mosley","phone"=>"1-170-974-2389","email"=>"mi.felis@risusMorbimetus.ca","address"=>"P.O. Box 472, 1700 Nisi Rd.","city"=>"Salem","state"=>"OR","zip"=>"48608","age"=>71),
	array("name"=>"Anne Manning","phone"=>"1-683-651-6539","email"=>"augue@pedeblanditcongue.org","address"=>"Ap #780-6113 Proin Rd.","city"=>"Montpelier","state"=>"VT","zip"=>"66878","age"=>19),
	array("name"=>"Shafira Morgan","phone"=>"1-409-206-9142","email"=>"nisi@consectetuereuismod.co.uk","address"=>"Ap #169-4614 In St.","city"=>"Newport News","state"=>"VA","zip"=>"27953","age"=>24),
	array("name"=>"Plato Morin","phone"=>"1-875-469-1963","email"=>"habitant.morbi.tristique@liberoatauctor.com","address"=>"Ap #869-5123 Sed Rd.","city"=>"Bridgeport","state"=>"CT","zip"=>"99685","age"=>65),
	array("name"=>"Jaime Scott","phone"=>"1-468-627-9482","email"=>"elit@eteros.com","address"=>"375-9442 Tempor Rd.","city"=>"Overland Park","state"=>"KS","zip"=>"14431","age"=>29),
	array("name"=>"Leonard Huff","phone"=>"1-937-943-6060","email"=>"Cras@mollis.co.uk","address"=>"914-8924 Sapien, Rd.","city"=>"Butte","state"=>"MT","zip"=>"19466","age"=>48),
	array("name"=>"Alika Cannon","phone"=>"1-373-388-2121","email"=>"orci.tincidunt@a.com","address"=>"Ap #215-3079 Facilisis Avenue","city"=>"Fort Wayne","state"=>"IN","zip"=>"41747","age"=>46),
	array("name"=>"Upton Frazier","phone"=>"1-889-149-4238","email"=>"gravida.sagittis.Duis@massaQuisque.net","address"=>"P.O. Box 727, 2044 Augue. Road","city"=>"Birmingham","state"=>"AL","zip"=>"35020","age"=>35),
	array("name"=>"Lois Palmer","phone"=>"1-891-110-6031","email"=>"sagittis.semper.Nam@enimcommodo.edu","address"=>"977-7704 Ultricies St.","city"=>"Huntsville","state"=>"AL","zip"=>"35419","age"=>69),
	array("name"=>"Roary Brady","phone"=>"1-129-554-9566","email"=>"id.nunc.interdum@Fuscefeugiat.ca","address"=>"Ap #720-3875 Nullam Street","city"=>"Henderson","state"=>"NV","zip"=>"47412","age"=>18)
);
```

## Pagination

* Would be better if we could paginate the results
	* < Prev | Next >
	* < Page 1 of 4  >
	* < Prev 1 [2] 3 4 Next >


* Consider the contacts example
	* What information do we need in order to make each of the above paginations AND display the proper results?

## Pagination

* **Offset** - Where we are going to start from
* **Limit** - How many we will display

\ 

* **Total** - Number of items there are to display

## Offset

* Offset makes no requirement about what it is
* Could be:
	* Number of items
	* Page number
	* Date/time

## Pagination 

* Lets try
	* With a for loop
	* With a while loop



