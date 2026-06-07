--
-- PostgreSQL database dump
--

\restrict EyfIH7CCWr4fIL1td48LZjoVs52Ob7EqjECHzK4R4GQZXMpGTCaUxybv50lHDtx

-- Dumped from database version 16.12
-- Dumped by pg_dump version 16.12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: ProductCatalog; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ProductCatalog" (id, barcode, name, brand, "categoryLabel", source, "createdAt", "updatedAt") FROM stdin;
a845eb23-2bf2-4b47-9788-c2717ac9167d	3155250349793	Creme Chantilly Président	President	Dairies	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
0f2f151c-8f1d-495a-8de0-ed502cad6588	8076809529419	Pâtes spaghetti au blé complet integral 500g	Barilla	Alimentos veganos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
565d0cbf-831d-4102-a78d-b540f5fb6780	3046920010603	Chocolate meio amargo com framboesa	Lindt	Salgadinhos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
1ca23224-1989-4c97-ab66-c737fa9303fe	80177609	Chocolate kinder	Kinder	Salgadinhos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
88dd9314-0bd9-4b59-a5f8-863096259454	5449000335906	Fanta Orange	Fanta	Bebidas	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
84b96520-37e4-4c1d-a5ce-11a6adf20e61	3014680009175	Bonbon à la Sève de Pin	La Vosgienne	Salgadinhos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
014cb8ba-4099-4b1b-9b4c-878b637be351	5601045300022	Guaraná	Guaraná Antarctica	Bebidas	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
7048eaef-00bf-4fd5-806a-5668ed7c1085	11117780	Néstor	Nestlé	Salgadinhos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
ebf512ce-eb8b-47fe-84fd-2d4367e24cfb	7891000412855	Alimento achocolatado em pó, NESCAU	Nestlé	Beverages and beverages preparations	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
a6f735d0-bb28-4869-842d-800e74017f0c	7898024394181	Nutella 350g	Ferrero	Pastas e cremes	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
72a30b4b-d542-48ff-9bbd-878d89c6e881	7898994081623	Tapioca Hidratada da Terrinha 500g	Da Terrinha	Alimentos veganos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
0c6f735e-2182-4dd0-a52d-d7096cb4d3e7	7893000394209	Cremosa com sal	Qualy	Alimentos veganos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
1a56fed1-b898-4e75-ace9-3dd6056c2113	7894900701517	Coca Cola Zero Açúcar	CocaCola	Bebidas	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
049dc8df-4d2f-4ed1-a627-a804c0b9f175	77940131	Turrón & Maní	Arcor	Salgadinhos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
6c0174a3-1a92-4cef-8e20-27d67eee9e35	7891000325858	LEITE PO NINHO INTEGRAL	Nestlé Ninho	Bebidas	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
5c696736-db49-46f9-9463-87e4087fb2f2	7892840819507	ACHOC PO TODDY	Toddy	Beverages and beverages preparations	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
3261d3d9-ee28-4f18-82c9-9bed0a45ed68	7891095911486	Farofa De Mandioca Tradicional	Yoki	Farofa de mandioca	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
85c18c66-fce1-43e3-859d-ca026ed8632e	7891203010056	Pão De Forma Panco Premium Pacote 500g	PANCO	Alimentos veganos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
375bd141-877a-4d37-bbc1-c6b38191112a	7892840819170	Toddy Original 750g	Toddy	Beverages and beverages preparations	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
a3a01600-0726-4c2c-b45f-0ea1c1353f01	40122915	Jalapeños	Kühne	Alimentos veganos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
41acb2cb-d00c-4bfb-9f8c-7e94854f1e32	5601216120152	AZEITE EXT VIRGEM ANDORINHA	ANDORINHA	Alimentos veganos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
f1163db1-06a1-4d10-b752-a837a1b59490	7896002360326	pullman tradicional pão	Pullman	Alimentos veganos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
98eb0272-4e1f-428f-b990-d4d53f3b79d1	7898215151708	Leite Integral Piracanjuba	Piracanjuba	Leites	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
e8ca63e9-cd59-4bb5-b09d-51e53a6d3dce	7891000248768	Kit Kat	Nestlé	Salgadinhos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
bc4c2075-0b44-4928-b3b9-8bfe870f538e	7894000050034	hellmann's maionese	Hellmann's	Condimentos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
1388e8fc-c1d0-4dce-84aa-f9296b0bd6cb	7896094910959	Adoçante dietético líquido	Zero Cal	Sweeteners	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
48c2844d-f36c-4baf-9ad5-d5347e6d4b44	8076800315097	N-Bucatini n°9	Barilla	Alimentos veganos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
15f47ea4-04d2-4937-b8d9-1d9672f9e7df	7898080640611	Leite UHT Integral	Italac	Leites	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
cddb8758-1013-45d5-a794-87fe4d38ecbe	7898024395232	Nutella Ferrero	Ferrero	Pastas e cremes	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
d710c7e0-5d06-490c-b525-905d79e14bc0	7891000426210	Nescau Lata 350g	Nestlé	Achocolatados	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
1af4eddb-e5ff-4c78-b49a-3a151822be07	5601252231164	Azeite de Oliva Extravirgem Clássico	Gallo	Alimentos veganos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
8a14ca8a-c833-4512-95cf-767a623e9647	7891079000229	Nissin Lámen Galinha Caipira	Nissin	Alimentos veganos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
5229ea10-984f-4fc6-8812-020e9c5f2a3a	7896094910904	Adoçante Líquido Zero Cal 100ML Ciclamato Unit	\N	Sweeteners	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
5d152505-306d-411b-a4f3-bce5b0c19b83	7896066301457	Pão De Forma Integral Wickbold Do Forno Pacote 500g	Wickbold	Alimentos veganos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
8ecbdb96-8e03-471c-94c8-353f65462ec8	7898215151784	Creme de Leite Piracanjuba	Piracanjuba	Leites	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
51cf659c-c228-4d2c-9dcb-c4108acb9c62	7898215152002	leite condensado Piracanjuba	Piracanjuba	Dairies	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
38485420-c1cf-4c2f-969f-99f328e30f7a	7891000379585	Nescau	Nestlé	Beverages and beverages preparations	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
c9bd634e-e66d-47a7-b075-f15a19acbd9b	7896007811007	Salsa de Soja	Sakura Nayaka Alimentos Ltda.	Condimentos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
e8586928-c83b-4ff0-94f3-8be59b0cfaa8	7622210596413	Wafers, barras recheadas e tabletes sortidos	LACTA	Salgadinhos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
fc2d85b8-2a22-4d7b-bd00-a55ba36a8c1e	7894900010015	Coca Cola LT 350ml	Coca-Cola	Bebidas não alcólicas	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
f98193cc-81b5-4b3b-9132-3da020a03002	7896004006277	Salgadinho De Batata Original Pringles Tubo 104g	Pringles	Alimentos veganos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
2c324987-d054-4f69-a1fc-4d8211ae14e0	7622210575975	Wafer recheado com cobertura sabor chocolate	BIS	Alimentos veganos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
974581a7-a21c-438c-9566-73ed14d68e73	7894900700015	Coca Cola Zero Açúcar	Coca-Cola	Refrigerante	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
69fd1d92-4908-4d8b-95bc-8dde1811923e	7898080640413	Leite Condensado	Italac	Dairies	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
22cd4a14-0451-4d3d-9633-b4bbbea312b2	7891962051345	Pão de forma integral (36% Cereais integrais)	Visconti	Alimentos veganos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
775b683f-30d7-4c3f-bafb-3d953147960d	78939318	Bombom Wafer Lacta Ouro Branco Pacote 20g	Nestlé	Salgadinhos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
58715651-714d-472e-b391-dd1498148b89	8691066267050	Hay Hay Biscoito com creme de caramelo coberto de Cacau	Cizmeci Time	Salgadinhos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
51e6c916-4e34-4149-b44e-dce98158fd02	7896036090244	Óleo De Soja Tipo 1	CARGILL BRASIL	Alimentos veganos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
e6709987-9956-4640-a7ce-67392af0f1d6	7894900530001	AGUA MIN CRYSTAL S/GAS 500ML	CRYSTAL	Bebidas	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
94c12ce1-961d-43d5-bfff-dc916b181c81	7896024761651	Biscoito doce maizena	piraquê	Salgadinhos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
da615cd7-9061-4ae4-891c-6de28e3eda38	7891000379691	Nescau	Nestlé	Beverages and beverages preparations	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
7a4a03d4-af45-4ae8-907a-04ce0ef72ace	7891000325131	Bombom Nestlé Especialidades	Nestlé	Salgadinhos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
9e4fcf23-7128-411f-80fd-904521c482e2	7891107101621	SOYA Óleo de Soja	SOYA	Gorduras vegetais	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
4f0f00a4-c0a4-4f59-873d-81228259e6e9	7891962064048	Pão fermentação natural tradicional	Bauducco	Alimentos veganos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
d796d834-2187-4cd0-a52b-ec964e78eda7	7891000393284	Leite em pó integral instantâneo Ninho	Nestlé Ninho	Leite em pó	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
b6dad975-01b8-4d0c-91db-6a27329319ef	5607047020869	Barra Aveia & Cereais Chocolate Preto & Amendoins	Pingo Doce	Salgadinhos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
526dab0c-a8d7-4f69-996a-6f8adff595d7	3664346348997	Terry's CHOCOLATE ORANGE	Terry's	Salgadinhos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
c4b454c0-ee4f-436f-855b-03a964a80a66	0011210009530	TABASCO Molho de Pimenta Jalapeño	TABASCO	Groceries	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
a4ceff23-81cd-4844-b3d5-4c9af1686bc8	7891008116632	Garoto garotices 250g	Garoto	Salgadinhos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
b340f5be-c16b-49ab-91c0-32e6a4225989	78933873	Coca-Cola Zero	Coca Cola	Bebidas	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
fb73666d-c7ca-42d4-9d80-4ae73e8fc0e6	7896004006239	Salgadinho De Batata Creme E Cebola Pringles Tubo 109g	Pringles	Geral	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
77e4b5da-1c67-4b24-9f5a-57f1499c79b9	8076809542517	Massa Italiana para Lasanha BARILLA	Barilla	Lasagne	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
cc3c259c-a523-4914-8e16-7e27980157d5	6210316182107	Pepsi cola	Pepsi	Bebidas	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
223f42b8-8d26-4754-8e35-51fd3bd798ae	7622300119621	fermento Royal	Royal	Geral	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
67c46647-9303-4da8-bb60-c39f26543265	7891203010605	Bisnaguinhas Originais	Panco	Alimentos veganos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
9c58e033-a006-43c5-a418-ed703b1f40a8	7894900531008	AGUA MIN CRYSTAL C/GAS 50OML	Coca-Cola	Bebidas	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
701edc4d-ebc8-478d-915d-3c48e242b07c	7891098000040	Matte Leão - Matte Original	Leão	Bebidas	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
8f15d1ac-b045-4e6e-9619-f1cce92255a1	7898080640222	Creme de Leite UHT Italac	Italac	Creme de leite	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
9400534a-aa43-4b57-b89d-cb717511bad3	7894000050027	Maionese Hellmanns Pote 250g	Hellmann's	Condimentos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
a8cb5239-3ecb-46b9-aaf8-e7eb26b83e2a	7898024396529	Nutella	Ferrero	Pastas e cremes	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
13ea3ad2-e90c-4d00-a9c9-ca14fb63f81c	7891962051338	Pão de forma tradicional	Pandurata	Alimentos veganos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
064a6fb2-5335-4193-8388-6884f795d402	7896066301778	Pão de Fôrma Integral - Wickbold - 550g	WICKBOLD	Alimentos veganos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
4e442179-74a5-4bd0-80c2-6125f151b81a	7891962053196	TORRADA INTEGRAL BAUDUCCO	Bauducco	Alimentos veganos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
4fb52ea4-c8a5-4407-8cc5-3f62635c606d	7891098038456	Chá Matte Leão A Granel 250g	\N	Bebidas	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
01b6e531-e0f0-4941-98c8-09d6c3cd4bdf	7898024397915	Nutella B-ready	Nutella	Salgadinhos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
80ed10c2-6241-419e-9c92-c1b67986d756	7622300990749	Pack Biscoito Original Club Social	CLUB SOCIAL	Salgadinhos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
17d9b27d-efbe-4eb2-949a-76c3c87163d5	7891150027848	KETCHUP TRAD SQUEEZE HELLMANNS	Hellmann's	Alimentos veganos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
e6f9fc8f-a5fe-49a8-99b9-fb81c33d6e28	7891025115656	yoPro Chocolate 15g	Danone	Bebidas	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
11725ef3-b31c-4300-9d11-6fa6819ff57c	7898215157403	Leite Ninho Integral	Nestlé	Leites	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
65b83a84-96be-4aa6-a66a-854628670853	5601989003126	Herdade Do Esporão Extra Virgem	HERDADE DO ESPORÃO	Vegetable oilsz    Olive tree products	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
ce52fabb-c99f-434f-b112-4fa93c0b468f	7891962053189	Torrada bauducco	Bauducco	Alimentos veganos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
a767d8e9-d3ea-4e39-8a7e-1da220ff5bb3	5906747176594	Fito's SOUR CREAM & ONION	KUPIEC	Salgadinhos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
1f245c06-5c5e-4790-afab-10e4bab59882	0075720431151	Natural Spring Water	Poland Spring	Bebidas	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
e67d52ef-70ca-43bd-8888-fef1131fb58e	7891000065440	Leite moça	Nestlé Moça	Dairies	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
d4441c55-d292-4642-bd59-696778beb980	7891141019838	Suco de Uva	Aurora	Bebidas	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
ada8aabe-dce3-4cec-a340-d16e0ae522ec	7893000383005	Margarina sem sal	Qualy	Alimentos veganos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
700551d4-08ec-478a-be7b-795242df8240	7894000010014	Maizena	Duryea	Alimentos veganos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
69d796da-199d-4ac1-aff5-d8a616c99783	7896002364546	Tortilha Rap10 Fit - Bimbo - 330g	Rap 10	Pão tipo tortilha	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
d2fad66c-82ff-460c-8cb3-55a48f83c837	8410770022058	Sopa Juliana	Trevijano	Alimentos veganos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
3e7e07e4-8323-4beb-9d09-a9fbee740a42	7622300990732	Biscoito Salgado Club Social Original	CLUB SOCIAL	Salgadinhos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
0b817f8c-53be-4caf-ac9e-546f1f8d5db1	7898215151760	Leite UHT Semidesnatado	Piracanjuba	Leites	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
19a87485-612a-4ffd-9591-6c9b57a3e5fc	7891000051436	BISC PASSATEMPO LEITE 150G NESTLE	Nestlé	Salgadinhos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
f3696efe-d003-459f-b7e1-e2f0df93b7df	7891193010074	Pão de Sanduíche Forma	Marilan	Alimentos veganos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
d71cef0f-54fd-48c5-af85-0d6aa115258f	7896336005917	Paçoquita	Santa Helena	Doce de amendoim	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
64190bfa-a7cf-4ff1-81dd-4e4a3bee49c4	78938816	Bala Mentol Extra Forte Halls Pacote 27,5g	HALLS	Salgadinhos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
ae90a34d-1ef8-4406-881f-2c36a20c2065	7622210999634	MILKA Chocolate Milka Branco	Milka	Salgadinhos	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
f7627c45-125f-4301-a364-fe300cc72ba6	7896002300377	Pão de frutas, grãos e castanhas	nutrella	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
c8cd4d91-632d-4d7f-b7df-38e8da29c8b2	7896009301049	Sardinhas com óleo	COQUEIRO	Seafood	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
df0fbaad-1d89-4ff2-9e5c-deb221ace520	7896066301235	Pão Integral Tradicional Wickbold Pacote 400g	Wickbold	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
62e5a70d-ba8f-4a26-8ff5-062ff21d96ca	7898215151807	Bebida Láctea Uht Chocolate Pirakids Caixa 200ml	Piracanjuba Pira Kids	Bebidas	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
f4b8d4b9-753c-4ee4-aca3-2016a82412b1	7894904271528	Margarina Com Sal E Creme De Leite	Delicia	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
9fcd67fa-67fe-4aea-bb1a-609784dbf13a	0778777121111	Yopro boost 15g	\N	Bebidas	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
a4b4e714-2209-42b9-8c48-3f63933a97b3	7897047003834	Paçoca Rolha	Moreninha do Rio	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
00d08fe9-726f-4213-a100-817be72f6acd	7891962064055	Pão Fermentação Natural Integral	Bauducco	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
6d202b33-1f4d-4a1f-9962-d7e37e05c5e6	7896625211401	Requeijão Cremoso Tradicional	VIGOR	Queijos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
76537fb9-8187-4774-8aaf-d40203b9570e	7891095031115	YOKI Batata Palha Tradicional 105 g	Yoki	Batata Palha	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
6a1c2c35-785c-4c11-95a4-6c2dbadb968a	7891000071786	Nescafe Classic	Nescafe	Bebidas	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
039b4e07-a06f-4ee8-97e6-7d5321a0b51b	7891000100103	Leite Condensado Integral moça	Nestlé	Dairies	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
a4f9aca9-2a99-4731-ad7d-045b072e8668	7891000102626	Aveia Em Flocos Finos Nestlé Caixa 170g	Nestlé	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
86110b97-d3da-4ac5-b374-3ef86b53fee6	7891000120095	Cacau Pó Solúvel Dois Frades Caixa 200g	Nestlé	Cocoa and its products	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
6bacf67f-a915-40f5-9b79-d66d9ca4819b	7891000241356	BISC RECH PASSATEMPO CHOC 130G NESTLE	Nestlé	Salgadinhos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
73aa295f-0e94-43a1-bbbc-fef50074a48c	7891991000826	Guaraná Antartica lata	Antarctica	Bebidas	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
c4d828ed-2879-46a3-afc1-9af467bd3546	7894321711171	Toddy	Toddy	Achocolatado	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
a817baec-46d2-4335-b629-6c15aed513c0	7894321722016	Toddynho sabor Chocolate	Toddynho	Bebidas	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
95880160-19f6-4fbb-b20a-56dd60c41cff	7896006779674	Mini Biscoitos de Arroz Integral Camil Natural	Camil	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
9a810c67-473f-49f3-acc1-165f9ed4486f	7896051115014	Leite Condensado Itambé	Itambé	Dairies	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
420d63f2-06b0-4fc0-adf0-fe76485df6af	7896279600538	Óleo de soja refinado	Coamo	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
4cce6c1a-c52a-44f0-82db-ef6e3de61274	7891999144485	Requeijão Vigor 200G	Vigor	Requeijao cremoso	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
7f2a42cd-7b5a-45db-b937-559a299c9a98	7898905356567	Oleo De Coco Ex. Virgem 200ML - Copra	Copra	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
bf06343b-1f85-4456-aa5e-2cd0cc97cb3c	7891021006125	Café Torrado E Moído Tradicional Melitta Caixa 500g	MELITTA	Bebidas e preparações para bebidas	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
ae7c65a6-d815-4c0d-8220-0230865fb053	78912359	Baton Ao Leite	Baton	Salgadinhos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
58860854-43e1-4b79-a66a-eff8f085016e	7622300830151	Biscoito Original Batman Oreo Pacote 90g	OREO	Salgadinhos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
ba5796f3-8bb8-4c10-84ef-c96dcef4367a	7897517206086	Molho de tomate tradicional	Fugini	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
a7818443-9234-4017-9529-b58dd9b5a0fa	7894900530032	Crystal - sem gás	Coca-Cola Brasil	Bebidas	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
43707a04-5c9c-41d3-b77f-ee9537065a8d	7896002303460	Pão de Forma Artesano Integral - Pullman	Artesão	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
5bff8325-d532-4a34-b85f-f49c2fd1728f	7896051164609	Iogurte Natural Integral	Itambé	Iogurte	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
c2a73799-dbb4-41ef-a87d-ba30d6fbadf2	0070847022206	Energy Ultra	Monster	Energéticos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
813a0e3f-546e-4e2a-aab2-0a6e98e59e05	7894321711058	Toddy Light	Toddy	Beverages and beverages preparations	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
6cbe769b-3dbd-4521-9d1d-d8b99597dc35	7891079000205	Macarrão Instantâneo Lámen Carne Nissin Miojo Pacote 85g	AJINOMOTO	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
34122dce-6be8-4d37-a43d-9d7f5e663b6e	7896002311274	Pão Integral Aveia	Nutrella	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
b556e2e4-6e16-446f-9450-4b2981d4ceea	7896002310253	Pão De Forma Castanha Do-Pará & Quinoa	Nutrella	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
46b4b1d7-5fae-4350-a017-08f5fc74da2c	7891048050620	Gelatina de cereja Dr. Oetker	Dr. Oetker	Gelatina	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
32b9d91e-5cc3-48c7-ae09-7ed6437d59e0	7896045110582	Achocolatado Pó 3 Corações Chocolatto Lata 370g	CHOCOLATTO	Achocolatado	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
b4c1c3c2-d2d4-468d-8f53-5a47895c9d8f	7896292333000	predilecta	LIGHTSWEET	Geral	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
0eec4905-4729-4de8-9f7f-8dd8c4a44fe3	7891193010081	Pão De Leite Seven Boys Pacote 450g	SEVEN BOYS	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
948b7f84-5e82-4c95-a7d5-66928a7a7636	7898247780297	vitaliv	Vitaliv	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
142ec8c8-762e-4119-ae1e-d982fd33e2f4	7896066301693	Pão De Forma 5 Zeros Aveia, Linhaça e Quinoa	Wickbold	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
2275b753-f370-49fb-b478-6c25c46e0fdc	7896005800157	cappuccino clássi	3 corações	Cafe em po	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
04b725da-931c-46ca-9ea5-6ae418683b0d	7891000072974	Yogurte integral sabor mel	Nestlé	Sobremesas lácteas	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
30856a75-f9fb-4202-89da-f6079b4049e2	7896102503708	Tomato Ketchup	Heinz	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
ca696c7f-cc8b-43df-b35e-4122d0c4ea85	7892840822286	Cheetos sabor parmesão	Elma Chips	Salgadinhos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
86971e51-772f-4636-a3b9-98ce0d760067	7898080640635	Leite UHT Desnatado	Italac	Bebidas	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
50ecc8ce-654b-4856-b34e-8458eef3a58f	78909434	Bombom Ferrero Rocher Pacote 37,5g	FERRERO ROCHER	Salgadinhos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
028d2e7e-784d-42e0-bc2c-e7206eb82d30	7891000378175	Iogurte Integral Natural Nestlé Bandeja 340g 4 Unidades	Nestlé	Sobremesas lácteas	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
0a804d70-091d-4345-9392-02be7e3c020e	7891021006071	Tradicional	Melitta	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
74cb1fb4-c27a-444c-9ae6-dbae3c9da14b	7896002363792	Tortilha Rap10 Original - Bimbo - 297g	Bimbo	Geral	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
0540f1b0-e807-49cc-ade9-61a9b7dcb001	7896625211395	Requeijão Cremoso Gordura Reduzida	Vigor	Requeijao cremoso	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
9171fe07-d248-4162-bda1-574b3a9b23c2	7701362014904	Avellana	Juan Valdez	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
beb9f53d-e3de-4c69-9889-1d20fdc87de1	7897001010014	Óleo de soja	Cocamar	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
ea246758-72d0-44db-a388-d071039e353f	4902663018896	Pâte blanche miso	\N	Geral	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
19633be9-eac2-4ccd-84c3-be323adcc592	7891000102640	Aveia Em Flocos Nestlé Caixa 170g	Nestlé Aveia	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
50035644-a354-4e1e-b35d-d90118212475	7891000300503	Nescafé Original Extraforte	Nestlé	Bebidas	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
1eda0fda-d52b-4703-bf7c-71899d16644b	7891167011779	Atum Ralado Ao Natural	Gomes da Costa	Seafood	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
b1f89852-56a5-497c-89ea-9b7cabe8d1d5	7892840812423	H2OH! limão 500ml	Pepsi	Bebidas	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
16679408-eb32-4e7e-b92a-021b5b1854e8	7896102503715	Yellow Mustard	Heinz	Condimentos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
79e4297b-b89b-42e5-9c0e-86816806325d	7896292370050	Goiabada Cascão	Predilecta	Pastas e cremes	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
bc6a54c2-54d1-4795-9a67-e6b865e5408e	7896066304571	Pão Integral Maçã, Canela E Passas Wickbold Grão Sabor Pacote 500g	WICKBOLD	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
bb5735eb-fcbc-4e5b-aeec-119fdf1df5f8	7891031412091	Maionese Tradicional	Heinz	Condimentos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
790af55c-235c-4cae-8f96-629029e475fe	7790045001195	Frutigran Salvado	Frutigran	Salgadinhos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
3c0786e0-369a-4f2e-8303-a0abb26be858	7894900011159	Coca cola	Coca cola	Bebidas	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
3420be6e-1149-4967-ac00-640b6f6fac15	7898247780075	Óleo de soja	Concórdia	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
b0c00847-495f-45dd-969c-c6b75046af21	7896004400372	Leite De Coco Tradicional	SOCOCO	Leite de coco	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
df358a0c-4035-4b1f-8c04-00c842f3a7c5	7891104393104	Adoçante Líquido Sacarina Adocyl Frasco 100ml	ADOCYL	Bebidas	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
ba31b75d-5bab-417e-9b18-271d43cdf4e1	7891095002207	Pipoca Para Micro Ondas Natural Com Sal Yoki Pacote 100g	Goku	Salgadinhos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
5282916b-6e63-4e0c-8a8b-a595f12ae663	7891962047560	Cereale cacau e castanhas	Bauducco	Salgadinhos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
93feb76a-ff34-4238-bd0b-75511e8bfa81	8001860260315	RISO SCOTTI - Arroz Basmati Natural Scotti	Riso Scotti	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
3c18489c-145e-40f4-80ff-940a1874c796	7891152507799	Adorita Tropical	Adorita	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
3f851c8b-c4d4-466e-9774-6e0451d24e88	7897395020101	Itaipava 350	\N	Bebidas	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
7269fdcf-49a6-404f-ac5a-5707ab0cb6b3	0041789002915	Ramen maruchan	Maruchan	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
402fb9b2-f277-4544-b5e9-415bc3d4ec40	7896002300360	Pão integral com trigo, aveia, semente de girassol, gergelim e semente de linhaça	Nutrella	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
6bdcb7c6-7019-4e50-9d5d-9ca3eb6e832f	7892840815752	Aveia em flocos	Quaker	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
394f6fa1-4c4c-4032-9d02-bba3e873e9ca	7891025120230	Iogurte Integral Natural Danone Copo 160g	Danone	Sobremesas lácteas	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
f1732be1-918e-4d65-920b-6790d5f9faa5	7891962060460	Tostada Integral	Bauducco	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
1d0452c7-d59e-412e-812f-403d97109fbb	7896481130137	Farinha De Milho Flocada, Pronto	coringa	Bulk	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
c6f5b9eb-7b8e-48ae-9a74-591f2b755614	7896006716471	Biscoitos de Arroz Integral Chia e Linhaça	Camil	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
e2d2258a-e8dd-466a-9ee3-91c6d4145f48	7893000079298	Margarina Cremosa Com Sal Qualy Pote 1kg Embalagem Econômica	Qualy	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
abd693b1-e026-4c33-97f6-1dded5f4583f	7894900593709	Refresco Adoçado Uva Del Valle Kapo Caixa 200ml	DEL VALLE	Suco	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
6e72e116-77c6-4f94-9bdd-518c02948537	7894900504002	Isotônico Mix De Frutas Fifa World Cup Qatar 2022 Powerade Squeeze 500ml	POWERADE	Suplementos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
0ea7c41b-94ec-4c49-a24a-6447909130cc	7896066343242	Grão Sabor QUINOA	wickbold	Geral	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
1fa59d4b-ae70-461b-aaa9-bbb82b3c5e7e	7892840267841	Snack De Trigo Presunto Defumado Eqlibri Panetini Pacote 40g	Equilibri	Salgadinho	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
d86887df-5279-46de-870a-dad154758cf4	7891025115649	Bebida Láctea Uht Coco Com Batata Doce Zero Lactose Yopro 15g High Protein Caixa 250ml	YoPRO	Bebidas	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
91dd9262-b0e5-4032-ac3d-0d0d221be707	7896089012637	Pilao Traditional Coffee	\N	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
12fbd271-cb65-49be-9336-ec51d09f426a	78911000	Yakult Leite Fermentado Desnatado Adoçado L. casei Shirota	Yakult	Leite fermentado	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
c6ab20cc-e69a-41c7-8b02-0387c5d95480	7892300000933	Flocão Farinha de Milho Flocada	Sinhá	Flocão de milho	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
2a4dd6c0-84d4-44c5-8798-6369946b96b9	78908901	Refrigerante Coca Cola Garrafa 200ml	COCA-COLA	Bebidas	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
8c9fbc16-5dbb-4ab7-8ab4-fc52c98b078e	7896030519611	Creme de ricota light	Tirolez	Alimentos Light	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
9f621b52-7485-4306-86c5-6d94b03562c7	7898080640628	Leite UHT Semi Desnatado 1%	Italac	Leites	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
17bbdfd0-9646-488b-89f1-bb7b96ecc3e1	7891962054810	Cookies	Bauducco	Salgadinhos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
a0714597-a4b9-4f73-954a-8fa8f8f8596d	7896036099988	Molho De Tomate Tradicional Pomarola Sachê 300g	Pomarola	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
70e10a93-5aab-4df3-8e94-1c5cba6d122e	7891000029329	Nescafé Tradição Forte	Nestlé	Alimentos veganos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
29d4a14c-0626-443a-9988-f51260d4fd91	7891000073018	Yogurte Natural Desnatado	Nestlé	Sobremesas lácteas	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
7d907142-c93b-4ea2-b966-42071a282f91	7622300992286	Club Social Integral Tradicional	Mondelez International	Salgadinhos	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
fb8a0482-b6ad-4556-8389-cdfe84e5b98f	7892840815769	Aveia Em Flocos Finos	Quaker	Ms n• 6.7394.0002	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
26f81797-3164-40de-bc29-233412229cf2	7894900027013	Refrigerante Coca Cola Original Garrafa 2l	COCA-COLA	Bebidas	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
dd1fb487-9db5-4e22-bc97-3026e5bd1cb3	7897517209544	Milho verde Fugini	Fugini	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
d07b637e-d8cb-4965-80f4-23bba98563a0	7891515555337	Margarina Original Com Sal Becel Pote 500g	BECEL	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
96e2e497-c9d9-407f-9f55-6ff1ef7373f9	7898341430098	Néctar Uva Del Valle Caixa 1l	DEL VALLE	Bebidas	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
e48d2b62-844a-4015-abc9-d3dc07a2787d	7891000336373	Chocolate ao leite Alpino	Nestlé	Salgadinhos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
87a81566-a0cd-445e-b684-d0f9b5c01c23	7896051128069	Leite NoLac Zero Lactose Integral Itambé 1L	Itambé	Leites	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
d978ebb8-86e7-46df-8f7d-e9106b9dfef2	7891000358801	Flocos De Cereais Neston 3 Cereais Lata 360g	NESTON	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
a2813913-912b-4f64-9f83-e910ae7d12da	7891000376928	Biscoito Recheio Doce De Leite Bono Pacote 90g	BONO	Salgadinhos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
2fb647f2-74bb-4880-ad8b-5bc50733ca09	7898215157106	Bebida à Base De Amêndoa Original Blue Diamond Almond Breeze Caixa 1l	BLUE DIAMOND	Alternativas ao leite.	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
f43640ed-61ab-49e4-94e3-111bb5aebd64	7896036000724	Extrato De Tomate	ELEFANTE	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
d25c4f1a-e33e-4300-94a7-f3fdc81e3c71	7899970402852	Chocolate Branco Cookies N Creme Hersheys Pacote 77g	HERSHEYS	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
73ae0aa6-758a-4b3c-ab55-0f0c0dd61692	7896004004679	Cereal Matinal Original Kelloggs Sucrilhos Caixa 510g	SUCRILHOS	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
e2855b13-6a34-4491-8379-b31ae7ad35c8	7896423456561	Chocolate Mousse De Maracujá Snickers Pacote 42g	SNICKERS	Salgadinhos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
e1ea3cdf-91d4-4e78-bd27-198218f33933	7896102501896	Molho De Tomate Tradicional Heinz Sachê 300g	Heinz	Geral	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
b8ca5f1f-db90-4ced-9dc0-6ac368de07dd	7899970402814	Chocolate Ao Leite Hersheys Pacote 82g	Hershey's	Salgadinhos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
974d8258-c498-4c0a-a09e-7a8d2b158916	7896079500151	Leite UHT Integral	Elegê	Leites	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
ee38025b-a7a2-4d02-91b2-ea13f3c9ce48	7898215157847	Beb Lac Piracanjuba 250ml Whey Z/Lac morango	Piracanjuba PRO FORCE	Geral	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
661cda36-842c-42a4-b5d2-9d541a4372a5	7898095630089	Sorda	\N	Geral	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
5b619c11-17b4-43bd-bf29-15c6acd1c051	7891962067278	Pão fermentação natural multigrãos	Bauducco	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
a411521d-f819-4c5d-b56e-652dbb208d0c	7896004006406	pringles churrasco	Pringles	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
c4e85ca6-ffb1-4a87-bd65-1d0a1b5c08b8	7898416780028	BISC POLVILHO SAL CASSINI	Cassini	Salgadinhos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
9ef79999-9c0a-49c8-a8c4-8a2a3bb120aa	7898960982213	Farofa Tradicional da Terrinha	Da Terrinha	Farofas	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
bf362614-99d9-4589-9414-1b5316ba17aa	7892840815264	Aveia Em Flocos Finos Quaker Caixa 450g Embalagem Econômica	QUAKER	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
15b8a344-96eb-485c-b297-ab1d54c9c44e	7891025120223	Danone Natural Desnatado	Danone	Sobremesas lácteas	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
f9a249c6-f078-4a88-be72-461693e5185b	7891203010209	Pão Caseiro Milho Panco Pacote 500g	PANCO	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
ded10433-d2b0-4995-a354-df526b3b10e2	7893000979932	deline	Sadia	Margarina delícia Sadia	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
ea50905e-47fb-48f0-9ba1-8babe811a803	7894000010021	Maizena	Duryea	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
e1b2bf5e-7efd-4856-9a8e-8d89a979287c	7896066301143	PAO WICKBOLD FORNO 5 ZEROS INT 400G	Wickbold	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
6323a10a-ca0d-40c7-9335-59c541e47f19	7896102000122	Tomato Ketchup	Heinz	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
5c72742b-11d3-4ca0-9805-87d2ba04bb57	7891000244449	Iogurte Parcialmente Desnatado Morango Nestlé Garrafa 1,25kg Tamanho Família	Nestlé	Sobremesas lácteas	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
f6b65349-16a2-4cfe-a20a-e202ce446ee0	7892840822347	DORITOS QUEIJO NACHO 75G ELMA CHIPS M	Doritos	Geral	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
ed641c30-f9ef-4691-835c-b3d1a63796e3	7892840812874	H2OH limoneto	H2	Bebidas	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
a87bddcb-ba14-43ad-a4ae-3443ec76a698	7896003739343	Lev Magic Toast Integral	Marilan	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
f4036798-6a9b-47b6-b31e-83da49731fdc	7896102503722	Tomato ketchup	Heinz	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
83ff59fa-67a6-459e-bcce-856a95f54a33	7896102509144	Quero Mostarda	Quero	Alimentos processados	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
654de4e5-5b3f-4bb1-83e0-c1f93fcd31a4	7891097106422	Iogurte Pense Zero De Mamão	Batavo	Dairies	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
55d9727a-b44b-4498-a3db-190b84fa71d3	7622210592781	Biscoito Recheio Morango Trakinas Recheio Pacote 126g	Trakinas	Salgadinhos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
3acecad7-033b-4a29-89a9-ed5d5c807216	7892840822903	Salgadinho de milho sabor presunto	Elma Chips	Salgadinhos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
f6802522-f3d7-404b-a6af-e716abd261e8	7891000072998	Iogurte integral com preparado de cenoura, laranja e mel	Nestlé	Sobremesas lácteas	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
0e9f8120-1161-4065-bfe6-0569e67dad86	7898955705490	Bebida à Base De Amêndoa A Tal Da Castanha Caixa 1l	A TAL DA CASTANHA	Bebidas	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
ad8c7c4e-23d4-473c-b66d-a0cb95bb401a	7891167021013	Sardinhas com óleo - peso drenado 75 g	Gomes da Costa	Seafood	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
d98c8345-80ae-4327-a4a3-1be7d8ff3824	7898994081630	Goma de Tapioca	Da Terrinha	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
2639f3e0-89b7-4c6a-ae90-afa306e8f96c	7891150072046	Maionese	Hellmans	Condimentos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
d80d4326-9e04-4ae6-825c-dee88e3613f5	0041508235785	Aranciata Orange Sparkling Orange Beverage	Sanpellegrino	Bebidas	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
3dc1bdf7-0df6-4de5-bc0d-0a5e4c791f99	7891962076317	Bauducco Speculoos	Bauducco	Salgadinhos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
b409e5d7-0296-44a0-89db-7a1014d91b9e	7899659901096	Bonare	\N	Geral	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
e42fce39-d031-4735-8560-7be57104a029	7896256601848	Leite UHT integral	Tirol	Leites	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
7de591d6-0bed-4859-8711-5afe63b9dc97	7896292340503	Milho	Predilecta	Geral	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
4a2b5e57-5c84-44d3-9918-cdbce1d04d86	7898755180084	Barrinha Trufa De Chocolate	Bold	Dietary supplements	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
9430fe53-e8c5-4b19-b915-b6e51b6cefb5	7891167000001	Azeite de oliva	Gomes da costa	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
b51e31ed-13a7-44e1-b95f-f32976ef9877	7802920010298	Sin Lactosa Mi MANJAR TRADICIONAL	Colun	Geral	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
bbbe2e85-31b9-4e5a-af8c-51f8a6de02b8	7896504305078	Leite Integral	Santa Clara	Leites	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
a8249f6b-e03d-4b64-a297-71780dd5d1bd	7896045115365	Achoc Pó 3 Corações lata	Três corações	Achocolatado em pó	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
cfe80781-56f1-4752-8726-c436351f076e	0045300000558	Peter Pan Peanut Butter Crunchy	ConAgra Foods	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
4dca0c50-747f-4d7a-8c58-f4bb02e12abb	3760091729828	Pur jus de raisin Bio	Ethiquable	Bebidas	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
92c5e12e-e338-41f7-9958-2e0150f79eda	7790045001188	Frutigran Avena y Pasas	Granix	Salgadinhos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
94fda9b2-f407-48c9-b078-093459022c44	7891000071823	Nescafe Classic Coffee	Nescafé	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
07777c17-c867-406e-9f10-dd554e34df11	7891000078518	Farinha Láctea	Nestlé	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
c343abcd-8c8c-45f8-90c3-9a08e15824f9	7891000109908	Leite em Pó Sem Lactose	Nestlé	Leites (liquidos e em pó)	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
b1da02d8-5c70-4741-aa6f-a351b0036400	7891000248829	Chocolate KitKat Dark	Nestlé	Salgadinhos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
7ff1aba2-a4da-42e5-9a91-7d326056ec87	7891000451304	Chocolate em Pó Solúvel	Nestlé	Bebidas	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
8cd8e18e-e585-4adf-a4cf-ef679c3ee624	7891167011755	Atum Sólido Ao Natural Gomes Da Costa Lata 120g	Gomes da Costa	Atuns em filete ao natural	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
4b6c2486-c6a7-487f-8179-fa7a82bb6615	7891910000197	União Refinado	Tio João	Geral	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
c9658acb-52ce-45a6-a094-b03e82ac4b9f	7891991000727	guaraná antártica zero Wandinha	Antarctica	Bebidas	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
82cdd106-447f-4e68-809c-6944591ac191	7896000530363	Suco de Maracujá	Ebba	Bebidas	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
774c9929-134e-4362-9eb0-3edecef87ee2	7896002365420	Tortilha Integral Rap10 - Bimbo - 330g	Rap10	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
1f7ccaa1-289f-4510-8c90-cc7921db8560	7896331100310	Manteiga Aviação	Aviação	Pastas e cremes	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
38a66933-e804-4caa-968d-103d0206f255	7896331100372	Doce de Leite	Aviacao	Pastas e cremes	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
0d9e5d5a-69e9-40fd-809c-01a9d7c37d38	7896336002237	Paçoquita	Santa Helena	Paçocas	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
858cd81f-560a-467a-a2e8-f7783dfb891c	7898215152811	Leite Longa Vida Semidesnatado Zero Lactose Piracanjuba	Piracanjuba	Pasteurizacao	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
9bae96c2-8945-47fd-82b2-29368e4d569d	8007150906086	Azeite It Ev Verd500	Olitalia	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
6b8b2426-9f18-41ea-bb2c-6a8312892d34	7891095016686	Pacoquinha Tablete Yoki	Yoki	Geral	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
826c179c-89f9-4a17-86e8-1ef6aef877df	7896036090602	Óleo de girassol Liza	Liza	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
420a6225-7250-44f6-8104-905099bda296	7891991002561	guaraná antartica	Antártica	Bebidas	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
720a99f5-8842-458e-bfed-2b68c6d24d62	7894904571956	Doriana Cremosa com sal	margarina	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
b85b91d1-23f9-40c3-a825-7c38dac608d2	7894000050720	Maionese Light Hellmanns Pote 500g	Hellmann's	Condimentos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
4637d5d5-20f0-44a8-bdb4-12524146301e	7896569405003	Leite UHT integral	Lider	Leites	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
57d713e6-a28a-43da-adeb-352b1ee9806b	7892840812850	H2O Limonete	SevenUp	Bebidas	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
ad940f7f-aed0-4a48-bba3-70f42109a630	7790045825395	Frutigran Avena, Chía y Lino	Frutigran	Salgadinhos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
8a21a36d-2b37-4923-bf0e-077a8b4729ad	7622300988470	Wafer recheado coberto com chocolate	Lacta	Salgadinhos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
4629ea5e-f7d2-4faf-b651-2fc09295a9f6	7891095100125	Pipoca de Microondas	Yoki	Salgadinhos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
35e6388b-d361-46ae-8228-69414515e8ee	7896283000409	granola tradicional com coco e uvas-passas	jasmine	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
d6697cda-493a-4474-964b-91d7b11fe8cb	7896002306348	Plusvita Tradicional	Plusvita	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
d54c262e-6a60-42d3-937f-dc76a5090764	7896002360234	Bisnaguinha	Pullman	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
cd61292a-7113-41bf-9968-aee659e20ada	7891330016068	Amor Carioca 200g	Neugebauer	Salgadinhos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
a96fc20c-6d51-46f0-a67a-a6a097445eb3	7898206500027	Açúcar Demerara Native Orgânico (1 kg)	Native	Acucar demerara	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
8d304e9c-d077-4f78-be09-39c3242e565d	7891000072950	Iogurte Natural Integral	Nestlé	Iogurte	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
99b09f1c-9eb1-4cd5-8985-df71443e55ae	7790045824893	Frutigran Chisps de Chocolate	Frutigran	Salgadinhos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
8b6903f8-ba35-450a-bbc2-e2f732104662	7891962053202	TORRADA MULTIGRÃOS BAUDUCCO	Bauducco	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
bdbb8c6e-6d4e-4a74-9076-833176b7c5dc	7898636660018	Farinha de Tapioca Mani Premium	Mani	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
8aca8347-1962-4808-8289-b4760c247a5f	7622210661814	Mel e gotas de cacau	belVita	Salgadinhos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
deed5acc-ef92-4bbf-938c-395f6bb2b912	7896894900013	Açúcar Refinado Caravelas Pacote 1kg	CARAVELAS	Sweeteners	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
14e1becd-0c05-4017-aa92-e600f66964c9	7891079001028	Macarrão Instantâneo Lámen Tomate Suave Turma Da Mônica Nissin Miojo Pacote 85g	NISSIN	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
983dc5ab-27d2-4563-88ee-ba415f4e3ed3	7896331100327	Manteiga Aviação	Aviação	Pastas e cremes	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
b342515c-3549-4426-b278-8b33b013c7f1	7893333325109	Cream Cheese Light Philadelphia Pote 150g	PHILADELPHIA	Lanches	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
e295d3ba-08b3-4bbe-b6f9-f5bfd76cb22b	7891515901059	Margarina Claybon	Claybom	Alimentos veganos	open_food_facts	2026-06-03 13:48:53.835	2026-06-03 13:48:53.821
c67aa880-038b-4af4-b69b-130f7d406288	7892840815783	Farinha Integral De Aveia	Quaker	Alimentos veganos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
43babe37-968a-478d-b208-adb02a94f120	7897122600286	Grão de bico cozido no vapor	Vapza	Alimentos veganos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
abac7ff3-23af-43ea-8fe4-b913a0a75ee0	7898215151319	Manteiga com Sal	Piracanjuba	Pastas e cremes	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
f48a6986-d96f-42ff-92db-41dcd0391755	8000500232057	Raffaello - Wafer com recheio cremoso e amêndoa coberto com coco	Ferrero	Salgadinhos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
61161696-798d-4887-8b37-f5b75718d3c1	7891000248799	KitKat	Nestlé	Salgadinhos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
95fd378e-4aef-4473-9659-8ce5ede4406d	7790045824886	Fiesta Surtidas	Fiesta	Salgadinhos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
a99dd22e-91c4-41dd-92b7-9e8a2e9a9437	8003753158761	Café Em Cápsula Torrado E Moído Intenso Espresso Illy Caixa 57g 10 Unidades	ILLY	Bebidas	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
7bb698b2-5ac7-487e-bfcc-8e0ba4c199b2	8007270700410	L’integrale Unfiltered Extra Virgin Olive Oil	Costa d'Oro	Alimentos veganos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
a4b1bb6d-73a5-44d9-8b29-cfdef374c2ae	7898556013406	maionese	Pramesa	Condimentos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
ab6aab18-1db2-48f1-8de0-e2a06af10c75	7891000460207	Prestigio	Nestlé	Salgadinhos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
da6bc57b-dcfd-4b85-8686-5aed60700de3	7622210641144	Galletita Club Social de pizza	\N	Salgadinhos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
8509630b-aa3c-4439-9829-f3678092f1d2	7896066304595	Pão Grão Sabor 18 grãos	Wickbold	Alimentos veganos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
6ff3b2e9-7304-4bcf-8b51-ec763be59634	7898955705049	Bebida De Castanha De Caju - A Tal Da Castanha	A tal da castanha	Bebidas	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
41629849-2063-4247-93c9-d19fc8c1d002	7894900087123	Bebida à Base De Soja Uva Ades Caixa 1l	ADES	Bebidas	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
89302fbc-5fad-4af3-967c-0ba221c345ee	7898955617397	Requeijão Tradicional Poços de Caldas	Poço de Caldas	Requeijao cremoso	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
1df7000b-af63-42a3-9978-87b9218f100a	7896019607636	Recheada de Creme com Cacau	Amandita	Salgadinhos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
319fba7c-83c3-47cd-a755-fc0955db6c8a	7896006716464	Biscoito de arroz	Camil	Salgadinhos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
f3b8c45a-fca1-4307-a79c-7b61fc139951	7891008414127	Serenata de amor	Garoto	Salgadinhos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
6853641a-fd92-4b9b-9de3-5bb31c8f5100	7896423405743	M&Ms. To Share	MeMs	Geral	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
cdcb75fe-286d-4fb9-99ce-2c98fd1cc04c	7894900680508	Refrigerante Lemon Fresh Zero Açúcar Sprite Garrafa 510ml	Sprite	Bebidas	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
1d86ce8b-80de-43f4-bebd-9aa7cd32faef	7898215157427	Leite Ninho Levinho	Nestlé	Leites	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
c75281d5-cf0a-430a-8b62-19e77847163a	7896051121251	Iogurte Natural Integral	Itambé	Sobremesas lácteas	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
a34e3eca-a36d-4109-9247-bb302e47b1dd	7891025115229	amêndoa sem açúcares	Silk	Bebidas	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
a9f6dba9-9566-435a-aa34-5e6d99117208	5601216120114	Azeite Andorinha Vd. vermelho	ANDORINHA	Alimentos veganos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
4eb52834-b3f7-455d-8cbd-b9f77d4aaac8	7891000340981	Leite em Pó Ninho Integral 10% Grátis 380g	Nestlé	Geral	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
3fa77658-4a95-44f2-9d00-f0e3a455cc83	7896051111030	Leite UHT Integral Natural Milk	Itambé	Leites	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
72781aa8-d42c-4a61-ad72-d152b8be5713	7891098000156	Chá leão capim cidreira	\N	Bebidas	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
22382bc8-4f1b-4fe7-abe8-5c60c8b7a2fa	7891025111825	Formula Infantil Aptamil 800g Lt Premium 1	APTAMIL	Alimentos infantis	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
94f52d91-29f4-48a1-8e82-5db009353f89	7899970400964	TABLETE SPECIAL DARK CRANB 85G HERSHEYS	HERSHEYS	Salgadinhos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
6d76f7a6-f36a-4f8e-a8b3-e7d54c371d8b	7896002310246	Pão Forma Cranberry, Quinoa e Hibisco	Nutrella	Alimentos veganos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
11dc4379-afe8-46c2-881c-25c762147c46	7896213006235	Biscoito Cream Cracker Amanteigado Tradicional Vitarella Pacote 350g	Vitarella	Salgadinhos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
fee6771c-c00c-4b3b-8396-65c5cd761e3f	7896051111764	Leite Semidesnatado Zero Lactose Itambé	Itambé	Leites	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
cd80397b-e5c7-4f9b-a31b-e8bfd2af85fb	7896625210763	Iogurte Parcialmente Desnatado Natural Vigor Viv	Vigor	Sobremesas lácteas	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
28ad0421-5005-4e20-bfaa-ea4d42eda806	78928374	Leite Fermentado Chamyto	Nestlé	Leite fermentado	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
8c58c7eb-2ba4-474d-8ca6-b327bad67fb0	7894900701159	Refrigerante Sem Açúcar Coca Cola Lata 310ml	COCA-COLA	Bebidas	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
07cad877-825d-4e8d-b83b-4055de6c92fc	7896051111016	Leite Integral Itambé Longa Vida	Itambé	Bebidas	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
d669fcda-803c-4973-8cb1-e05cd4aca554	7896051140108	Requeijão Light Itambé Copo 200g	Itambé	Requeijao cremoso	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
fd3cd6ad-0afa-4ea3-a598-737ddb86196a	7891515537531	Margarina Cremosa Com Sal	QUALY	Alimentos veganos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
c33fd9c8-51b7-4033-92f2-e5a28dc9ab15	7622210573292	TRIDENT X SENSES SPEARMINT 54G MDLZ	Trident	Salgadinhos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
3aa935f5-9e2b-4acd-8bde-839d5a378d27	7891000251539	Preparado para caldo de galinha	Maggi	Dried products	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
c023bbd3-5699-4420-a2bb-06b972b41aa7	7891150072053	Maionese Hellmanns Pote Leve 600g Pague 500g	Hellmann's	Geral	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
5a059a2a-2969-4b59-81f8-f5c0ac2cfd33	7896002304153	Pão Para Hambúrguer Com Gergelim Pullman Grand Burger Pacote 420g Tamanho Família	Pullman	Alimentos veganos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
f7dfe368-c7a3-41b5-9df5-2d5df00e5ce9	7622300847753	Goma De Mascar Melancia Zero Açúcar Trident Caixa 25,2g 14 Unidades Leve Mais Pague Menos	Trident	Salgadinhos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
45cfe141-efff-42df-9cba-1787a26d7894	7891000258613	Cereal Matinal Duo Nescau Caixa 210g	NESCAU	Alimentos veganos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
e4e02e00-fbfc-4df6-a0b2-950d91c0a9f8	7891000329498	Biscoito de coco	Nestlé	Salgadinhos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
23995ca1-8546-48a3-a86b-be6eb7bf0d02	7891000357460	Cereal Matinal Snow Flakes Caixa 230g	SNOW FLAKES	Alimentos veganos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
e41d5642-c220-45cf-ab45-f7d22e0c15b6	7891098040893	Chá Preto Ice Tea Pêssego Leão Garrafa 450ml	LEAO FUZE	Bebidas	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
b716cfea-ea28-4f7e-94c4-1dc4c82a60ea	7891150068308	Mingau Morango Maizena Cremogema Caixa 180g	MAIZENA	Sobremesas lácteas	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
fb5f1e17-5388-4c46-b11f-88dada85ca2d	7896005804391	Achocolatado Pó 3 Corações Chocolatto Pacote 300g	3 CORACOES	Beverages and beverages preparations	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
db333d61-8441-4ec9-9a9a-11c6dc55f620	7896625211104	grego	vigor	Sobremesas lácteas	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
3928817f-af60-42e8-8ad8-79a6782a32ac	7896025803695	Mostarda Amarela Sabores Cepêra Squeeze 350g	CEPERA	Condimentos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
fb5af3db-c937-4d85-acbc-25b7dd8c3aa8	7896002366557	Bolo Cenoura Recheio Chocolate Ana Maria Qd Pacote 35g	ANA MARIA	Geral	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
55e426c7-b17f-4454-b8ad-81695b1c2951	7899970402838	Chocolate Meio Amargo 40 Cacau Hersheys Pacote 82g	Hershey's	Salgadinhos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
4486d2cf-be6f-414f-8a7a-a12259981111	7898080640239	Bebida Láctea Uht Sabor Chocolate 200ml Italac	ITALAC	Bebidas	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
453de63f-94c0-48cd-af37-ce2337c59e07	7896102501872	Molho De Tomate Tradicional	Heinz Brasil S.A	Alimentos veganos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
b6e994b3-8802-4153-b27d-b417ed4b2553	7892840800000	Refrigerante De Cola Pepsi 2l	Pepsi	Bebidas	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
5bb9c510-1920-4089-900c-9b68a7071fd2	7898341430081	Néctar Caju Del Valle Caixa 1l	DEL VALLE	Bebidas	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
7c3c5bc3-403f-426c-987c-7c1864803c79	7898994939764	Bebida à Base De Aveia Cremosa Orgânica Sem Glúten Nude. Caixa 1l	NUDE.	Bebidas	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
169a670c-e442-4478-9f25-6c0da675c14f	0070847033301	Energético Mango Loco	Monster	Energético	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
60f72019-0924-4caa-9867-ef2f73767ad9	7891097104633	Bebida Láctea Fermentada Ameixa Zero Lactose Batavo Pense Zero Frasco 170g	Batavo	Bebidas	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
bf33c9fe-34e9-4edf-8013-759d422cf84e	7891962027388	Panettone Frutas	Bauducco	Salgadinhos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
e431c8e0-98c4-4c8b-b034-fb5116158c5e	7896045101658	Gourmet Cerrado Mineiro	3 corações	Alimentos veganos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
04c49c8e-e604-4391-8439-d320c71fcc36	7892300002791	Leite de Coco	Sinhá	Plant based foods and beverages	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
edb2fcc7-09ae-428c-805b-8299029c074e	7896066301747	Do Forno, Pão Na Chapa	Wickbold	Alimentos veganos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
3754e7b5-b603-4320-a9f0-061bf2606c51	7891150027794	Mostarda Amarela Tradicional Hellmanns Squeeze 170g	Hellmann's	Condimentos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
89373b21-24f7-451d-921d-511eb22b59d9	5601855121008	Azeite de Oliva Extra Virgem	Terras de Camões	Alimentos veganos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
2852dd9e-5ee1-429c-b2e4-f1eaf631da95	7891095911448	yoki	Yoki	Alimentos veganos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
252f4472-198f-4999-bdf0-d35225e7166b	7622210575999	Bis Branco	Lacta	Salgadinhos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
b4116473-0202-40a7-9f9b-2845fcf7186a	7891095911349	Milho Para Pipoca Premium	Yoki	Salgadinhos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
cda7d813-9f17-4a8b-be78-9bdacc5852f7	7896005030356	Biscoito cream cracker	\N	Cream cracker	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
bdeabadf-69cb-4f3e-978c-ab55e41ffd50	7891000315507	Nescafé Café Soluvel Matinal	Nescafé	Alimentos veganos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
0e4b2af8-4bd2-491e-86a0-d6e448b66938	7898215157441	Leite Desnatado MOLICO	Molico	Leites	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
efa32ab1-f7c9-43af-8045-d43eb3490eb5	7896004008998	Sabor Cheddar e Bacon	Pringles	Alimentos veganos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
915f1d69-90a6-47d4-a875-c775e801c4f7	7898215151722	Leite Desnatado Caixa	PIRACANJUBA	Leites	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
8521ae5a-e3b1-4405-baef-f9ab4f382682	7896004401409	água De Coco Integral Sococo Caixa 1l	Kellogg's	Bebidas	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
8aaebf65-63ab-4f6e-8baf-488293603112	7891000368572	Chocolate Meio Amargo 40 Cacau Classic Pacote 80g	Nestlé	Salgadinhos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
6faabb53-18d4-471f-a0cc-ea1c71fecb22	7894904277964	Incrível Burger	Seara	Sandwiches	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
24d31d98-bc53-46a4-af6c-b08f3a0344ce	7891097103841	Mussarela Fatiada	Président	Queijos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
677ecfed-85d6-42d6-85bb-0633fc97160c	7898215157854	Beb Lac Piracanjuba 250ml Whey 15g Z/Lac Chocolate	Piracanjuba	Leites	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
4fb96434-908a-441f-88fb-2fabaa9fd5e8	7891000394939	CEREAL MATINAL KIT KAT NESTLE	Kit Kat	Alimentos veganos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
49d3a26c-5ece-49c5-86cf-3a46f96278d0	7891097101533	Iogurte natural integral	Batavo	Iogurte natural integral	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
bd723f14-3793-46b5-b32c-70f1eb4577a4	7898553443886	Pink Lemonade Natural One	Natural One	Geral	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
5b9124b2-705a-4688-ade7-fa84bd48f83d	7891203010100	Pão de Leite	Panco	Alimentos veganos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
d5d8da17-8010-4604-95cd-eb0e7808a649	7891095911356	Milho para pipoca	Yoki	Salgadinhos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
852b4156-bfe1-4f36-be57-59722d8d8839	7894000021249	Glucose Karo Squeeze 350g	KARO	Syrups	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
49176963-5a5e-4659-bc62-7b3522f7539a	7898923217031	Guaravita	Guaravita	Geral	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
d01a66f9-1aaf-4e70-ac77-035fb8e812a0	7622210571526	Refresco Em Pó Manga Tang Pacote 18g	TANG	Geral	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
1aef7c26-2ae2-461c-a91f-3346a27525c0	78907188	Bombom Amor Carioca	Neugebauer	Salgadinhos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
b97e0010-ace2-4f6d-a208-e7615e7058fe	7891097103643	Iogurte Desnatado com Preparo de Morango para Dietas com Restrição de Lactose	Batavo	Sobremesas lácteas	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
6c1ef96e-c5de-432e-9368-c274ba752f7a	7896058258530	Biscoito Maizena - Triunfo	\N	Salgadinhos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
31d06896-f6aa-4275-8df7-a5118a642336	7892840822552	Bacon - Torcida - Torcida	torcida	Salgadinho	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
25bc2c15-1439-4398-aa36-42ecd3ef3a3f	7891962050065	RECHEADINHO GOIABA 112G	Bauducco	Salgadinhos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
62977f4f-e9bf-46d5-b629-fa3605c7d60b	7891098001504	Chá de erva Doce	Leão	Bebidas	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
b4c9ad74-08a1-4af8-a219-392a0d862181	7891097106118	Whey Fit Sabor Cappuccino	Parmalat	Suplemento	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
ecebeb9e-aca8-4a92-966d-f7af969751c9	7892840823580	Tostitos	Pepsico	Salgadinhos	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
ed145753-73b6-40f5-8ee8-2f0b8032a4c6	7896045506873	CERVEJA HEINEKEN LAGER LATA 350ML	Heineken	Bebidas	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
e85ac7a0-166b-4c05-ad4f-beab9ac39483	7896070800014	Feijão Carioca Tipo 1 Pantera Premium Pacote 1kg	Carioca	Grãos de cereias	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
139851ad-c065-4ae4-99d9-3135856a3f2c	7896003739534	Pit stop integral	Marilan	Geral	open_food_facts	2026-06-03 13:48:58.189	2026-06-03 13:48:58.172
ffa056eb-a3b7-4978-a7d5-c203808ca049	7898258950313	BALDONI Mel Baldoni Chef	Baldoni	Natural foods	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
5c7ed55f-98e3-45a4-ac0f-28dd548e6fe5	7896181711162	Amendo Power Crunchy	DaColônia	Alimentos veganos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
c541eba4-5184-40af-b386-21f5ef6d3511	7898258950542	Mel de Flores Silvestres Baldoni Bisnaga 300g	BALDONI	Pastas e cremes	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
8afb74da-604e-4e97-a77e-1caf9a9ec870	7622300119652	fermento royal	Royal	Baking products	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
2ac0e04e-b635-4e11-8a35-5330a4f8663d	7897047000031	Moreninha De Rio	moreninha do Rio	Alimentos veganos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
ab289490-eb8a-4bd9-904f-e83e4e5be89c	7891097105579	Creme de queijo tipo quark com preparado de coco	Batavo	Queijos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
94f58371-8de2-4335-b18e-f0db4ec3481a	7891000399590	Leite em Pó Integral Ninho	Nestlé	Leites	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
c8523d4b-92ac-455e-baa8-1ddac79f304e	7896294901993	Leite sem lactose integral	Tirol	Leites	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
b6667b71-4490-4c5d-a13a-9cdbf438204b	7896283000898	Biscoito Cookie Vegano Integral Chocolate Com Gotas De Chocolate Jasmine Pacote 120g	JASMINE	Salgadinhos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
8f7b0576-bbcd-4d38-828b-694803df84a0	7896002363259	Bolo Baunilha Com Gotas De Chocolate Recheio Chocolate Ana Maria Pacote 70g	ANA MARIA	Geral	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
793d5dd8-dd12-4081-91ab-af70d1730756	7896590817035	Leite condensado	Cemil	Dairies	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
cb2e8feb-6222-425c-b4e5-55840f74a9f5	7891962031170	Bolinho Duplo Chocolate Bauducco Pacote 40g	Bauducco	Salgadinhos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
a61fcd51-eb90-4c5c-9e59-f9c4ce5e376e	7896066301488	Pão Do Forno Brioche	Wickbold	Alimentos veganos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
2b5d08d9-7adf-4fa1-8d83-9acb7801daa3	7891000379738	Achocolatado Nescau	Nestlé	Chocolate pó	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
cabe6e58-3681-4b31-bb7a-a3f6cbcd7571	7892840823467	Cheetos Onda Sabor Requeijão 105G	Cheetos	Salgadinhos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
8e9d76aa-395e-4a94-8149-f1a1380bf920	7891962075792	Waffer de pistache	\N	Salgadinhos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
6c34ccbe-43e9-468c-afe2-36ffca9d1273	7894904271726	Primor	\N	Geral	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
56d38acf-6821-457d-a5dd-e8a2751c8552	7896261403482	Barra de banana e nozes zero	\N	Dietary supplements	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
280b4a03-b4b0-4c28-977e-45edb8b2d4fd	7898599217694	Barra De Proteína Chocolate	YoPro	Geral	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
758c364a-84dc-4c6f-8e8d-192b79b7574c	00844903	Schwepps	Coca-Cola	Geral	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
635181f6-e4e5-434c-b283-16be4da3c972	7898635644446	Tempero para batata frita	Heinz	Geral	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
2eb87cd4-3916-4482-91ab-fdc00ac6e629	7891118013616	Bubble Gum Push Grape	\N	Geral	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
2f44d904-037f-4f12-92f3-7247f451138f	7898556015448	Ketchup	\N	Alimentos veganos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
452860ac-4014-4a8d-a7d6-b80999021950	7892840822040	Ruffles Original	Pepsico	Geral	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
f62c3f8d-3f62-4182-949c-d7d696158925	7896294901856	LEITE UHT PAULISTA INT.	Paulista	Leites	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
67115c3f-2ae2-433a-a1f1-8f0683376310	7896066303192	Wrap Integral	Wickbold	Alimentos veganos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
c72f8b25-b350-4def-8f36-d8e5c938fc0a	5000169622360	Golden linseed	Waitrose	Seedes	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
2de77df0-e078-4250-8999-eb1f82e40da6	7896024726742	Newafer	Piraquê	Salgadinhos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
444699e4-a752-4029-bf4e-97dcf796be75	7892840823405	Batata Frita Lay's Clássica 115g	Lay's	Salgadinhos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
001be55a-e3d3-4f7f-8c1f-fd53c98aba4e	7898403780925	Creme de Leite Leve UHT Homogeneizado	Betânia	Dairies	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
6a55d608-d27e-4f6a-b51d-119aca0ccc2d	7896283800825	Leite Jussara UHT Semidesnatado 1L	Jussara	Bebidas	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
39b2f6c9-e911-4763-8664-c1932341e2c1	7896102503661	Molho de Tomate Tradicional	Quero	Alimentos veganos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
2c3f5029-36d0-412f-8459-1fbbc48f04f4	5601002106162	Iced tea	Auchan	Geral	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
4936e0c4-256e-49f4-93a5-35a586b33161	7802410545323	Vainilla	gourmet	Alimentos veganos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
200db657-0c1a-4359-9d66-1f7686bc57d7	5601252106103	azeite galo vermelho 500ml	\N	Geral	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
230967a9-cc8c-425a-94dc-af7041a544e5	7802920006352	QUESO MANTECOSO	COLUN	Queijos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
f1b632bf-41b5-4601-bcf1-2d4defb27515	0400050248214	CAFÉ INSTANTÁNEO	SELECCIÓN	Alimentos veganos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
1e863cc9-75ad-4f8d-af9f-6e04f3673fc5	7805000324179	LA VERDADERA MAYONESA	Hellmann's	Condimentos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
37980bd5-8a1b-4e61-88d0-2ffa3c33d2d6	7898598750437	Leite UHT Integral Quatá	quatá	Leites	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
22c082d3-b42b-43bd-b7f4-6876c315d6c7	7809637201360	Pasta de Maní	Maní Mani	Dulces untables	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
f4c9e4ba-deab-4856-9745-a348a694f035	7802408000230	FRUNA 2 COLA	Fruna	Bebidas	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
6f3469a3-0885-4fc4-91ca-2672ac335570	7899916918829	Suco de Laranja	The Natural One	Suco	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
b860246e-2775-46bc-95d9-9b964973c178	7896436100666	Água mineral natural	Fruki	Bebidas	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
3b080e8b-8c4c-4df4-b881-367413cc4811	7801620009656	CITRUS	mas	Bebidas	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
d5f82f67-5afb-4cd3-affe-d56958bc5bf8	5601069102961	Cookies Special Selection	Danesita	Salgadinhos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
7c66e473-0c4a-43b5-beaa-a717c257f27f	7790407031013	Chocolate Semiamargo	Aguila	Salgadinhos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
20a5f7b5-2efc-437e-bb22-b3d11b3195a1	7891000008119	Cereal Nescau Bola	Nestlé	Alimentos veganos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
b3d765a5-e16d-4095-9165-3293085dd9d3	7891000089231	BISC RECH PRESTIGIO 140G NESTLE	Nestlé	Salgadinhos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
cdda5d04-7e27-4f11-8c0e-8e8719f7c79e	7891000092606	Bombom Chocolate Recheio Leite Maltado Lollo Pacote 28g	LOLO	Salgadinhos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
bd34fd9c-94af-4ab0-b426-0e0ef75599a4	7891000100448	Cereal	Nestlé	Alimentos veganos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
8c61137a-2979-420e-a0be-752a49affbf5	7891000101506	MolicoLEITE PÓ DESNATADO MOLICO LATA 280G	Nestlé Molico	Leites	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
ac5e5d44-9a81-4b5e-9aa8-67f3f7c6a542	7891000104101	Achocolatado Em Po Nesquik Lata 380G Morango	Nestlé	Bebidas Laticínios	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
4a523247-6742-4b89-8051-0e319b8534cb	7891000110829	Bebida Láctea Uht Com Café Chocolate Nescafé Smoovlatté Frasco 270ml	NESCAFE	Bebidas	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
688830e5-4292-4c77-b676-4d78bee27371	7891331010508	Barra de cereal sabor aveia, banana e mel	Nutry	Barra de cereal	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
38669bcf-3f04-4dc4-b6fb-13f252a82729	7891962032290	Wafer Chocolate	Bauducco	Salgadinhos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
7065e685-71be-4a4c-b9f1-f672cf49f302	7891962037028	WAFERTRIPLO CHOC 140G BAUDUCCO	Bauducco	Salgadinhos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
2a618d1d-21a0-4364-a7a2-483486bdcd3b	7891991001342	Guarana 2L	Antarctica	Bebidas	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
031bff8a-a4f5-4b02-a862-e13adf8dc5a6	7891999970107	Vigor Queijo Parmesão Ralado	Vigor	Dairies	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
4524bdbc-3d16-4e8d-a959-a7afe5d0d899	7894900011609	Refrigerante de cola 600ml	Coca Cola	Refrigerante	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
8f9feff1-e636-4fd2-8c4d-5428f872715b	7896004000534	Corn Flakes	Kellogg's	Alimentos veganos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
2f4dcbc6-6368-472b-84d4-9b0b7c488f85	7896022200206	Macarrão De Sêmola Com Ovos Parafuso Renata Pacote 500g	SELMI	Macarrão	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
aca1e03f-fc2b-41b0-99c6-f075f555814c	7896065880069	Água Mineral Natural sem gás	Minalba	Bebidas	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
33331042-3bb7-4567-8536-dbfe643b2a51	7896102502756	Quero Ketchup Tradicional	Quero	Molho de tomate	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
add12812-6e48-40c0-99c3-bd2d81840a84	7896181709244	&quot;Paçoquinha&quot; com Açúcar Mascavo	DaColônia	Paçoca rolha	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
1c4ab74d-01c8-4c2a-afb3-bcaa7954aeef	7896116900029	Feijão Kicaldo	Kicaldo	Alimentos veganos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
bab6e6cb-6b0e-42a2-b5fd-566e55b3d9a4	7896293806206	mupy	\N	Geral	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
a8b250da-d969-4d76-b73a-37ef391d2ff2	7896336001971	Doce de amendoim	Paçoquita	Peanut brittle	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
83949eb4-f521-4600-a75f-af3c7471508e	7896336006631	Paçoquita 3,84 GR.	Santa Helena	Salgadinhos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
7c4c699e-e646-4c33-8c94-f1da51a81ea0	7897900310604	Trio Light Banana com Aveia e Mel	Trio	Barra de Cereais	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
d0090f0c-2c7a-4b44-8249-4be16e00ecd3	8011780000922	Nudeln Spaghetti	Riscossa	Meals	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
a2b5bd7b-98bc-42b2-9438-eb800ffc3f15	7896051135425	Manteiga Itambé 500g	Itambé	Pastas e cremes	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
a430e6fa-ccc4-4f6d-980f-2e257df7b577	7896283001093	Granola Integral Cereais Maltados	Jasmine	Cereais	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
dcf39177-0b49-4a0f-944f-29ecb7ef1015	7896181710202	Pasta de Amendoim Dacolônia Amendo Power Zero Açúcar	DaColônia	Pastas de Amendoim	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
75c23729-b30d-448f-96a3-b39f8e9d3808	7897594100086	Bananinha Sem Adição De Açúcares	Tachao de ubatuba	Geral	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
44fba1d3-f3a2-4b66-8d02-c1a7b584422b	7891193010180	Benefice 7 grãos pão com 7 grãos	seven boys	Geral	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
35a28f93-d9cd-41d1-8314-490673dc544a	7896490288812	amido de milho	\N	Alimentos veganos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
1cb94270-ca9e-438a-8276-c0e50d64838c	7896079500168	Leite Semi Desnatado	Elegê	Geral	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
ad936dff-5bae-46ca-b29c-a6ec9176aaf3	7898932426042	Marata flocao	Maratá	Comida	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
6f440a6b-43b7-4d31-875b-9d56032ec955	7896256601275	Manteiga com sal	Tirol	Pastas e cremes	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
10924078-fff1-4795-8233-68a3d978c929	7896256603446	Leite UHT Semidesnatado	TIROL	Leite liquido	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
64a5f146-7e5d-4e6a-9f30-a6ae746b6ce2	7622300988517	Wafer Oreo Cobertura Chocolate Branco E Biscoito Lacta Bis Xtra	BIS	Salgadinhos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
18c2d383-c797-43f3-9add-26dcdd794480	7891031409091	Hemmer ketchup tradicional	Heinz	Alimentos veganos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
46d66168-dcf6-4282-92ed-d1189737e079	7891000107836	Chocolate Ao Leite Aerado Suflair Pacote 50g	Nestlé	Salgadinhos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
574e88c9-4d0f-4b6b-afeb-92b4d636c20b	7896583400060	mantega de primeira qualidade	Paracatu	Geral	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
004f50be-fc57-46d9-a091-d4524c433f98	7896706900422	Doce De Leite Em Pasta 400g - Viçosa	Viçosa	Pastas e cremes	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
4f0f2b0e-1ef4-4d2c-b678-affd55f73651	7791875000471	Havannets Chocolate	Havanna	Salgadinhos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
09336a21-9c85-4188-9681-c45751206011	7790072001014	Sal fina	Celusal	Condimentos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
a501491d-dd56-41ae-9a6d-dfb846a19208	7896066301297	Grão Sabor Castanha-do-Pará & Quinoa Wickbold	Wickbold	Alimentos processados	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
f14a3e1e-9557-4239-8811-358b88c01d4e	7891203020260	Pão de Mel	Panco	Alimentos veganos	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
18b16850-6b16-443d-a9a1-4099b2758f8d	7896004400358	água De Coco Integral Sococo Caixa 200ml	Sococo	Bebidas	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
1bdc3b55-4c23-4d58-a638-b50c92e263ae	7896331100051	Manteiga com Sal	Aviação	Pastas e cremes	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
f87970cb-1dff-4862-b8fa-ee4350fd482a	7891098040688	Chá Mate Original Matte Leão Garrafa 450ml	MATTE LEAO	Bebidas	open_food_facts	2026-06-03 13:49:02.932	2026-06-03 13:49:02.914
fda704b5-a760-4128-b826-86fe9d77cf10	7891079000212	Macarrão Instantâneo Lámen Galinha Nissin Miojo Pacote 85g	AJINOMOTO	Alimentos veganos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
726f95bf-481c-493d-a035-d91877f3fe52	7891048050682	Gelatina Uva	Dr. Oetker	Cooking helpers	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
45dc6d4c-806f-4e26-bc15-d7ad27716d43	7891000247648	Classic cookie	Nestlé	Salgadinhos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
c73f1dbf-fa27-4d34-b358-f6489d6ce336	7898080640963	Pó para preparo de bebidas sabor morango	Italac	Geral	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
0620af1b-1b5d-4392-aea5-4234e446bbb9	7891991002646	Guaraná Antarctica 600ml	Antarctica	Bebidas	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
b00b9f9a-5117-4489-a47a-a3e93ac8a300	7896999099087	Pão 50% Integral	Thabrulai	Alimentos veganos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
33a31b00-f12f-41c9-b297-d5a9a12be557	77940148	Turrón y Maní	Misky	Salgadinhos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
d11b7398-fe10-43ef-8be8-a0e8133e8b8f	7891025699880	Requeijão Cremoso Danone	Danone	Produtos lácteos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
0c048dfe-477d-4804-b3ec-ee951ca2c347	7891962054100	Biscoito Cookie Tradicional Bauducco Pacote 100g	Bauducco	Salgadinhos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
d280f9ca-4f79-48ae-bd4d-aacf27844a7b	7891000084649	requeijão Nestlé trad	Nestlé	Alimentos para café da manhã	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
dad0d402-e8c7-4360-a765-84fc815587f7	7896423420180	Snickers	Snickers	Salgadinhos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
5bbb4dd4-930b-4046-a119-fea43d7f26c2	7622210833389	Bis Black	Lacta	Salgadinhos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
c8b93919-f0ad-4da4-abd4-cc6ec8f5812d	18960457	Cerveja Pilsen	Kaiser	Bebidas	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
bdeac7ad-c31c-453f-a99c-2ccd719547f7	7898939072600	Pasta de amendoim integral	POWER1ONE	Alimentos veganos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
1fcb48ae-76e9-4e74-8bea-3b14784b5c44	7896061300677	Biscoito Din Crackers Original Tucs Pacote 100g	tuc's	Salgadinhos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
cb84e8ef-b4c6-4722-a5d3-d0462d82276b	7896007811403	Molho Inglês	Kenko	Condimentos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
073a34d4-318b-4a54-8348-7a728d2537c2	75027971	bon o bon	Arcor	Salgadinhos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
5cd75790-3c85-4ebe-aa59-892dbeac701d	7898416780035	Salgado	Cassini	Salgadinhos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
0f413567-b672-44c4-8807-04d368f0f348	7896036036051	Molho De Tomate Caseiro Pomarola Sachê 300g	POMAROLA	Alimentos veganos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
c8a1bde2-3c64-499a-b16c-40b80b405f64	7896030518027	Requeijão Cremoso	Tirolez	Requeijao cremoso	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
e62c359a-06eb-41bc-b48d-5406a25866b8	7896016608766	água De Coco Esterilizada Ducoco Caixa 1l	VIZIR	Bebidas	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
a96ab1f6-c0c8-4539-8836-0f4a5580c8bc	7896102583182	Maionese Heinz Squeeze 390g	Heinz	Condimentos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
79a10df6-e712-4da2-959e-f9e8b7504cfa	7896775101881	Pasta de amendoim integral com cacau	Guimarães	Pasta de Amendoim	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
417162aa-b095-4884-81b7-34f6c22a26e4	7891193010012	Bisnaguinhas Seven Boys	Seven Boys	Bisnaguinhas	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
51d5eb94-adff-4007-8bfc-3949f22066eb	7898215157434	Leite Zero lactose Ninho Semidesnatado	Nestlé	Leites	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
75af7eed-b2b8-4af5-945c-63facf4c34b7	7896102584189	Maionese Heinz Squeeze 215g	Heinz	Condimentos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
efee0dc6-9bfe-4b65-9005-ebe124de16f4	7896005279489	Fermento em pó	Dona Benta	Geral	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
4554f9f7-fbf7-46f0-bf11-32ef80b8332e	7896496917846	Biscoito Com Mix De Grãos Vegano Integral Orgânico Cacau Mãe Terra Zooreta Pacote 110g	mãe terra	Salgadinhos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
9b086c7b-6e47-4164-b008-f54b6396d1d4	7896024760357	Biscoito Recheio Chocolate Piraquê Pacote 160g	PIRAQUE	Geral	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
1e9de5bd-4a40-4518-8edc-6e7f3938b52c	7896007800001	Shoyu Tradicional	Sakura	Condimentos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
d5384789-32ef-4716-98f4-5fcaac735072	7891515555252	Margarina Sem Sal	BECEL	Alimentos veganos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
304bb1df-4144-4302-b59f-a8c701127feb	7896256066005	vinagre de Mac�	\N	Geral	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
932b24f1-bb08-460c-bf45-ba87bfcb31f9	7894904247042	Isca de peixe	Incrível	Alimentos veganos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
e84ef9f1-6fc8-43d5-9e31-27cae9eea1a7	7898403782387	Leite Betânea integral	Betânia	Leites	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
d9fbbee6-4192-4e0c-8f08-0056476f1e45	7896224836098	alimento achocolatado em pó instantâneo chocolatto	3 corações	Produtos de chocolate	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
43f9a7c2-fd9f-4f24-924b-21ff63d1e377	7898403781298	Leite Condensado Semidesnatado	Betânia	Leites	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
b7221670-3d44-4da9-ae93-fe9a9817d5ec	7891030300207	Mistura Láctea Condensada	Mococa	Dairies	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
23069286-2b02-4926-8c45-f0b82e23da92	7891000073537	Nesquik Chocolate	Nestlé	Bebidas	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
2ff856f3-54c4-41a3-ade0-58abb78e6c79	7896079431158	Arroz Namorando	Camil	Alimentos veganos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
393d28b0-4800-4c08-92cc-bbe5a4b68428	7891000291900	Capuchino	Dolce gusto	Geral	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
0932d670-aa2c-4286-8e12-c1739cf4b110	7802900228170	Soprole 1+1 Mini Cookies Yoghurt batido con mini galletas	Soprole	Lácteos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
99a1e905-909e-4cfa-93a8-6ba0339e2394	7894900660333	Nectar misto de uva e maçã	Del Valle	Bebidas	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
fc281297-cafe-4c2a-8fb6-c4176380b408	7896000554369	Suco Concentrado Caju Maguary Garrafa 500ml	Maguary	Bebidas	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
3ffc3169-3850-4394-a17e-d5287ece2602	7896066303185	wickbold original rap 10	wickbold	Tortilhas	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
897cb52f-4a46-4a47-881f-45ecc4eacb75	7898955705162	Caju +Pará	a tal da castanha	Bebidas	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
453acdc6-a106-4701-a178-30067f393fa6	7891962037004	WAFER MORANGO 140G BAUDUCCO	Bauducco	Salgadinhos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
5b225abd-59b5-4b04-8755-f0c8279125b6	7891000304556	Nesfit cacao & cereais	Nestlé	Alimentos veganos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
73138206-811a-4d46-948f-001fb545d736	78905498	Heineken Original 600ml	Heineken	Bebidas	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
2005870b-f722-422e-b837-4406430b9111	7891991001373	Refrigerante de Guaraná de Baixa Caloria	Ambev	Refrigerante	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
c72224b4-866d-4a3d-8412-21424f5e0b8e	7622210933454	Mini Oreo	Oreo	Salgadinhos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
f4fa4476-7ea3-48e9-8462-65eefefe4296	7891098040589	Matte leão limão	\N	Bebidas	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
51366917-8876-4274-8c5c-7fe3c0fe02c4	7891042000201	Lipton Ice Tea 1,5l Limao	Lipton	Bebidas	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
9640ed5f-eca7-4a61-a03d-8765aee87846	7896003738629	Crema cracker especial	Marilan	Salgadinhos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
acfb4e11-4b9b-4427-9113-0c7e3bfd753e	7891000111161	NESCAU MATINAL CEREAL CXA	Nestlé	Alimentos veganos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
856d0e47-e4a2-4cee-9cfe-f113d9a1449f	7891203021106	Rosquinha Coco Panco R	PANCO	Geral	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
9ac1f16a-92bf-4091-a6ea-6e9abb963760	7892840817916	doritos original 210 gramas	Doritos	Ultra processados	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
44774c66-5398-4605-83fe-8e3aeb646010	7892840808174	Isotônico Sabor Morango E Maracujá Gatorade 500ml	GATORADE	Bebidas	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
67796c98-85b0-4439-8a63-777708a6de3c	7898215153207	Bebida Whey Frutas Vermelhas Zero Lactose	PIRACANJUBA	Bebidas Lácteas Sem Lactose	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
3364cc5c-c0e4-4fa5-9ddc-55aae261517e	7899659900471	Ketchup Zero	Bonare	Alimentos veganos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
35968152-cb39-44dc-83f3-1616981dc99f	7896045102440	Café 3 Corações Tradicional	3 Corações	Cafe	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
6df1c56c-9229-41bf-8430-1bd4762bab31	7891021006934	Café Torrado E Moído Extraforte Melitta Caixa 500g	MELITTA	Alimentos veganos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
04695078-5827-47be-8889-384395df5fbe	7896089010916	Café Torrado e Moído a Vácuo Extraforte Caboclo Pacote 500g	Caboclo	Bebidas e Preparações para Bebidas.	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
4efa7e70-ecc6-4d02-a2e4-74135a6b5ef6	7891999144461	Requeijão Light	Vigor	Requeijao cremoso	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
21e18021-08ed-4097-89f4-3f86e06494ff	7891098040602	Chá Mate Pêssego Matte Leão Garrafa 1,5l	MATTE LEAO	Bebidas	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
fda76af0-4cb9-4812-a06f-b9a1ae894154	7898194160777	Queijo Tipo Quark Light	Lac Lelo	Geral	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
d26598e4-7b1d-4af9-b74b-0b4ce27e76b0	7896051140016	Requeijão Cremoso Com Queijo Tradicional Itambé Copo 200g	Itambé	Requeijao cremoso	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
c2bf4605-6e6b-425e-9d61-cb3c3b6acb1d	7896839122043	Granola	Da Magrinha	Café da manhã	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
6df20c30-423b-4d25-b19b-60381b554de8	7892840815271	Aveia integral em flocos	Quaker	Alimentos veganos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
10c7ded4-fb1e-466d-9666-51de093fa11e	7891098041081	Chá Preto Ice Tea Limão Leão Zero Garrafa 1,5l	MATTE LEAO	Bebidas	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
e623d6bf-3901-4335-8b1c-09101d458964	7896002301077	Bisnaguinha Nutrellinhas	Nutella	Geral	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
aca79682-7e0c-426a-8666-a0a25629ae32	7891330012244	TABLETE 1891 INTENSE 90G NEUGEBAUER	1871 Neugebauer	Salgadinhos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
61664aa9-3b47-41d6-a282-2c3e2f23f3f2	7891000084663	requeijão light	Nestlé	Geral	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
f4fdffd4-29f4-4faf-a7ba-eb448cffb948	7891962051079	BISC CEREALE MACA/UVA 141G BAUDUCCO	Bauducco	Salgadinhos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
544dabcb-b56e-4308-b2c3-76976e7df8c9	7896283000058	Aveia em flocos finos	Jasmine	Café da manhã	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
5a289a5d-4add-49c8-b845-bda9e461740b	7893000502888	Light 0% Lactose	Brf	Alimentos veganos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
cd7feb1d-3f53-40bf-91ca-13a589382b29	7896005800140	Cappuccino	3 corações	Alimentos veganos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
f809c621-f0a2-4b2c-9758-df6766bace8a	7891000329856	Chocolate Ao Leite Aerado Suflair Pacote 80g	SUFLAIR	Salgadinhos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
3934dc29-ecdd-4a86-a554-93e6e54ad0f5	7622210592668	Biscoito Recheio Chocolate Branco E Preto Trakinas Meio A Meio Pacote 126g	TRAKINAS	Geral	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
443da10c-0826-4454-9743-e4eaf5bc763f	7891008121728	Talento Avelãs	Garoto	Salgadinhos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
2e44e39e-0864-45b1-8041-7ffc7d936801	7891962036991	WAFER CHOC C/AVELA	Bauducco	Geral	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
277d1a76-b7eb-4992-9e37-9fa476811061	7891000050880	Cereal Matinal Snow Flakes Sachê 120g	Nestlé	Geral	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
3e6d6763-276e-47d6-bb07-93e6215faaba	7896275960896	Leite condensado	Frimesa	Dairies	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
ecc0e7a2-3a60-4d4e-b252-3e7af6aacdb3	7891079000243	Miojo sabor Legumes	Nissin Lámen	Geral	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
da9084fa-6d93-41ab-9cc6-da5e872d1985	7898215157410	Leite Nestlé Ninho Zero Lactose	NESTLÉ NINHO	Geral	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
2defbd81-0b30-4b30-acff-8f552ff3de6b	7891000357897	Corn Flakes	Nestlé	Alimentos veganos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
9488b8a4-f1b6-4089-a4c4-f263d956c363	7894900010398	Coca-Cola Refrigerante 220 ml	Coca-Cola	Bebidas	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
cd3ca80d-5d01-466a-aef5-167e8093613e	7893753603023	Mel orgânico	Korin	Pastas e cremes	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
86b22b45-8222-492e-b1af-5e1ed2589126	7891000350157	Nescafé Tradición	Nestlé	Bebidas	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
692defe9-6c4d-4f2b-8d9e-35d7c8a05c10	7896625211159	Grego Zero	Vigor	Sobremesas lácteas	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
8674ea06-5318-4c35-8e04-29c1b5f3b867	7896034610031	Leite desnatado	parmalat	Bebidas	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
230348ca-9144-4c4f-b8d0-74942d03d6f0	7896045506590	Heineken original	Heineken	Bebidas	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
22fc4dd9-968e-4e4d-acf5-820085aa84c6	5901588018867	Dark Mild 50%	E.Wedel	Salgadinhos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
c6fa37ca-333b-47d8-ba25-0bfcf9ddaaa4	7896102502008	Extrato	Quero	Alimentos veganos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
ccd86972-630b-4d66-b660-963cc4dfc3d6	7896002310239	Pão Forma Semente Abóbora Linhaça	nutrella	Alimentos veganos	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
ab259035-f7a7-4343-a84e-a91c2d847d75	7896005286593	Macarrao parafuso	Dona benta	Geral	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
baf77ddc-1a39-485a-a396-b37f3f4bf913	7891234000187	Molho De Pimenta Knorr Vidro 150ml	Knorr	Geral	open_food_facts	2026-06-03 13:49:07.542	2026-06-03 13:49:07.528
37b34407-b91e-49a4-a26d-342e424daff3	7898953148701	Suco de laranja integral	Prats	Bebidas	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
020185eb-6636-4906-8fd3-e0af69b13a8c	7896213005771	Biscoito Cristal Vitarella Delicitá Pacote 414g	VITARELLA	Salgadinhos	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
405d3b60-f5e1-421b-8f32-ad993a6d02ed	7896058258844	Biscoito cream cracker	Triunfo	Salgadinhos	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
cf6ad6de-2961-4029-b60d-f7edd9e3a3f7	0070847033929	Energético Monster Ultra Lata 473ml	Monster	Bebidas	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
8e0dc564-eb31-46b9-b3ee-c3290f439200	7896036000717	Extrato De Tomate	ELEFANTE	Alimentos veganos	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
f7bda01a-7ab6-4735-9727-349ef8d419c3	78912939	coca-cola	Coca-Cola	Bebidas	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
42429123-1b12-48f9-b4e3-3e15bf4a1f94	7896005800010	Café Torrado E Moído Tradicional 3 Corações Pacote 500g	3 CORACOES	Bebidas e preparações para bebidas	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
a0731394-7687-4b3c-8ccc-ac400588d06b	7898951850118	Macarrão Parafuso com Ovos	Barilla	Macarrão	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
e5e41b0b-0885-4203-aa57-31476284f434	7896094906020	Adocyl com stevia	Cosmed	Adoçante	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
efb7e397-ffcf-49c0-93c5-58a4802e2a6e	7896283007262	Granola Castanha De Caju Jasmine Pouch 250g	JASMINE	Alimentos veganos	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
ea2e2f32-d5f2-4600-a7c1-e68e2a935cef	7896002310345	Artesano Pão na Chapa	Artesano	Alimentos veganos	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
0b92de12-e634-42d6-b00e-99d134b5f9d7	7896002303477	Pão De Forma Artesano Integral	Plusvita	Alimentos veganos	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
a883e6c1-0004-4f4e-bd9f-c2480ef657ec	7894904271511	Margarina Com Sal E Creme De Leite Delícia Pote 1kg Embalagem Econômica	Delicia	Alimentos veganos	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
a2ad36b1-6315-43b8-9f7d-5ee5b1322394	7891515901066	Margarina Cremosa Com Sal Claybom Pote 250g	CLAYBOM	Alimentos veganos	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
bde4268f-df65-4711-989a-1bad6e39edad	7896259410164	Manteiga Camponesa c/sal	\N	Pastas e cremes	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
bbd6e6d9-a802-477e-833d-d92488a6d04f	7891097000997	Creme De Queijo Ricota Light Président Pote 200g	PRÉSIDENT	Laticínio	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
1d9ed74a-d1a4-4443-9991-b34b7b4b11ee	7891000340004	Iogurte Parcialmente Desnatado Morango Calda Morango Nestlé Copo 150g	Nestlé	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
27ebd29e-13d0-4f7f-ac1a-888bca6d6240	7891000360620	Iogurte Grego Frutas Vermelhas Nestlé Bandeja 360g 4 Unidades	NESTL	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
d7d066b6-490a-4fc9-a39c-abd87ea6efb0	7891025123064	Iogurte Grego Tradicional Danone Pote 90g	Danone	Iogurte	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
cead3773-c8fb-4ad5-aa50-5b4ac6d40ea3	7894904271498	Margarina Com Sal Cremosy	Seara	Alimentos veganos	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
e8c9aed7-a092-4824-b55f-e077cc6113e7	7896283007460	Biscoito de Arroz	Jasmine	Salgadinhos	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
34d6b474-3376-49f4-b33f-60a3f6f47e24	7898931632840	TOFU SAMURAI DEFUMADO 100G	Samurai	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
bd5d1642-f4c2-4edb-b745-05920d0acdb9	7891097001338	Manteiga Extra Com Sal Président Gastronomique Pote 200g	PRESIDENT	Pastas e cremes	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
9bef9722-d1f0-4922-8dd5-33e605f8d267	7896496995226	Granola Cacau Mãe Terra Pacote 250g	mãe terra	Alimentos veganos	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
a85c5ad4-9f53-4391-9c8b-438498cbe217	7898596080574	Óleo de Coco Sem Cheiro/Sabor - Copra - 200ml	Copra	Alimentos veganos	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
85a1efa6-040a-4a63-849a-62e750a0e5e1	0070847034803	Dragon Ice Tea	Monster Energy	Bebidas	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
27cf4c24-2dbd-496d-a7ae-00b5f14dfa0a	7622210571724	Refresco Em Pó Morango Tang Pacote 18g	MONDELEZ	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
1cf8f49f-5c37-4a66-92ab-894a1d6cf411	7891095031696	Batata Palha Tradicional Yoki Sachê Leve 105g Pague 90g Edição Especial Yoker Messe	Yoki	Batata palha	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
31702ea6-bd96-4852-b49a-768c246e700c	7891098010476	Chá Erva Doce Chá Leão Caixa 24g 15 Unidades	LEAO	Bebidas	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
50bb717c-2c2c-408b-b9d6-da57305b4bfb	7894000000350	Preparado para caldo sabor carne de galinha	Knorr	Dried products	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
2371b8f7-1bfd-4f4e-8320-5979f23d8048	7896005805121	Café Com Leite Em Cápsula Tres Caixa 90g 10 Unidades	3 CORACOES	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
b446e847-2f00-47c7-9bf7-e3ca16e79651	3083681095258	Palmito Pupunha Em Conserva Espaguete Bonduelle Vidro 270g	BONDUELLE	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
87074db8-a519-4609-b282-59a5ff471895	7622210568601	Bombom Wafer Sonho De Valsa Ouro Branco Lacta Caixa 220g 11 Unidades	SONHO DE VALSA	Salgadinhos	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
11c4386d-b7e0-400f-b43b-d9618866366b	7622210571663	Refresco Em Pó Uva Intensa Tang Pacote 18g	TANG	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
433a2ed7-bede-40c6-8972-cb7b93351b54	7622210674432	Chocolate Meio Amargo 40 Cacau Lacta Amaro Pacote 80g	AMARGO	Salgadinhos	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
92c41a81-48a3-4f99-9222-a86e198405a2	7622300873554	Biscoito Chocolate Recheio Chocolate Oreo Pacote 90g	OREO	Salgadinhos	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
87b9c0c9-997f-4910-9285-9c81fc40eab7	7891000285015	Composto Lácteo Fibras Molico Lata 260g	Nestlé	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
66ca3c05-56db-416e-9531-9b9889281fe5	7891000319543	Cereal Infantil Integral Arroz Aveia Mucilon Pacote 180g	INTEGRAL	Cereal infantil	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
7213794c-8a89-44ee-bcfa-6219b6e6babd	7891008124170	Chocolate Ao Leite Com Castanha De Caju Garoto Pacote 80g	GAROTO	Salgadinhos	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
03511e8a-3c16-4db6-8f4b-9bae9b8a9a8c	7891025107897	Leite Em Po Aptamil 800g 2 Danone	Danone	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
9cbc1d9a-0aba-4bc2-9fd2-385f1b502dd5	7891048046654	Gelatina Diet Morango Dr.oetke	Dr. Oetker	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
0dff7b76-f8fd-4674-8b28-e5cd11cb432b	7891097001253	Iogurte Parcialmente Desnatado Grego Morango Zero Lactose Batavo Pense Zero Pote 500g	Batavo	Iogurte	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
f6c914cb-1ca8-4515-99be-be69c51153a9	7891097012686	Manteiga extra com sal	Batavo	Pastas e cremes	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
3ee9bff3-979b-44b4-83b7-73e9e5a88332	7891132082223	Refresco Em Pó Limão Mid Pacote 20g	MID	Bebidas	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
a5759e4a-f23a-41fe-bbe6-ba14180880ae	7891132082469	Refresco Em Pó Caju Mid Pacote 20g	MID	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
56abef92-b48e-4a7f-8f4d-8ee6d9187440	7891132082483	Refresco Em Pó Manga Mid Pacote 20g	MID	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
be6901e2-5d6f-4e9c-aa31-4b83d96aacd3	7891149440801	Refrigerante Sukita 2lt	SUKITA LARANJA	Bebidas	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
393cfb2c-fa6d-4978-8ac3-5ac2990e85d8	7891150061040	Sorvete Ovomaltine Kibon Pote 800ml	KIBON	Congelados	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
41a4d6be-6957-4018-be53-f509571fcb2d	7891167022027	Filé De Sardinha Com óleo Com Pimenta Gomes Da Costa Caixa 85g	GOMES DA COSTA	Peixes enlatados	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
18a0fc3e-d10d-424a-b4db-feef76f22edc	7894904271566	Margarina Sem Sal Com Creme De Leite Delícia Pote 500g	Delicia	Alimentos veganos	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
d8de70ca-4a3a-4f7c-8bf3-83921beb7812	7896062699961	Arroz Polido Tipo 1 Solito Pacote 5kg	Solito	Alimentos veganos	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
4655d7e2-f540-4066-b47c-d4b64ea0f261	7899970400674	hersheys ao leite	HERSHEYS	Salgadinhos	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
7c8665f9-0970-4f4f-a2c6-62a09aa8f463	7896625211142	Iogurte Grego Tradicional Vigor Pote 90g	VIGOR	Iogurte	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
dca8363d-094c-40b9-bf8b-00bcca738b9e	7898192033325	Chá Branco Lichia Feel Good Caixa 1l	SUFRESH	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
8db45da7-62f9-4e74-bf6e-aa18378eb90a	7892840818357	Salgadinho De Milho Queijo Nacho	Doritos	Salgadinhos	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
7d6f7a3b-47b5-4bc0-a8b7-67bf037a4979	7891999862501	Manteiga E Margarina Com Sal	VIGOR	Gordura vegetal	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
99c609d2-8380-4256-b6eb-4dacf4cad653	7896214532702	Geléia Frutas Vermelhas	QUEENSBERRY	Alimentos veganos	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
4098f3f3-ac70-42d7-ac9c-18f54c72de97	7898341430111	Néctar Laranja Del Valle Caixa 1l	DEL VALLE	Bebidas	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
071a88d5-6f5e-47bd-ad06-42f90bcc1f40	7896213006242	Biscoito água E Sal Tradicional Vitarella Pacote 350g	VITARELLA	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
b044008b-abfa-4348-a4e8-df1203ca0418	7894904574780	Doriana Extra Cremosa Com Sal	DORIANA	Alimentos veganos	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
9ed53b59-2b63-4728-8a59-cb7b414fcc78	7896058599473	Confeito Granulado Chocolate Dori Pacote 120g	DORI	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
5153ac35-883a-410a-b129-06eccd332868	7894900011753	Refrigerante Coca Cola Original Garrafa 1,5l	COCA-COLA	Bebidas	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
0d9d0649-a462-4892-8538-67534c3ec352	7896024760364	Biscoito Recheio Morango Piraquê Pacote 160g	PIRAQUE	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
b7c7a386-0482-45a1-a25f-6bd15602364d	7896036099520	Molho De Tomate Bolonhesa Tarantella Sachê 300g	TARANTELLA	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
aa119ba2-7b67-4b4e-bfa3-f3fd85f5fa2f	7896028700090	Pasta Gergelim Tahine Istambul 500grs	ISTAMBUL	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
3d55c294-8d29-44ba-811f-dfe6bdbd2cc3	7896214532924	GELEIA PIMENTA VERMELHA 320G	QUEENSBERRY	Alimentos veganos	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
884563c6-081d-4225-88a3-575d76f96935	7896036090619	óleo De Milho Tipo 1 Liza Especiais Garrafa 900ml	CARGILL BRASIL	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
0b5e3f01-e705-4ac9-a22e-bf2a6bfbf208	7896102502534	Extrato De Tomate Quero Caixa 320g	QUERO	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
b3a33902-023c-44a8-9362-0af7bcc8d139	7896025803688	Ketchup Original Sabores Cepêra Squeeze 400g	CEPERA	Alimentos veganos	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
9e6207a9-41f4-438d-bbd1-c2ac956d339a	7896292300477	Mostarda Amarela Predilecta Squeeze 180g	Predilecta	Condimentos	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
8760d3ff-8094-41bc-b5e2-6906006a3eb1	7896006755517	Arroz Integral	Camil	Arrozes Parbolizados	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
76a3d918-b4c0-41c9-be41-ab9756ed1803	7891991016124	Refrigerante Guaraná Zero Açúcar Antarctica Garrafa 200ml	Guaraná Antarctica	Bebidas	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
5a1d726e-a978-4172-ba3e-5778f0c03b00	7896066305615	Pão De Forma Sem Casca Tradicional Wickbold Pacote 450g	WICKBOLD	Alimentos veganos	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
3c8326fd-f100-4506-9587-51b151d99022	7896931614910	água De Coco Integral Campo Largo Garrafa 900ml	CAMPO LARGO	Bebidas	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
e021d218-b048-4cc4-b596-dbcfd8974cbf	7896009301162	Patê Atum Com Azeitonas Verdes Coqueiro Sachê 170g	COQUEIRO	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
3ac67914-c9be-4062-ad05-a5bfb0319401	7896022200879	Macarrão Semolado Espaguete 8 Galo Pacote 500g	SELMI	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
8ea05275-5cf6-4362-a639-aa1c5c73f2d5	7894900701609	Refrigerante Sem Açúcar Coca Cola Garrafa 600ml	COCA-COLA	Bebidas	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
ae7ecf7f-35ec-452e-a212-9711bb8de4eb	7896022203634	Macarrão De Sêmola De Trigo Grano Duro Integral Penne Superiore	RENATA	Alimentos veganos	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
18fd68de-4d70-4749-9b91-772dc74e2196	7898557010077	Chips Mandioca E Batata Doce Original Roots To Go Pacote 45g	ROOTS TO GO	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
b94634bf-50fc-4b07-b588-c9de50d97aa7	7893000025653	Patê De Peito De Peru Defumado Sadia 100g	SADIA INTERNATIONAL	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
c1384a24-ef20-4e3f-89bc-e062c243f534	7896036000793	Extrato De Tomate	ELEFANTE	Alimentos veganos	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
4dd9d498-54e8-44d1-b83c-e67e223200b0	7891098000057	Chá Mate Limão Matte Leão Caixa 30g 25 Unidades	MATTE LEAO	Bebidas	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
bfdc0676-7693-4b87-bb70-1ca93cb10a3e	5010477352873	Granola Nuts Jordans Pouch 400g	JORDANS	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
96da4c6a-5ca0-4b9e-9d14-a1a61a4f8324	7891962065885	Biscoito Recheado sabor Morango	Bauducco	Salgadinhos	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
c782877d-5e43-4154-abc2-e27dce9adf8a	7898215157786	Leite Uht Tipo A2a2 Semidesnatado Piracanjuba Caixa Com Tampa 1l	PIRACANJUBA	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
0a67dc3a-e86f-4167-ae92-9ef6df79946f	7896639800318	Canjica De Milho Doce Okoshi Pacote 50g	OKOSHI	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
35fc78c1-065c-4e43-8b44-cdf718c83baa	7898552950545	Pasta de amendoim integral	Da Nona	Pastas de Amendoim	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
127bcf51-77f4-4170-a5ed-0026d088d9e3	7891000307083	Nescafe Forte	Nescafe	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
0448edaf-edd5-4e37-8d08-0e3b6ec988cf	7896051166870	Itambé zero batido	Itambé	Sobremesas lácteas	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
cac67a25-20fb-4d84-a8b4-95518c9c1f42	7892840821746	Kettle Corn	Pop Corners	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
261ca54e-fefd-4d45-b1bf-95397470c5ab	7898665434192	Whey Fort 3W (Whey Protein Isolado, Concentrado e Hidrolisado)	Vitafor	Dairies	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
76a91c53-209a-42d5-a77b-212f1502fd79	7891030003016	Mocoquinho sabor chocolate	Moccona	1zyyhx	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
e78d65eb-29ff-4ce3-b045-9a4d6a027252	7891000390030	Achocolatado em pó Nescau	Nestlé	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
47a96434-c2c0-465a-ad4d-af87e388a3b9	7896045103003	3 corações café tradicional	\N	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
7d9eb152-0b00-43f1-950c-3224c12940dd	7891132000029	Sabor ami	Ajinomoto	Condimentos	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
b55ec128-b4f9-42fa-98e7-a5f8524ac7b1	7891025115311	YoPro Morango	YoPRO	Sobremesas lácteas	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
a25737e9-db8b-40de-9cd7-564fcefd6832	7891132019021	Sabor a mil	Ajinomoto	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
a402eb7c-d3aa-491b-8990-b6adb2a4a30d	7891008121827	TABLETE TALENTO AMEND PASSAS 85G GAROTO	TALENTO	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
4601108d-8c6f-4205-8288-8234f2d7f071	7899970401657	TABLETE SPECIAL DARK 73 85G HERSHEY	Hershey’s	Salgadinhos	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
256475de-5721-4bb8-87d9-4860f4220a5c	7899970400902	TABLETE SPECIAL DARK TRAD 85G HERSHEYS	HERSHEY'S	Salgadinhos	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
79bed9df-5b33-476d-8eb2-f318cf5336dc	7896256600278	Doce de leite Tirol	TIROL	Pastas e cremes	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
d728d74c-2812-44fb-81f9-6ffd88668638	7894900027020	Refrigerante Coca Cola Original Garrafa 2,5l Embalagem Econômica	COCA-COLA	Bebidas	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
3a470552-36ec-4b50-ad3c-cdfc79fd45e5	7891031412176	Maionese	Hemmer	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
80ddd723-a39b-4554-81a6-1513e462679d	7898064270988	Escala	\N	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
5bdbd3d5-dbc3-45be-8061-4836d8d6e4bb	7891000349779	KIT KAT MINI moments	COOKIE	Salgadinhos	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
9156ded5-86d9-4ab8-8f1d-c815be515bc5	7896885500147	BANANINHA PARAIBUNA S/AÇ 23G	BANANINHA PARAIBUNA	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
450acb36-0305-4121-b024-dc6ba0d95006	7897685920326	Pasta de amendoim com whey	Santo Antônio	Alimentos veganos	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
9fe82b1b-993f-411e-b06d-b11100fd7ac7	7891143017405	Queijo Processado Uht Original Polenguinho 136g 8 Unidades	POLENGUINHO	Queijos	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
3fb79812-8df2-48e2-8f54-fe8a3be10c97	7896030518751	Requeijão Cremoso Light Tirolez Copo 200g	TIROLEZ	Requeijao cremoso	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
e0e7e381-f87e-4e64-8948-04f810632ee8	77980274	Tri alfajor de chocolate	Guaymallen	Salgadinhos	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
7ffd4b72-c96a-41f9-b173-724d849b869f	7898944019935	Chia em Grãos	Vitalin	Alimentos veganos	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
e69dbeaa-1bef-4d11-b6ed-4ce53f69e149	7891203069795	Pão De Forma	Pânico	Pão integral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
92cf135b-c3d2-4e2b-acb3-90d273d1a19a	7891025118978	yoPro 250ml 25g prot chocolate	Danone	Bebida láctea	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
4a56a23c-85b6-4e14-a0c6-37e227cc36f7	7891079006016	Espaguete Instantâneo	Nissin	Alimentos veganos	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
49e4b84d-ae2e-4738-8040-1af95999f585	7896022205164	Biscoito Cream Cracker	Renata	Salgadinhos	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
8fc7bccf-2974-499d-b6ab-c0e7747095aa	7894900025019	Refrigerante Café Espresso Coca Cola Lata 220ml	COCA-COLA	Bebidas	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
1a561a27-dacf-4d67-8f24-3da4f06ac520	7891143013186	Requeijão cheddar light	Polenghi	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
03a90e0a-f5d3-41d8-9c92-9ee870bbea56	7891700011204	Tempero completo sem pimenta - Arisco	\N	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
e5abc86a-469f-4b0e-9289-0645e5617a64	7894900014211	coca	coca cola	Refrigerante	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
e189f341-85bf-482a-89c3-16503d8a17b4	7891132019281	Tempero ideal para carnes	Ajinomoto	Alimentos veganos	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
813414c4-c83d-49ba-837d-d847797114d5	7896275981945	Manteiga Extra com Sal	Frimesa	Pastas e cremes	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
df047382-47f7-49e6-bbba-9c824e00f782	7891097101618	Bebida Láctea Fermentada Mamão Zero Lactose Batavo Pense Zero Frasco 170g	Batavo	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
1abbdbe7-0edb-4dd8-933e-e8aa40f5adf0	7892840822590	Churrasco torcida	Torcida	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
05d04ac1-d44d-4958-b0f6-a6d8f6fd8956	7898914221887	Água de coco	Dikoko	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
3b51d5c8-4691-4359-9ed8-2ebe798ae3e5	7896003739367	Magic Toast Light em Açúcares	Marilan	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
fe6ab8ec-2070-4fe4-8ea0-c517c9680c45	7891025124177	Corpus Morango Triplo Zero	Danone	Bebidas	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
e9247a34-73cf-4d86-b4f7-9d57183d72d5	7899916904877	Suco Uva E Maçã Natural One Ambiente Garrafa 1,5l	Natural One	Bebidas	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
3f7e108a-bf16-4fd7-b905-6b94d575be78	7899916900329	Suco Integral Laranja Natural One Refrigerado Garrafa 300ml	Natural One	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
273c5ad4-8d79-4d4a-bb33-1570112eed6a	7896015976606	Mistura para Pão de Queijo	Pinduca	Specific products	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
a4787a3a-8490-4c52-9519-d407da80d945	0070847022015	monster energy	monster	Bebidas	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
250dbde6-a48e-4018-b48f-dcfee6939e91	7898384808649	Creatina Monohidratada e Micronizada	Soldiers Nutrition	Dietary supplements	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
5be32ae4-a0ab-4337-9a4b-6b53f80f0244	7897972005392	Kim	Kim	Alimentos veganos	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
7da619ee-6b86-449d-82ea-c5c2f34aa5a2	7898215151470	Manteiga sem sal	Piracanjuba	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
c210a60a-03b1-4821-84a0-77b58d90602b	7891097105975	Creme de Queijo Ricota Galbani	Galbani	Queijos	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
21f2e70e-b68a-42c9-a940-98ec4c2af663	7891097104428	Requeijão light	Elegê	Requeijao cremoso	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
9df09adc-e0f3-405a-b7cd-bf0f004cd7cf	7894900500035	Power Ade Limão	Powerade	Bebidas	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
c587d2c9-8c8f-4d17-9cd4-c4e968e4d8b5	7802575015600	Spaguetti Integral	Carozzi	Alimentos veganos	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
b40434f1-fb7e-4d79-986b-5a2340f46aa8	7896546160017	Biscoito de arroz	Rampinelli	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
1b79f290-ffa6-49ef-a3ad-920a6c507495	7896004007427	Sucrilhos original 240g	Kellogg's	Alimentos veganos	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
772644d3-613d-4647-868b-82156f35cf70	7891152801507	Biscoito maizena	Fortaleza	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
fe1dfbff-dfe0-425e-a2db-d21652b33f30	7896625211166	Iogurte Desnatado Grego Vigor Pote 90g	Vigor	Sobremesas lácteas	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
cda63a23-9ba9-4048-af44-e6b51c26063a	7898598750079	Requeijão Light	Quatá	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
f579f095-49f4-4d89-8a9f-819d00dcc247	7893500020110	Arroz Tio João 100 Grãos Nobres Tipo 1 Classe Longo Fino 1 Kg	TIO JOAO	Alimentos veganos	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
5410a020-8ada-45b1-95cb-a43de568c6e2	7891203057525	Miojo Galinha Caipira	Panco	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
80f28cb3-d3e5-4698-83ce-81637072ce61	7896625211111	Iogurte Grego Calda Frutas Vermelhas Vigor Pote 90g	VIGOR	Sobremesas lácteas	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
f5f1e6e4-b1d2-4a43-b22c-9a82359ae164	7892840821722	Sea Salt	Pop Corners	Salga	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
4f16733c-39a4-4741-a7d9-be5d0e17056d	7898692300453	Cremeria	A Tal Da Castanha	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
657b3a1a-24c7-4784-94ae-bd94400a85cc	7892840821166	Fandangos sabor Presunto	\N	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
0f5a0ff4-b408-4063-b992-bb22f311c67b	7892840820671	Gatorade ZERO	Gatorade	Bebida	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
5c27a24d-f072-4236-8ecf-db52ec3caac1	7898904874383	Pão Tipp Caseiro	Panutrir	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
c5a23a21-217e-4e03-9de1-f9e1aab7bc4a	7622210572080	Wafer Recheio E Cobertura Chocolate Lacta Bisão Pacote 201,6g	LACTA	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
80c6ec56-f142-4c6b-9b30-361f56fd3e19	7897951611040	Iogurte natural integral	Serramar	Sobremesas lácteas	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
6d3ebf6d-b027-43a8-933a-ea0409067c2f	7898908207590	Manteiga extra com sal	Gran Mestri	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
6ab18f66-db7b-47eb-aa00-003e62a108a7	7891000294376	Mochaccino Em Cápsula Canela Nescafé Dolce Gusto Caixa 172g 10 Unidades	NESCAFÉ DOLCE GUSTO	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
d71b4aec-9ea6-445e-a54e-5cece36b4d2a	7896035990095	Tapioca	Amafil	Alimentos veganos	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
f864445b-76f6-4d31-8849-7f1106db909e	7891991299619	Cerveja - Michelob	\N	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
28320078-d8d2-4763-9e98-1db0c42b938f	7894900508017	Power Ade Frutas Tropicais	Powerade	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
6baf986f-fe74-4470-8e9c-39ae5661511b	7898994939771	Leite De Aveia Com Cacau	Nude	Plant based foods and beverages	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
8e9292e9-65b1-4ee4-8b7d-de115d1750dd	7896423497984	SNICKERS PÉ DE MOLEQUE	Masterfoods	Alimentos veganos	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
b5e9ebfe-4809-4a3a-bc14-c89180615004	7896102500608	Milho Verde Em Conserva Quero Lata 170g	Quero	Alimentos veganos	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
36d747cd-7ba2-45d1-a90d-462388b1b1d8	7891000366059	Leite condensado	Moça	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
c322800a-af44-40f1-aa7f-19d65833f3a9	7894000030470	Maionese	Hellmann's	Condimentos	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
664064bf-79b9-4720-ad36-651a391e8082	7896102000382	Tomato Ketchup	Heinz	Alimentos veganos	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
6f2025c7-1d89-4ca2-bf41-7eaa1f233491	7896102593068	Ketchup Picante Heinz Squeeze 397g	Heinz	Alimentos veganos	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
51a14589-29d4-4be9-89a7-25eeb20b8ca1	7891097000720	Iogurte Grego Tradicional Zero Lactose Batavo Pense Zero Pote 100g	Batavo	Sobremesas lácteas	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
5731d14a-b7d8-4dfc-a753-7dd237623dc1	7891097000195	Iogurte Integral Laranja, Cenoura E Mel Batavo Copo 170g	Batavo	Sobremesas lácteas	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
7262fc62-fc60-43fa-a6b9-07c4539e2f2e	7896051166856	Itambe Fit	\N	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
9b0719d8-352c-41ce-bd08-62d45e8439ed	7892840823207	Fofura presunto	\N	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
746b07c8-27a9-4395-b1fb-f777113cf430	7891193010173	Pão Benefice Light 7 Grãos	Seven Boys	Alimentos veganos	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
d5b097b0-b0d7-4e61-9042-9a3514166585	7896058257656	BISCOITO COM RECHEIO SABOR CHOCOLATE	Triunfo	Alimentos veganos	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
b9628725-25c4-4f40-8c80-2ec692e146ac	7891000369203	Biscoito Laranja E Banana Mucilon Meu Primeiro Lanchinho Pacote 35g	MUCILON	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
33bb7287-ae3f-413c-8d4d-61380ab81a06	7896051168256	Protein Sabor Capuccino	Itambé	Bebidas	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
09f2dfb7-9678-4759-a2de-0d02cd5abcbc	7892840823566	Tostitos - Pepsico	\N	Salgadinhos	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
983338a4-48c2-4fac-808f-10d12fe73510	7891095028344	Aveia em Flocos yoki	Yoki	Alimentos veganos	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
d8349520-3204-492b-bc5f-46426895b874	7898080642790	Farinha Láctea italac 180 g	Italac	Farinhas Lácteas	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
390f8f60-6489-4319-a646-e8ec529c8120	7891000359822	Bebida Láctea Uht Chocolate Nescau Caixa 180ml	NESCAU	Bebidas	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
da7e7440-979b-4cdf-895c-e85b5a2b4f92	7896024761422	Biscoito recheado supreme chocolate com avelã	Piraquê	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
46f3902a-f393-4016-bd90-9daff1540c5b	7891149210503	Cerveza Negra	Caracu	Bebidas	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
17681546-3890-406b-b6c2-1de54000eed7	78936683	heineken 330ml	Heineken	Bebidas	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
76cb0f48-b9f3-4a19-a0a4-424a46173f5b	7891152801781	Amori - Amori - Richester	Richester	Salgadinhos	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
229beab1-7798-4944-b71e-5a4b5b3baeb2	7898924049501	Queijo parmesão ralado	Vale do sítio	Queijos	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
a344e3e6-feaf-4c7f-824f-0eed6836186e	7891000380994	Aveia em Flocos	Nestlé	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
dd43b88a-41c9-4b95-999d-19d4964f172c	7896038314195	URBANO Macarrão Espaguete de Arroz Integral Urbano	Urbano	Macarrão	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
4410183f-62bd-4e06-b35c-7f788d90ea1a	7892840822323	Cheetos	Elma Chips	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
6ce32ae0-ad3a-44a4-8bfb-8f8932fdbbf3	7896063223011	Macarrão Tornilho Integral	Vitao	Macarrão integral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
409398b5-f368-4065-8674-e1c4a4879b48	7893500066545	MEU BIJU Arroz Meu Biju 8 Grãos Integrais com Aveia	Meu biju	Alimentos ricos em fibras	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
ca2ea0c9-1401-483f-b50f-909fca92dda1	7896048706126	Leite Pó Instantâneo Integral Zero Lactose La Serenissima Pacote 300g	LA SERENISSIMA	Bebidas	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
4aae0e0b-a25c-4d71-a968-95ed11664877	7898056230037	Mel Flora Néctar Squeeze 280g	FLORA NECTAR	Adocantes naturais	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
99b2ff92-e500-4b9a-9007-fd2d92a944b8	7896504306457	REQUEIJÃO CREMOSO	SANTA CLARA	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
664c09c0-1203-4912-a759-e68705dd6c44	7896261402805	Cranberry BARRINHA	Joy	Salgadinhos	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
e201ad71-8251-407d-bc36-507dda4e9f92	7896035990088	hydrated Tapioca Starch	AMAFIL	Groceries	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
4a5d3ea5-c0f0-410b-9fd1-2ca4a5e8f84f	7891079014028	Miojo Galinha Caipira Picante Cru	Nissin	Geral	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
c3dd499b-aac5-4ebe-b265-a78c1ae69e60	7891048040003	Fermento Químico Em Pó Dr. Oetker 100g	Dr. Oetker	Alimentos	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
62aecd61-4dbd-4ec2-981f-fe28f592808a	7896066336381	Pão Integral Girassol E Castanha Wickbold Pacote 400g	Wickbold	Alimentos veganos	open_food_facts	2026-06-03 13:51:05.364	2026-06-03 13:51:05.346
2d26bc5d-c29d-49ad-9a08-adde0b625c83	7896066301242	Pão Integral Freekeh E Noz Pecã Wickbold Pacote 400g	WICKBOLD	Alimentos veganos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
76dbe2a9-d9f7-47f4-9dd6-ed9e90122a26	7898942775321	Suco de Uva Integral	OQ	Bebidas	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
04fa0ff5-3930-4621-bb3a-4c6884dc4227	7896003738520	Biscoito doce maizena	Marilan	Salgadinhos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
11eaed0e-34be-4b46-96a1-4609f04d4fd8	7896048200051	Vinagre de Álcool	Castelo	Condimentos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
44b9bde6-b31a-46f9-ae60-28d2702e4fb9	7898378180768	Suco de Abacaxi	\N	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
203e2a85-ea18-455c-a60b-caeee84198a3	7896002362412	Bolo Baunilha Recheio Baunilha Ana Maria Pacote 70g	ANA MARIA	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
174b7e5c-44ff-4041-8604-654b6f63a5b1	7891031405017	Mostarda Amarela Americana Hemmer Squeeze 200g	HEMMER	Condimentos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
92432ecc-64a0-4729-8486-6ac6f8bfa190	7891008124026	Chocolate Meio Amargo Garoto Pacote 80g	Garoto	Salgadinhos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
ea1f970c-f8f1-4f12-aa2f-25ee0c8a12db	7896775102383	Pasta de amendoim crocante integral	Guimarães	Alimentos veganos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
d365a109-3a2b-41de-bbce-cc02e2dedbdd	7898080642691	Manteiga de Primeira Qualidade	\N	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
385d29b0-a495-4b4c-9986-5bbe69dab56d	7898055421511	Aveia Em Flocos Finos Naturale Somos Aveia Caixa 170g	NATURALE	Alimentos veganos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
1aab0d90-af0f-4a04-b297-aa40cac6901a	7898568900688	Aveia Em Flocos grossos Vitalin Pouch 200g	VITALIN	Alimentos veganos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
33211d52-54fe-453d-9eb2-b5e2db5c5894	7896122305207	Leite Integral UHT	Porto Alegre	Leites	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
8c18829a-f30a-4005-8782-afabaa76e037	7898215157700	Creme Culinário Com Amêndoas Blue Diamond Almond Breeze Caixa 200g	Blue Diamonds (laticinios Boa Vista)	Alimentos veganos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
7cfce49c-53d6-4e5b-bebb-58d6d7cc70fd	7896051130284	Leite Pó Integral Itambé Lata 400g	Itambé	Leites em po	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
8e7a8315-9310-4ba7-9823-97495ae0847b	7892999150124	Leite UHT Integral	Leco	Bebidas	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
ea7cb8ee-2b4a-465b-af79-0e5e04566abe	7891164028237	Leite integral	aurora	Produto lácteos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
aea82b45-b551-41d8-ae21-09f11fcf81e2	7896290300714	Arroz integral Prato Fino	Pirahy	Arroz	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
755d1dd6-dd49-4adf-8a59-341a9d03feb8	7896798603584	Barra De Banana	Banana Brasil	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
b0ee1962-617e-47b7-bb62-b423372156c0	7898378180027	Suco de uva	\N	Bebidas	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
341fcb9a-fd2b-4950-ae74-f8fa3adba5a0	7896030520648	Queijo Parmesão Ralado	Laticínios Tirolez Ltda.	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
0b8eec67-e643-4f4f-9691-81e8970ba98b	7891203021113	Coco	Panco	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
1e31255d-fd2a-440a-be2a-4abf59fc7cda	7896034680126	Queijo Parmesão Ralado	PRESIDENT	Queijos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
ad19dd9d-9f03-4452-86ce-9cf1ba7df494	7891097018251	Leite integral	Batavo	Leites	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
e839e2a9-1ec9-4595-9492-6991aa790207	7896105801269	Mc Cain Classica air fryer - Mccain	\N	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
f3338b4a-9875-4b57-9c77-b136efc00485	7892840817978	Batata Frita Ondulada Original Elma Chips Ruffles Pacote 115g	Pepsico	Salgadinhos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
49049c76-0b8c-4c88-a1e4-95f9551c8602	7891330019342	Chocolate Branco Neugebauer 80 g	Neugebauer	Bara de chocolate branco	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
cddb756d-3c9e-4644-89b6-e6e94b5caa3c	7898218030017	Corn Tortilla Chips	Sequóia	Salgadinho	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
6895d1ec-5fd2-4afe-a124-0030e59f6b58	7891150058903	Milho Em Conserva Knorr Lata 170g	Knorr	Alimentos veganos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
7e54edb5-f6cb-45c9-9af1-a04877d9b377	7896038311194	Massa Alimentícia de Arroz Integral	Urbano	Alimentos veganos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
c7750d42-8c59-47d5-8bd8-a925958ea844	7896066301136	Pão de forma 5 Zeros Tradicional	Wickbold	Alimentos veganos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
ae247e4b-0d12-4fe9-9621-fe441a18efd4	7898969133043	Ovos vermelhos grande	RealAgro	Eggs and their products	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
85834337-dfde-44b1-9a45-187a5aa249eb	7896023014819	Suco de uva integral	Salton	Bebidas	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
304e5827-268b-4978-8eb9-e349c41b9cae	7891025121923	Iogurte Parcialmente Desnatado Morango Danone Garrafa 1,25kg Embalagem Supereconômica	MORANGO	IogurteLaticínios	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
a82ff48a-cd93-4298-90bc-db7a47280197	7896283000157	Granola Tradicional	Jasmine	Alimentos veganos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
6aeda0a5-564e-497d-afc0-35e2295416d9	7898755180343	Bold cookies	Bold	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
3de05d03-33e3-4f5a-be69-97b51cd867cc	7891097104794	Requeijão zero lactose	Batavo	Queijos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
249c8163-2b68-4055-bb98-0217257b9d4f	7898279790394	Balas Fini de Gelatina Sabor Banana	Fini	Salgadinhos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
dda756eb-dcc0-465f-aa6c-36b8c0d97558	7898641070338	Whey Protein Concentrado	DUX	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
928e5bbe-fa9a-48bf-ae9d-c3ed8afbedef	7891025118985	yoPro	Danone	Dairies	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
5cbfe967-9bfc-4ea7-85e3-f4ff27736752	7898215152439	Leite em pó integral instantâneo	Piracanjuba	Bebidas	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
40ff8895-c4e5-450c-9aa7-c4f29aacd52b	7898692300873	Jungle Low Carb Morango E Limão	Plant power	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
e986209d-e3af-4a07-885b-b1d4e71ea01b	7896051166412	Whey Chocolate	Itambé	Bebidas Lácteas Sem Lactose	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
957ec1ed-1ba5-4dd2-a9de-1f5ba74b4607	7897277703047	Coalhada Ati latte 170g	Atilatte	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
0a46d87d-1df4-47d2-8e00-747170a99d66	7896015976187	Tapioca Para pudin e bolos	Pinduca Alimentos	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
58abba01-1613-4e9c-8210-8e3d8e6114fe	7896292333802	Molho de Tomate Tradicional	Só Fruta	Alimentos veganos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
2bc941a2-bc12-4d51-b20d-da471f3310b9	7891962027395	Chocottone	Bauducco	Salgadinhos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
bec49efa-53a5-43e8-80e5-eb4f28e6a7c5	7896035210001	cisne tradicional	Cisne	Condimentos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
c1c17755-b487-4f40-9ff3-47b45ee9ce1b	7894904929658	Doriana cremosa	Seara	Alimentos veganos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
e4d4ddb0-6591-4d9b-bd51-ca1f278a1605	7891118026043	Paçoca	Arcor	Salgadinhos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
336b348f-c4a5-48c0-ad8d-61ea022fd4fc	7896275960575	Creme de leite uht	Frimesa	Leites	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
1d61d507-8565-4dba-a3ae-dde14a833be4	7898915415827	Leite UHT integral	Amanhecer	Leites	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
ad7a46a6-e13f-4066-ba47-110ca01bb35b	7896275960131	Achocolatado friminho 200g	\N	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
e504fadf-d474-4367-9b1b-6cbcfdeaec68	7897559900171	Biscoito de polvilho tradicional	\N	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
92ba39cc-f85d-4ed8-b814-faff5b79d049	7896982100035	Ovos Brancos Extra	Mantiqueira	Eggs and their products	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
6e9a3c51-2b8c-49d9-9a96-d1b3df784e4c	7896058258837	Biscoito água e sal	Triunfo	Salgadinhos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
735c34b8-dba9-4369-9d15-efd6791a224f	7898708731431	Creatine turbo	Black💀skull	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
dc6e088d-53ef-40fb-8c91-0d1d3062c68c	7906008074766	Crema de cacahuete	We natural	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
5430469f-2b67-44da-bfb1-24f9a4cba568	7896022205539	Macarrão de sêmola integral	Galo	Alimentos veganos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
810a4a8d-faa7-40dd-bc71-a4319809c35a	7898755180367	Bold Tube Avelã	Bold	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
5e087c14-60f2-4667-b2a5-e2061d31fec4	7892840823412	Lays batata	\N	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
22b325b5-4175-477a-845d-3bf09bf7d72e	7896004010052	Biscoito recheado sabor chocolate	\N	Salgadinhos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
4b6ae612-08ca-4ee9-b926-447687c057ac	7898380410792	Snacks sabor pizza	\N	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
798dbda5-c631-45b6-984e-39e09fe4aca0	7891150096462	MAIONESE ALHO SQZ HELLMANNS	Hellmann's	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
6b6e55c6-4482-4077-8966-4013b8e44d45	7891000402979	Choco Biscuit	Nestlé	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
bb533a29-0e23-4965-bea4-da5f7957958a	7891095911592	Batata palha	\N	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
4e6fa539-cfe3-4b9d-923f-2fcd9448bc9f	00004404	Carne Resfriada Mataboi Bovina sem Osso	\N	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
dd8acf57-d727-4b8b-a5d4-e972b166f746	7896691100678	Iorgute integral	\N	Leites	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
fb501dc1-9882-40e2-96d7-7a9477315eb7	7898215157977	Pirawhey cafe	\N	Alimentos veganos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
c64a5534-c4b3-4d7a-a7cb-883ee3f91a97	7896423423914	M&M's Pipoca	Mmsbrasil	Salgadinhos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
e85a394b-212b-4498-bcee-60bdcdc6470f	7891000394847	Nescau leve mais	Nestlé	Achocolatado	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
7d8080f7-2175-4fd3-a3e9-23dd8a250892	7892840823191	Fofura churrasco	Fofura	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
f52ba616-6597-4710-b32e-385cd399e3fc	7898960761016	Água de Coco	Puri	Bebidas	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
a655e959-de5b-4689-a643-fa0cb9d53c1f	7891203021151	Rosquinha de leite	Pânico	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
8ee75c37-942b-4604-be78-3654fa1c52ee	7891203068965	Pão de Forma Artesanale	Panco	Alimentos veganos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
9b1cfb0f-551a-453c-b2ed-e23048aa663c	7896213004835	Rosquinha de Chocolate	Vitarella	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
d07dfb5b-ae4c-453d-af0d-85be7ba9375e	7896085087240	Biscoito Água E Sal	Adria	Crackers	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
914c89f6-9130-4b7c-9894-522868ba2419	7896625211968	Iogurte Grego Flocos	Vigor	Sobremesas lácteas	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
c7f887dd-667b-40a3-9d9c-117072f9fb91	7891000402931	Choco Biscuit sabor Chocolate ao Leite	garoto	Salgadinhos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
aa9804c7-25f6-4e13-99d3-42023b034675	5601216120053	VAL: 09/11/2025	Andorinha	Alimentos veganos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
c4e474ac-83ad-421b-96ba-b4c73bf72f3a	7891000329450	Biscoito sabor maçã e canela	Nestlé	Salgadinhos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
c2f8f2d3-44dd-43a3-9ffb-0d88acf6ab95	7898403780918	Leite em pó	\N	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
eeb402da-85aa-459f-85f3-031d5e7e8070	7898938890076	Monster Energy Zero Açúcar	Monster	Bebidas	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
eae43614-a73b-449b-a288-a0f1d09f170b	7898755200041	Chambinho	\N	Sobremesas lácteas	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
2eef677c-58a6-4cdf-910b-b7d426f8c015	7895000528448	Pasta de Amendoim Tradicional	Qualitá	Alimentos veganos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
275c5a15-69ec-4ab2-95b7-4811acff279e	7896292010000	Magro com Stevia Adoçante Dietético	Lightsweet	Sweeteners	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
050b1150-ca98-4bb7-912e-aea99741519c	7891167099685	Sardinha ralada em molho de tomate	88	Seafood	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
a4c5323e-9276-43f9-95b1-1dc5aad89f3f	7896327517702	Achocolatado Apti Power 1 kg	APTI ALIMENTOS LTDA	Achocolatados	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
77d58be6-236e-40b0-879b-a8642a608d04	7892840822521	Sabor Queijo	Torcida	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
2f7f5ae0-8712-4852-a387-409aba13cedf	7792350067071	Garbanzos	INALPA	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
90b2d879-be31-4a6e-b620-a0be68afde3e	7896294900804	Requeijão Light	Tirol	Requeijão	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
d3435d8e-8c99-455e-a543-07ac7d85e431	0070341564523	Super Coffee Sabor Língua De Gato	CAFFEINE ARMY	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
6a9c0a49-1715-4d48-9990-84c408d2d2fc	7894900530025	Crystal água S/gás	Coca-cola	Geral	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
973c16e1-5de2-4ca2-9f22-c037eab705ba	7896114990190	Atum Ralado	Pescador	Seafood	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
47669ca8-187f-41cf-a196-70b048b82882	0533070660107	Jamel, cachaça adoçada	jamel	Bebidas	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
91e9a08e-db6f-4fd9-a6d3-c4000b54d5a4	7896063200586	Chia em Grãos	Vitao	Alimentos veganos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
1259fe1a-7afb-4657-906f-89f4706383ef	7896248100885	Maionese	Saude	Condimentos	open_food_facts	2026-06-03 13:52:14.526	2026-06-03 13:52:14.51
8df592b1-f684-4701-8e2e-1e56890dc6cb	7896022205218	Biscoito Maria	Renata	Salgadinhos	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
bb2eaf26-d589-4bec-9797-7a20febcfcfd	7891097104886	Iogurte Probio2 Ameixa	Batavo	Sobremesas lácteas	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
a62913d6-2835-4286-a0e9-4c7bd49775fd	7897517206284	Extrato De Tomate Concentrado Sem Pele E Semente	Fugini	Extrato de tomate	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
73a1a3ac-dff0-4807-9bac-dcda09f8ef19	7891032012207	Ervilhas em conserva Olé 280g	\N	Alimentos veganos	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
197506ab-8c45-42bf-a8fc-582328ad74e3	7897077808300	Chocolate em pó 50% cacau	Harald	Salgadinhos	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
eadc1e79-3954-45e9-a545-c6f4223bc313	7891962075235	Cream Cracker	Bauducco	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
dc014194-4090-4d3c-9300-40e935af80bd	7891000402856	cookies crocante	Garoto	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
e7f29616-6efd-488d-9058-3ab58e07a960	7891000417027	Kit Kat Coconut	Kit Kat	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
762087e2-4e4a-41b2-be0c-86f114ff1c77	7896401601044	Achocolatado alpino	\N	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
d8205a10-b0d2-4083-88fc-a17ce6a19b29	7896111423813	Biscoito doce sabor mel	Ninfa	Salgadinhos	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
d889db06-d576-43d1-bc3d-46ce20d623b5	7897179000060	Pão Integral	Vale Do Sol	Alimentos veganos	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
3bc6323a-3053-43de-a8e5-91b99fbc857e	7898644310554	Creme de açai tradicional com guaraná e recheio de leitinho	Carmel	Congelados	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
8d06d090-5a78-4504-908e-aa0a74556d96	7897173049171	Panettone pavê de chocolate	Marilan	Salgadinhos	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
ad0cc1d8-bd96-472a-94ba-bde6867acd1c	7802215512421	FRAC Vainilla	Costa	Salgadinhos	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
9e3f42e0-2307-4037-8d7b-3fb804254fec	0751320145147	Paçocão caseiro com pouco açúcar mascavo	\N	Alimentos veganos	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
e10cdca5-cd2d-4ab5-9a5c-d18a3e92d6aa	7899916917037	Suco Natural One Lar/Maç 900ml	\N	Bebidas	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
c81c0137-c58e-4fe0-9e5e-f9f8583ebe5a	7898961803173	Grãos de Chia Integral	Áster	Alimentos veganos	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
d1f44b01-7c4b-47ef-8acc-f7d7a411c330	7891772159279	Kobber cacau	\N	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
7a427311-738d-45c0-b672-adbcfaf2598d	7896102503821	Molho com Pedaços Manjericão	Heinz	Alimentos veganos	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
4fb518d9-7313-4bf2-abfe-b2ed79286ba4	7898007290202	Feijão Preto	Pontarollo	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
ae65758b-8705-4151-8b4b-25639be89e43	7898959802331	Alho Picado	Marinar	Alimentos veganos	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
41215b04-d028-40e9-9e53-9f2dcfa28fbc	7891000409305	Iog. Grego Nestlé limão 100g	Nestlé	Yougurt	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
c14c79b5-151c-454f-a817-6c5f8fed3c1f	7898416524523	Molho de pimenta calabresa	Ki Sabor	Condimentos	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
b938bf84-5021-4b47-9dec-f786e467e4d9	7898598750420	Leite Com Chocolate	Quatá	Bebidas	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
02022f35-5fc1-4aa4-8e94-24336bd9db90	7804673910535	BARRA DE CEREAL	WILD SOUL BAR	Salgadinhos	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
60536481-ff25-4010-a280-ab66bf303b3f	7891097107030	ProBio2	Batavo	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
0dcc68ba-7b2a-4b92-bc19-bd8b0216f30b	7891991297424	cerveja spaten	spaten	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
38afe60c-cdc2-4373-b276-0e99f1ffe184	7802215512391	FRAC Clásica	Costa	Salgadinhos	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
364cf48c-c9f6-455d-9647-ed68cc988019	7804659652152	NOT squares	NotCo	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
0079ff4f-30fb-48ba-9027-ef22d390fb87	5601252102433	Gallo Portugal azeite de oliva extra virgem	Gallo	Alimentos veganos	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
9e78b97e-9499-4084-8c6a-c10a7b6008bb	7896183909123	Milho para pipoca	Zaeli	Salgadinhos	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
9c035476-edd9-49c5-a789-4cb75e2d107c	7802920000978	Mi YOGHURT BATIDO SABOR MORA	COLUN	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
e2f7f6dd-6b90-43b4-b405-a944667c3692	7896102503814	Molho De Tomate Com Pedaços Tradicional	Heinz	Molho	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
0397bbcb-6e38-4184-bef6-80683b4d048d	7896003727807	Bolachas Ancient Grains	Pit Stop Marilan	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
7b893e6e-4327-4c2b-9ebc-2eaf49aa62cf	7802225689007	CRACKER Semillas de chía	Selz	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
a9ef17fa-e78b-43fc-8436-cc935eb1da29	0099071001481	Prostar 100% Whey Protein	Ultimate Nutrition	Proteínas	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
185b9e4b-fc6e-409b-9b30-7ba03dd19960	7898968764149	Leite Condensado Vegano Nude.	Nude	Condenado de aveia	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
3c83eb3f-fdcb-4552-8774-3073fc57a315	78014046	Jalea de Guinda	Colun	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
4f8419d1-a00f-4d74-ba1e-562727e8576a	7798419670084	CRUDDA BAR banana toffee	CRUDDA	Candy Bar	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
9dff9fac-f7db-4ae8-83f0-5ec1c8508220	7896655403029	Farofa sabor picanha	Rocha	Farinha de mandioca temperada sabor picanha	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
6564da90-486d-4c0c-b0be-a48cc1f98fad	7802930004188	Sin Lactosa	QUILLAYES	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
8fe4ae2e-52d1-4baf-ba04-03b8d17b30f4	7802900004606	Soprole protein+	Soprole	Leches	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
dfb9b6f3-9322-4fe4-8d72-6c097a0d8cea	7896461300048	Pipoca torrada doce	Cegonha	Salgadinhos	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
0e4f3eea-7b7e-48f9-ba64-5c492d25751e	4335619174498	COUSCOUS CUP	El Tequito	Instantâneo	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
99ad6a90-f3d8-41b3-9da4-823a3af1c678	7802832000240	MANZANA	AFE	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
54c3b5fb-67ac-4a35-82af-1832c3d440f7	7804646450273	Galletitas de arroz	RICO	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
b9aa8aa7-4368-46b2-b3d4-fdeccdf6ffc1	7622202226762	CLUB SOCIAL SABORES Sabor artificial a JAMÓN AHUMADO	CLUB SOCIAL	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
eff1ba14-732e-417e-9d80-ead55850bb57	7802420007927	Mini Pillows	Cola Cao	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
c57df47c-495f-489c-a8a9-54a818388019	7896275970611	Leite UHT integral	Frimesa	Leites	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
f63088ee-180e-42dc-bab2-921b38086094	7896253400499	Cafe rancheiro solúvel	\N	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
909947df-5a02-4e34-9a33-d2b601651c7f	7805000324018	LA VERDADERA MAYONESA	Hellmann's	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
f7e51cdc-091e-45f9-a910-1f6fe600c181	7802900481032	NÉCTAR	Soprole	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
05a565a4-5f73-4bc6-bf4c-561799624e4d	7898701301938	Pasta de amendoim the cookies	casademãe	Alimentos veganos	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
505ab57a-2a2a-4bbb-9a62-1eebed3a6f83	7896104802816	Doce cremoso tipo schmier abacaxi	Ritter	Alimentos veganos	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
be302e84-3a48-45cd-b953-becb4ace4c9b	7896202810782	Doce de figo misto com maçã cremoso	Oliveira	Alimentos veganos	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
035ed892-a664-441d-9a8a-ce242582057a	7892840822026	Ruffles Sour Cream	Pepsico	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
375cada5-c3ce-4e94-a554-f182a51ec7ff	7891152801804	Amori morango e chocolate	\N	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
2c4874ef-5a57-4f57-9e2c-33d5c758ff1c	8711853138148	Chocolate 70%	Tonys	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
d644d855-1aad-49d4-a61a-cff9ce0c67d0	7793890261844	Salmas	Zenissimo	Salgadinhos	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
66fccfe3-e158-4ff0-93c7-f53d21cd8bd0	7896022207984	Farinha Trigo Renata 1kg	\N	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
a54341ce-9474-4b5c-842a-5f86f04188f3	7801620009847	FRAMBUESA ICE TEA - TÉ NEGRO	Lipton	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
61763df3-8aa0-4334-8294-6325f65373ad	7802000017834	GRANOLA	QUAKER	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
7783cb94-dccf-494e-bca4-d3f43ac5c8f4	7802950012316	Tuco CARNE	Maggi	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
0c6b8439-5cea-4cb8-9fc4-0742ae84371d	7803468005388	MULTIGRANO PROTEÍNA	Castaño	Alimentos veganos	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
df128626-ca32-4438-9824-182b2d5ce802	7898959855412	vinagre de fruta maça	orgánico brasil	Condimentos	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
36a84a2c-a9f8-46d8-abf9-5ad7028f14e3	7801420220138	GRAN SELECCIÓN	TUCAPEL	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
9df5aefc-92da-495c-a0b5-fcff8ef45a5b	7622201693114	Cookies and Cream Oreo	Oreo	Salgadinhos	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
28573423-68c9-4f31-95ab-324c1199596a	7898690430718	Nata Friolack	\N	Dairies	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
605afce1-490c-4e00-b3c8-2e3e1b505aac	7802575001849	Capellini	Carozzi	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
2af6850e-7cdb-4d9d-bd4e-94b9d05d421f	7801235002455	Flip spa	Flip Flip	Flip	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
6409df2c-475d-427b-a200-1ae36ca1e9c5	7896986244414	Barra Dreams Mil Folhas	Cacau Show	Salgadinhos	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
879ebf14-a583-4c4c-b0d4-74d27dffeb92	8480017069528	Pão de forma com 12 grãos	Dia	Alimentos veganos	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
c0715124-3526-4c6e-a150-fe865ecf8440	7898046240015	Queijo Minas Frescal	Camanducaia	Queijos	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
14002269-9076-4885-b153-8ca1e57cd857	7801620009823	LIMÓN ICE TEA - TÉ NEGRO	Lipton	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
1a4b6ab7-f415-4ddf-9153-1587990dee09	7896916800048	Rossi Abacaxi	Vieira Rossi	Bebidas	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
89b1e4db-2b30-4724-b445-7c8db6571b82	7801610350850	Coca-Cola Zero Azúcar	Coca-Cola	Bebidas	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
b3705c57-66fb-4417-8cba-c78fe2deaddd	18989407	mega soy	\N	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
3c425347-931d-4643-aea8-8d3818177837	3248451061912	Ervilhas Finas Congeladas	D'Aucy	Bebidas	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
fec2a3b6-801f-4104-894e-fdb359478afe	3700123302360	Nestlé Pureza Vital Sem Gás 510ML	Nestlé	Bebidas	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
bbdc5604-f212-496f-b3ff-e36e2ab0a467	5060323900123	Chickpeas	Coppola Salerno	Alimentos veganos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
795991fa-20fe-46ce-8d78-681a4a66d38d	7897972001103	Kim Bisnaguinhas	Kim	Bisnaguinha	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
080ce403-70d5-4ba1-ada4-6e4a7cd3ec93	7791875000334	Galletitas de Limón	Havanna	Salgadinhos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
232b0932-eab8-455f-89b8-6528f71b8045	77903860	Terrabusi torta	Mondelez	Salgadinhos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
cb4c20fc-2bc6-4b75-a90d-bd1734cd56ec	7808760900072	Azeite De Oliva Extra Virgem Chileno Olave Premium Blend Vidro 500ml	ANDORINHA	Alimentos veganos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
eb9e42dd-fd4d-4fce-8de0-a260e7821fe9	78600010	Tic Tac menta	tic tac	Salgadinhos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
ab8a68fb-147a-4cbd-96f9-96cd7b068141	7891000011294	Cereal Infantil Milho Mucilon Lata 400g	Nestlé	Geral	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
b41b44ef-6011-4c6e-b78b-46bb5543065e	7891000062661	Composto Lácteo Ninho Fases 1 Lata 800g	Nestlé	Dairies	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
0d9da782-ee8f-43d4-92ed-a2cdd018c646	7891000062760	Fórmula Infantil Para Lactentes 2 Nestogeno Lata 800g	Nestlé	Geral	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
cfee2c9e-6bb9-46df-b806-3503c233e8d3	7891000073100	Cereal Infantil Arroz E Aveia Mucilon Pacote 600g Embalagem Econômica	Nestlé	Geral	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
81432571-f942-40b1-802a-e0a9cc88b53a	7891000081501	Bebida Láctea Uht Chocolate Nescau Caixa 1l	Nestlé	Bebidas	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
f58212b9-4985-4610-9b24-bffbcd1212d7	7891000090732	Bebida Neston fast Vit 280ml	Nestlé	Bebidas	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
f5a1a61f-52ed-457e-ba7e-cf4d577b2f8d	7891000098950	3 Cereais Neston	Nestlé	Cereais	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
4d5a4ec2-fb93-4b79-87bc-770dd271fc5b	7891000109298	Cookie original + Trento Duo	Passatempo	Salgadinhos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
542ce71a-5f8d-41d4-827a-fa9c29b0e108	7891000126905	CREME DE LEITE UHT NESTLE	Nestlé	Creme de leite	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
f7bd49d6-6022-4b2f-965e-1464fef500c4	7891000241295	Biscoito Recheio Morango Passatempo Pacote 130g	PASSATEMPO	Salgadinhos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
367b0a68-5a15-419f-b08f-d813beaf7c83	7891000250150	Caldo Tablete Carne Maggi Caixa 57g 6 Unidades	Maggi	Geral	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
565a30ee-64e9-4a95-a36d-33f805b9eef0	7891000252604	Farinha Láctea	Nestlé	Alimentos veganos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
605dc3d5-a859-4ad6-8cd6-dfc5c896abac	7891000253526	Caldo tablete Maggi 114g menos sódio Carne	Maggi	Geral	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
d7c4537f-1113-4fb0-bcc0-7d8ec4393564	7891000256855	Crescidinhos Sabor Chocolate	Nestlé	Geral	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
4e9f8d3b-8875-4d8c-91f8-1069d0fa6962	7891000268100	Pó Para Preparo De Bebida Vitamina De Pera, Morango Banana Neston Lata 400g	Nestlé	Geral	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
99eb051f-a59a-4b1a-afff-42bdaf625b1f	7891079000250	Nissin Lámen Bacon	Ajinomoto Alimentos	Alimentos veganos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
7e267641-76f0-4c94-a14d-e51650e364f8	7891095300372	Farinha De Mandioca Tipo 1 Yoki Pacote 500g	Yoki	Farinha de mandioca	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
58aef8aa-f2f3-4f5d-8502-2a4cee3cb502	7891095300488	Farofa	Yoki	Farinha de mandioca temperada	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
9c80aa4c-d32d-4c0f-81b6-c241fcad1380	7891095300808	Pão de Queijo	Yoki	Préparations pour pains	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
b2afce14-fce9-4825-9d8d-7660e64c4968	7891150027800	MAIONESE TRAD SQUEEZE HELLMANNS	Hellmann's	Condimentos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
00cc9e2d-ea1f-4d87-aa1c-d1a0b3e9d0e4	7891167021020	SARDINHAS C/MOLHO DE TOMATE GDC	GOMES DA COSTA	Seafood	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
6e5ee0dd-a4b0-4883-9ffd-71830d6f469b	7891962032283	Wafer Fresa/Frutilla	Bauducco	Salgadinhos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
acb82c3e-09a7-4d92-ab32-5664770ec39e	7891962036915	Wafer Chocolate con Avellana	Bauducco	Salgadinhos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
bcce77db-8993-48bb-8afc-13acdacf58aa	7891965140558	Pão de Queijo	Hikari	Alimentos veganos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
55dfa45e-5e77-4200-8ca0-79b565e3cabe	8718989002640	Bio+	Bio+	Geral	open_food_facts	2026-06-03 13:48:45.2	2026-06-03 13:48:45.152
a9c0129b-62eb-4eec-98a2-e9e2ecdf2df7	7893333229001	Gelatina Pó Sem Sabor	Royal	Cooking helpers	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
6e9a4be5-1fb9-43e4-a903-908ecf35fcce	7893500018483	Arroz Integral Tio João Tipo 1 1kg	TIO JOAO	Alimentos veganos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
56de726d-bb71-48ee-8bc3-a0f792c9bfc0	7894900011715	Refrigerante Coca Cola Garrafa 1l	COCA-COLA	Bebidas	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
78e397f3-dbd6-4200-9c24-2fc61ecec101	7894900530056	Água Mineral Natural Crystal sem Gás	Coca Cola Brasil	Bebidas	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
7cf02a94-9d38-4837-956c-b9f19bf09b94	7896004400020	Sococo coco ralado 50g	Sococo	Alimentos veganos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
a2cb69de-68e5-44c7-9f87-4b234ad4d23f	7896005302057	Nectar de mangue	Essential By D'ongles Hai	Bebidas	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
c27a813a-afc2-4220-86b1-72fd3a55de62	7896006711155	Arroz Tipo 1 Camil 5kg	CAMIL	Alimentos veganos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
3c34fd3a-17cc-40c0-bc1a-3ecce250924f	7896006791096	Proteína de Soja Texturizada	Camil	Geral	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
c4804ce3-c87c-4b0c-a10a-6513f9881b81	7896007800124	Shoyu Light	Sakura	Condimentos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
c3cfdc28-0497-4b0a-9f83-c1770b4db673	7896034610024	Leite Uht Semidesnatado Parmalat Caixa Com Tampa 1l	Parmalat	Bebidas la	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
2ee6abc2-e6e5-4826-819f-713f30f11381	7896051114086	Creme De Leite Esterilizado Homogeneizado Itambé Lata 300g	Itambé	Alimentos para culinária	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
1fba3ef9-fa98-4db0-af6a-33c542076b66	7896051130116	Leite em pó integral sem lactose	Itambé	Bebidas	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
9000d35b-95c1-4605-b616-bec338d529f0	7896058500110	Mini disqueti	\N	Geral	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
36867b4f-a8c6-4891-979f-f14d07294730	7896062801050	Água Mineral São Lourenço Com Gás	Nestlé	Bebidas	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
7498a395-4f2b-4b8d-a4d2-1e2cf2b10d81	7896079816139	Torrone com Amendoim	Montevérgine	Salgadinhos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
ad145a05-9459-4ea3-bbc1-e0e88862bb2f	7896089011357	Café Pilão	Pilão	Café em Pó	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
c3bd3d1f-4b9a-4158-b25d-ca3bf3ad52f4	7896336006624	Paçoquita	Paçoquita	Alimentos veganos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
41d5d68b-7f3e-4d7b-bf7d-78358f2a7bc8	7896423419276	m&m's	M&M's	Geral	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
03ab9aa4-ad03-4e78-aad5-592ffab46a43	7896702900037	Pipoca de Milho Clac	CLAC	Salgadinhos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
fc83ed2d-274d-4999-a7de-f9a7ae28fd71	7898126320873	Pasta de Amendoim Integral Granulado	Mandubim	Alimentos veganos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
a08813a7-c2a0-409c-be50-8777059446c8	7898192030614	Sú Fresh Nectar de Uva	Su Fresh	Suco de Uva	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
b6c43ee6-a641-4fe6-ab1c-e066d0ae5474	7898409951824	Ovomaltine Flocos Crocantes	Associated British Foods	Extrato de Malte Sabor Chocolate	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
5671787d-5044-48a8-a309-32ce012e4566	7898902299164	Goiabada Stella D'oro Pote 600GR	\N	Geral	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
65de452f-b2b6-4abc-b0e1-201960f03e8b	7898920195141	Nutri Néctar sabor uva	Nutri Néctar	Bebidas	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
04d26dbc-fc77-4412-8fa6-1ba75637d2b3	7898925543022	Pulpe d'açaï bio	Terraçai	Geral	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
27eaf0f2-27a3-460b-ac57-76e00570bbab	78903180	Sal Cisne Refinado Extra	Cisne	Geral	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
f6621d74-b452-440d-bd8b-a6132570838a	8005121000122	Fettuccine 12	Divella	Alimentos veganos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
075d3eae-6db8-4284-ad7f-8632354554d4	8005121000535	Gomiti 53	Divella	Alimentos veganos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
92613f45-ff17-44d3-8b2a-6ec46fe97b94	8410010813729	Azeite de Oliva Extra Virgem	Carbonell	Alimentos veganos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
997f79de-09b4-4c4b-947f-f72e5830d824	8851019010229	Pocky Mango Sticks 25 GR	Glico	Salgadinhos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
0aafd769-409b-42b8-b4b7-c1b2e29b708a	8005121218107	DIVELLA Arroz Arbório Divella Italiano	Divella	Alimentos veganos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
fb5febf3-2d94-4225-80f8-c5f04cfb6bc9	7891021005043	cafes	melitta	Alimentos veganos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
e8c88a39-814d-4229-9756-1afdbd0383d9	9556023674526	Potato Crips Original flavour	Jacker	Salgadinhos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
2a0e67e8-bec4-46ec-a522-8e285235c194	7892840800406	Pepsi bresil	Pepsi	Refrigerante	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
c35f5b3a-9f04-4a77-8bc2-a26cc466e2fd	7898366930344	Goiabada	Palmeiron	Alimentos veganos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
7949932d-c898-4729-ba63-c276f6e14ddf	7896229800315	Iogurte Morango Fazenda Bela Vista	FAZENDA BELA VISTA	Geral	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
c51ee391-db09-4720-a997-e462dee36728	7896079500175	Leite Desnatado	Elegê	Leites	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
6980f769-706c-4ebf-b7c5-a7a7d6e16efe	7896512909787	phebo sabonete	\N	Geral	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
2f00ad72-7527-4538-ae14-53c1620b434b	7898279792039	Minhocas Citricas	Fini	Geral	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
94ea64b1-7d11-4328-879f-7272198d7de1	7891962045160	BISC CEREALE CACAU 170G BAUDUCCO	Bauducco	Salgadinhos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
454b7838-820a-4de9-8ce5-89a00a0092d4	7894900030013	Refrigerante Laranja Fanta Lata 350ml	Fanta	Porcarias líquidas	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
a4aa275a-e522-462a-b244-55c7bbc8cd7c	7896185312716	Leite UHT Integral	Shefa	Leites	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
bb523409-e747-49eb-861c-c5ab2f23e4bd	7894900031515	Refrigerante Laranja Fanta Garrafa 2l	Fanta	Bebidas	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
c0d97595-2112-4747-a1f2-0e04a5f64e10	7894900556032	Bebida Adoçada Laranja Del Valle Frut Garrafa 1l	PORTINARI	Geral	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
bfa7aa4d-cb8f-4fe7-866a-1ab7c3751a7b	7896183202187	Leite Integral	Quatá	Leites	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
63d97ce6-b7ee-443d-8039-7df736165b0a	7896048706041	Leite em pó desnatado instantâneo	Lá Sereníssima	Bebidas	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
25033bc2-7854-4021-ab02-8db3ae683564	7892840808044	Isotônico Gatorade Tangerina	GATORADE	Geral	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
c7b696db-5081-4114-872c-aa4520dfef57	7891030002354	mococa	Mococa	Leites	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
5e5569aa-d02e-423e-8e7d-a90415651b9a	7891095300631	Polvilho Doce	Yoki	Alimentos veganos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
3fae7acc-356c-4c8d-9072-580eaa6c955f	7891999011039	Margarina Vigor 500g com Sal	Vigor	Alimentos veganos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
9a380f16-2c24-4bed-8f2c-ee395f70f9ed	7898279799823	Regaliz ácido tubes fresa	Fini	Salgadinhos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
c53de968-5906-47ce-afe3-65f2b5a5245a	7895800201503	Goma De Mascar Morango Zero Açúcar Trident Envelope 8g 5 Unidades	TRIDENT	Salgadinhos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
10fd9f8b-2dea-46a7-bd9b-7c9209cb487b	7891048038468	Chá misto - capim-cidreira, limão e gengibre	Dr. Oetker	Bebidas	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
1858fc50-8b42-4d44-b8fe-56bc8efd1eb1	7896041172591	Catchup	Oderich	Alimentos veganos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
ae544644-3b3a-4fbb-8ede-4651530830f9	7898205924435	Natural Whey Verde Campo sabor cookies & cream	verde campo	Sobremesas lácteas	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
e77c37ad-77c9-43cf-b8d6-6c325ca3b5c3	7898941911065	sustagem kids	MeadJohnson Nutrition	Complemento alimentar infantil	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
f15afc39-74c0-4b49-983b-43946a228820	7898366930023	Farinha de milho flocada sem adição de ferro e ácido fólico	Vitamilho	Alimentos veganos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
b44d09b6-32e4-4337-a6e1-ce2a03c95824	7896004401744	Sococo. 330	Sococo	Bebidas	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
50216d3f-eae5-448f-84a6-07bde5c51473	7891167011724	Atum em Pedaços ao Natural	Gomes da Costa	Seafood	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
9958c138-7e9d-4d8e-b2f5-e80e69ef07e5	7896110194363	Sal moído iodado	Almirante	Condimentos	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
0e28976d-0626-4896-8aaa-b0868b7a33dd	7896051130109	Leite em Pó Desnatado Instantâneo	Itambé	Bebidas	open_food_facts	2026-06-03 13:52:25.608	2026-06-03 13:52:25.593
bf576baf-9e6a-4f93-9445-bfa89102a48f	7896090082056	Farinha de Trigo S/Fermento	Finna	Alimentos veganos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
efe50b22-b5f0-415b-97ae-7bf6ac47e18e	7896041156010	Milho Verde em conserva	Oderich	Alimentos veganos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
1e79e5ab-0dd8-44b0-860e-677c43a508fc	7896224800594	Café descafeinado	Santa Clara	Bebidas	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
5da93057-e62d-4f6d-984a-8f91d8db0b05	7896028030661	Coco ralado úmido	Menina	Alimentos veganos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
ff0c6565-b840-4c4b-87e5-55f370b7ead1	7898924049051	Queijo parmesão ralado	Sítio Recanto do Queijo -- Relíquia da Canastra	Queijos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
c299b68c-0a9d-438c-832c-e14c2255d0e9	7892840267940	equilibri	PEPSICO	Salgadinho	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
e93cb857-2ce3-4143-96dc-144d1c27c0f2	7890300155929	Feijão Preto	Fritz & Frida	Alimentos enlatados	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
2cbf9fc4-27f9-4089-aecb-d6f5dd7117c3	7891143017887	Polenguinho Original	Polenghi	Queijos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
521dfa37-3179-415f-a427-c9c8e0fecb79	7896005802892	Cappuccino Solúvel Chocolate 3 Corações Pote 200g	3 corações	Alimentos veganos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
b4468597-5d59-4366-a55f-964b7e930303	7895800304235	Goma de mascar sabor artificial de canela	Mondelez International	Salgadinhos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
16efac37-4dda-4644-a0f6-60117f3cfccb	7896982100202	Ovo jumbo branco	Mantiqueira	Eggs and their products	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
a878fafe-61b8-4612-a193-55961484275c	7790045825401	Frutigran Avena, sésamo, amaranto y girasol	Frutigran	Salgadinhos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
a45a6dfc-96f4-4404-8bcd-ddf0be745166	7896004401386	Postre cremoso de coco	Sococo	Salgadinhos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
b828c0ed-b446-44d7-abc5-6087da468fb4	7898341430036	Néctar Pêssego Del Valle Caixa 1l	DEL VALLE	Suco de Pêssego	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
3be1bcb0-429d-4b79-ba0f-e3d1950f3d1b	7891000062722	Fórmula Infantil Para Lactentes 1 Nestogeno Lata 800g	Nestlé	Geral	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
37b2e137-2ee4-4dd2-b806-2fb42d38b4be	7894900300017	Schweppes tonic	Schweppes	Bebidas	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
0ade6af7-cd99-4d70-8558-67ed59b9bedc	7896066336626	Pão Iogurte Cenoura Wickbold Estar Leve Pacote 370g	Wickbold	Geral	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
1e4c7e38-1d27-41f4-8da7-638d2514f522	7891167011717	Atum Em Pedaços Em óleo Gomes Da Costa Lata 120g	Gomes da Costa	Geral	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
ea11d83b-977e-43d6-afe0-ed9b0437b831	7898934982683	Chocolate com açúcar de coco	Only4	Salgadinhos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
28aaa524-be0a-4761-9c14-b7775a08434e	7896100501829	Suco Uva Tinto Aliança	Nova Aliança	Bebidas	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
bc759711-d679-440f-888e-5909112664de	78605831	Pastilha Morango Incrível Dupla Tic Tac Caixa 16g	TIC TAC	Salgadinhos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
285ab093-d770-4095-a421-b3e6b150315f	7896283001321	Cookies Castanha-do-Pará Integral	Jasmine	Salgadinhos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
c061ec81-f1f9-40f8-a6b4-8bf980d27821	7891000289747	Biscoito Nesfit Maçã e Canela	Nestlé	Salgadinhos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
27226c9a-8797-43d2-88bb-876add2b2c63	7891025116943	Iogurte Natural Zero Lactose Yopro Pote 160g	YoPRO	Lácteos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
de0d6908-09d9-4799-9a74-2111ca335e98	7896007865970	Molho especial Tarê	Sakura	Geral	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
b1c9f51f-b3a0-4c99-b046-177631c2930c	7894000050539	Mayonnaise	Hellmann's	Geral	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
4f5152f0-f7ee-4d5b-9107-6ead928a58e8	7891008114003	Bombom Garoto Garotices Caixa 250g	GAROTO	Salgadinhos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
7cde6256-1f4c-4487-bf1c-fd46049f3509	8002591906022	Barbera olio extra vergine di Oiva	\N	Alimentos veganos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
afbd339f-725d-459f-9196-88b719207627	7891079013113	Cup Noodles Cheddar	Nissin	Alimentos veganos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
de33bfbf-c438-4542-9997-7ac2c26c3391	7896003737394	Biscoito de Chocolate Branco Teens MARILAN 80g	\N	Salgadinhos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
0c8d5859-086d-4eef-9410-3a1316d68ab1	7730241003906	Yerba Mate	Baldo	Beverages and beverages preparations	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
8522b3c5-8e84-4c57-b71e-c44e902d6f7a	7896110100043	Sal Marinho lebre	Sal Lebre	Condimentos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
e82718c3-7340-4284-a859-d2a3d0015b42	7896200115360	Feijão preto	Broto Legal	Feijões	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
3cdaa665-926b-470c-abc9-841dc0a66b29	7891000249963	Caldo Tablete Legumes Maggi Caixa 57g 6 Unidades	Maggi	Geral	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
8cabb875-b5b6-4016-9029-9639622edb91	7622300990701	Original Club Social	CLUB SOCIAL	Salgadinhos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
9c373b07-66b1-4be9-95a7-e2fad16079a4	7891962056678	CHOCCO BISCUIT MEIO AMARGO 80G BAUDUCCO	Bauducco	Salgadinhos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
758e5f91-11ff-49a3-b3c2-e9037432aea5	7891097010781	Iogurte Integral Morango Batavo Pedaços Pote 500g	Batavo	Sobremesas lácteas	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
8f237f35-8cf2-40ae-aab4-6a20fa887dd7	7891000282748	Ninho Fases 1+	Nestlé	Composto lácteo com óleos vegetais e fibras	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
baa8688e-c391-4d93-b234-08ee4a331fde	7622300847791	Goma De Mascar Menta Zero Açúcar Trident Caixa 25,2g 14 Unidades Leve Mais Pague Menos	TRIDENT	Salgadinhos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
2837a5dd-e6a9-4357-974a-07ddbc43672c	7896050200124	Cachaça	Velho Barreiro	Bebidas	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
edb82b16-667d-4ad3-9367-b8b1386604ef	7898215151302	Manteiga com sal	Piracanjuba	Pastas e cremes	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
c3d4f535-e14a-4059-9ce3-f5a9b17f2fc2	7891079011515	Yakissoba	Nissin	Alimentos veganos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
ffef1533-f714-4d05-9e43-fd191eb0c66d	7896051130154	Leite em pó integral	Itambé	Bebidas	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
1c93f0b6-4161-4b2d-997f-435b8335a370	7898215151999	Leite Condensado Zero Lactose Piracanjuba	Piracanjuba	Leites	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
954eb0ab-f5a5-4968-9a34-98151d328e18	7891021001946	filtro de papel Melitta	Melitta	Geral	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
a7bdde8f-d222-4dc1-b940-fa3e898af8b3	7897042005048	Creme	Skala	Geral	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
6eccc9fa-3b87-4a21-a5cf-e39d1ccf55d5	7896099100256	Feijão Carioca Tipo 1 (cálcio 62mg, ferro 4mg)	5 estrelas	Geral	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
dadb3d44-f7b4-4d44-9436-fc75bc802834	7891962054124	Bisc cookies chocco 96g/105g bauducco	Bauducco	Salgadinhos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
c7544c85-a8ba-47da-94f2-11d63af93c5c	7898678660519	Linguiça vegetal	fazenda futuro	Alimentos veganos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
26f75b77-2820-44cf-a45b-79afa4662017	7898941911072	Pó Para Preparo De Bebida Morango Sustagen Kids Lata 380g	VIZIR	Geral	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
dd867678-931d-4f75-85a8-38b788456072	7891095001262	Mistura Para Bolinho De Chuva Tradicional Yoki Pacote 250g	Yoki	Cooking helpers	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
fad572aa-8246-44f9-a778-66cdde9f9fe1	7891167011748	Atum Ralado em Óleo	Gomes da Costa	Seafood	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
6fa96efb-5c24-4fe1-887c-0e2cba47e35d	7896009301148	Atum sólido ao natural	Coqueiro	Atuns em filete	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
e9ebb4f6-c47a-4545-b3fe-a6a9388f9c5f	7896036096079	Molho De Tomate Manjericão Pomarola Sabores Sachê 300g	POMAROLA	Alimentos veganos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
d08810b7-e551-4735-a51d-66b4b95a8148	7892840812416	h2oh!	\N	Geral	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
b0e08012-162a-456d-9708-9777a9cbb3b3	7891091049428	Granola São Braz sabor banana	São Braz	Alimentos veganos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
11745ff8-1a3b-465a-8e6b-09aab27a35ea	7891962058733	TOAST CEREALE AZEITE BAUDUCCO	Bauducco	Salgadinhos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
e2d1b9a9-99f8-47af-96d2-5d907bf58183	7891962032450	Biscoito Maizena Bauducco Pacote 170g	Bauducco	170g	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
9a61cdf4-7c9c-4aa4-9651-50a14ba17705	7891095029723	Pipoca Sabor Manteiga	Yoki	Salgadinhos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
d014c3e4-4229-4afc-ac66-8487e8be0b75	7897393605553	Cer mat alfafoods fruit rings 60g	\N	Geral	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
3b876ec5-3df1-47cc-b699-9786c5f0cc08	7896002309172	Pão de Fôrma - Sem Açúcares, 12 Grãos, Fonte de Fibras, Zero Colesterol - Plusvita - 350g	Plusvita	Alimentos veganos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
091104bf-48c6-4c62-90f0-9fc425f98e84	7897179000169	Pão 44,1% Integral Multicereais	Vale do Sol Naturalista	Alimentos veganos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
94ed4d48-25d8-4a9e-9f69-f28185c4bf06	7898019060671	Egg	\N	Eggs and their products	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
6e2482c3-7cce-4094-8ffa-4a5ac601ef3f	7896060042240	Bebida à Base de Leite Fermentado com Fibras Turma da Mônica	WOW!	Bebidas	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
23785903-d4d9-4a6a-96e8-ac74e985733b	7898939072617	Pasta de amendoim integral crocante	Power 1 one	Pastas de Amendoim	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
0a404503-95fe-468c-bc06-8e6a92cb8ad0	7894904219636	Empanado de Frango Incrível 100% Vegetal	Seara	Alimentos veganos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
25025888-a4ff-4067-ae75-a666b050dd1f	7898055420484	Granola Cereais Crocantes Com Frutas Naturale Pacote 1kg	NATURALE	Alimentos veganos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
671b5d2d-24ab-4463-b27e-3bdcbf795ed5	7898678660069	Carne moída de plantas	Fazenda futuro	Alimentos veganos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
7bde13de-818a-41cc-bdde-4bd2593f23b2	7898067340404	Pão de alho	Santa Massa	Alimentos veganos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
1f6961cf-8d6e-40b1-9bb4-c973eeaf48bb	7891031409404	Ketchup Tradicional	Hemmer	Alimentos veganos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
fa680531-5862-4187-a67b-7898c1284ba8	7891991008785	Guaraná Antartica Zero	Antarctica	Bebidas	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
3d36eeed-1039-44c2-a1fb-c9b7e487dfc3	7891025116790	Requeijão Cremoso Light	Danone	Geral	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
e0fafde2-93f3-459c-9bee-adaa4300f07d	7896256605167	Cremor	\N	Geral	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
713706fe-f664-40fe-9234-16ff8f5d60e9	7891097101632	Iogurte integral com preparado de mel	Batavo	Sobremesas lácteas	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
68712948-6054-47f2-b48b-6c5fd34c171d	7896053800451	Kalasi sor cream onion	\N	Geral	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
878d27cb-d319-46c1-8355-ee38a45efbce	7898080640673	achocolatado instant�neo Italac	Italac	Cacau e seus produtos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
72ba9ccb-7814-4ed1-8439-e9ebb8ad2157	7891000502204	Tempero para Carnes Gril	Maggi	Alimentos veganos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
b0879fa1-5369-41cf-9889-42ba88574228	7898039680392	Requeijão cremoso SCALA	Scala	Geral	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
17bfd533-f41b-444c-8e18-53f5185fb879	7896051130055	leite em po	Itambé	Leites	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
c0cae342-c86d-41a6-8324-5d70d0bcd1d8	7896022206147	Farinha de trigo integral	Renata	Alimentos veganos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
b5d47d32-1464-4d76-81b6-be23fbf09c63	7791875000600	Galletitas de Limón con Chocolate	Havanna	Salgadinhos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
309cd454-7d76-4adb-b4cd-9c405e965e07	7503013040689	Sustagen Sabor Chocolate	Sustagen	Bebidas	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
1a942cd1-717b-4034-9457-1dc234875c49	7896552906692	Manteiga de Coco Com Sal Qualicoco Sabor Manteiga	QualiCôco	Pastas e cremes	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
9172ec76-6a0b-487c-a903-f63ee71cccd0	7896005271377	Massa de Sêmola para Lasanha Tradicional Petybon	Petybon	Alimentos veganos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
85a9712c-4ed6-46f2-a90b-5a72a1e5bdb4	7896114901738	Sardinhas com óleo comestível	Pescador	Seafood	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
0e83d7bf-4939-42ea-a9ba-dca557336f71	78600027	Pastilha Laranja Tic Tac Caixa 16g	tic tac	Salgadinhos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
0622cbb4-7aa8-4475-9069-ece848d4e363	7908228801634	BALA FINI GIGANTE 27G MORANGO/NATA	\N	Salgadinhos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
6f90459e-d22b-4b16-b9c7-13297318c5ea	5601252102815	Azeite De Oliva Extra Virgem Reserva Português Gallo Vidro 500ml	GALLO	Alimentos veganos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
23ce6cc3-0d37-4e64-b2ca-10acddbf86fa	7896019206785	Café Iguaçu Clássico	3 Corações	Bebidas	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
bd2f2427-234f-4490-be83-063cbf5712b8	0013300009581	Maple Butter Xarope Pra Panqueca Hungry Jack Importado	Hungry Jack	Bebidas	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
0287f3a2-23ec-4f18-ad5e-cb6c1f731db4	8005121000757	Anellini 75	Divella	Alimentos veganos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
449b373e-fa49-488f-aa6d-41f8d877ce8e	7896024760456	Biscoito Salgado Integral	Piraquê	Salgadinhos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
362577b7-e49d-4925-87c6-8273ca1eae89	7896200115346	Feijão carioca comum tipo 1	Broto legal	Alimentos veganos	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
61a9ccf7-536e-4dd1-9b47-ce426033a438	7891331010522	Barra de Cereal Morango com Chocolate	Nutry	Salgadinhos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
9e1ab138-fb56-43a7-964f-54fcc389a741	7622300859817	Gelatina de morango	Royal	Cooking helpers	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
35786112-d009-430c-9c1d-0cfcb413a11c	7891048038123	Chá Misto de Camomila, Capim-Cidreira, Hortelã e Erva-Doce-Nacional	Dr. Oetker	Bebidas à base de ervas	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
8f4d0bd3-8b20-40b2-b4ee-cbcc2cf6bdd5	7896623100042	Suco Integral Laranja Xandô Garrafa 300ml	XANDO	Bebidas	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
ec28b22a-7972-4fb0-98ba-aabdb4f9d0e9	7891000333600	Nesfit Cacau	Nestlé	Alimentos veganos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
89259515-2998-4c31-a547-272e7e617f6a	7891097102059	Compuesto lácteo	DoBon	Geral	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
7c8e01da-7fed-4de5-97c9-ad9a1d8aabf5	5060323902264	Montara	Coppola Salerno	Alimentos veganos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
a92f2227-c9b1-4633-83ff-6692afd588dd	7891031405031	Mostarda Amarela	Hemmer	Condimentos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
ffb311dc-864e-4c0a-bdc5-e9bac393b8b2	7896009301193	Patê Atum Coqueiro Sachê 170g	Coqueiro	Geral	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
2ed111ea-f109-4d91-80be-6c047f3edc35	7891515540098	French Fries	Sadia	Chips and fries	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
cfde735b-d2b5-4108-b59b-0af3078b5af8	7896261402614	&JOY	Agtal	Geral	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
ae04471c-75f2-4dc6-ad3c-43d7e631ee25	7891032012504	seleta de legumes	olé	Alimentos veganos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
885fc154-c069-4a61-9be7-3670442efc27	7896102502909	ketchup	Quero	Condimentos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
875c9f7b-d122-4f29-a3af-a0ee045762a8	7896104865903	Barra de Cereal Brownie de Chocolate	Ritter	Salgadinhos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
fcd37250-34d1-4764-b903-f5be421abee3	8410179000039	Condimento De Azeite De Oliva Com Casquinha De Limão Borges Garrafa 200ml	BORGES	Geral	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
0c830c4e-0a38-4cbe-b01b-f3726c78fb21	7896058506105	Gomets	\N	Geral	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
1a1bbb0c-642d-400b-a12d-55a743bc9be3	7896436100642	Água Mineral com Gás	Água da Pedra	Bebidas	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
f6fbd9f3-b1f2-49ac-9d97-f32dd20c8270	7896423480894	Bala de Frutas SKITTLES 38g - Sabor Wild Berry	\N	Salgadinhos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
2f0a45c6-5119-47f4-91a3-0f21f721d4bb	0040032422753	Cococrisp	\N	Salgadinhos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
5d762f5c-b1fd-4c46-8df5-56c07a2130ab	7891079013038	Cup Noodles Galinha Caipira	nissin	Alimentos veganos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
5fda4214-5487-4c36-b6ef-48c4f4102693	7896336008062	Amendoim Japonês	Mendorato	Alimentos veganos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
3a8fed50-1274-4658-893d-8474b17834c5	7891962054780	Biscoito Recheado Bauducco	Bauducco	Salgadinhos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
0927c5f4-cdf1-4a76-95d0-67919781a4d5	7891962058399	Oblea de chocolate	Bauducco	Geral	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
f4f652ee-a865-4b49-a84c-d76bc4a0e3a4	7891515921668	Poulet pané	Perdix	Geral	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
8e090363-5373-433f-8ab1-64fabc890002	7898686950299	NotMilk Semi	NotCo	Bebidas	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
3761149e-f527-4dc0-aa59-5a3e1eeb0002	7891097101717	Iorgute de Morango Batavo	Batavo	Geral	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
b7bd14bd-c0db-496a-bc1d-b309e5c21fe7	7622300992330	Pack Biscoito Integral Tradicional Club Social Pacote 288g 12 Unidades Embalagem Econômica Leve Mais Pague Menos	CLUB SOCIAL	Salgadinhos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
b64912c8-70ee-4e3b-abe4-830c060cc7db	7622210429209	Chiclets	Adams	Salgadinhos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
cd87dcb5-a439-459c-9fbf-3b011d4f9476	7891737170530	Goma de mandioca hidratada para tapioca	Confiare	Alimentos veganos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
a804807e-bd4b-455f-8125-68caf6fd0047	7896025803718	Mostarda Com Mel	Cepera	Condimentos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
d6c84ffa-4c84-4f47-b127-e4ba223ac77b	7898912485649	Queijo parmesão ralado	Natural da vaca	Queijos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
1b8f37e9-a2a1-4b9f-b4c3-97b758d9da40	7891030300306	Mistura de leite, soro de leite, creme de leite e gordura vegetal	Mococa	Creme de leite	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
0fb6ada4-79dd-4c2c-8ae4-ce82a6893422	7896481130441	Mistura para preparo de Canjiquinha Cural de Milho	Coringa	Cooking helpers	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
960106de-757c-4f1b-8328-067fd03a62b0	7891098040565	Matte Leão	matte leão	Geral	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
c2558981-7560-4208-978f-658ae083ac5c	08477224	vigor requeijão cremoso tradicional	vigor	Produtos lácteos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
6e018950-8c98-401e-9b04-3a2ca7e67ff8	7790070218216	Azeite de Oliva Extra Virgem	Cocinero	Alimentos veganos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
49d807d9-5eab-4a06-9a43-10aee55473be	7891000255445	Crunch	\N	Geral	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
003db5fe-f03f-41e2-bbcf-c09c1c35ae3b	7896022200756	Macarrão De Sêmola Espaguete 8 Galo Pacote 500g	Galo	Alimentos veganos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
45651806-e642-45ba-a1d4-aeb4e396bb8e	7894904500383	Hamburger Texas Burger	Seara	Meals	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
ecccd7ea-f753-4f45-8ab6-6d2a0f28ddc3	7891000288801	Nesfit Original	Nestlé	Alimentos veganos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
8ddfd0a9-4a22-43b5-9998-7a711ca43c81	7891132082360	Refresco Em Pó Maracujá Mid Pacote 20g	MID	Geral	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
49c1424c-d4c4-4e94-8ee9-504fa3f31b2e	7898126320859	Pasta de amendoim integral	Mandubim	Alimentos veganos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
327fa449-c66d-45f7-bd96-8c1814c029bf	7891000329207	BISC WAFER BONO LIMAO 110G NESTLE	Nestlé	Salgadinhos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
9923e180-2cf8-4bc6-8af6-32b179a2fa13	8691066237510	Heyo Biscoitos de Cacau com Creme de Baunilha	Cizmeci Time	Salgadinhos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
86133265-f037-4c84-94da-e9aad991de8a	7896003738582	biscoito marilan Leite 350g	Marilan	Salgadinhos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
6842e7cd-3b8c-4c7f-9b7b-3b03007558e1	7891021006309	Descafeinado Café Torrado e Moído com corpo equilibrado	Melitta	Alimentos veganos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
dcf2b423-5c88-43e6-b2f1-fb735ab86928	7891097103650	Iogurte Batido	Batavo	Geral	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
af95ec71-72e1-47cf-b4fc-cd0d5a42ccbf	7898917681015	Xarope guaracamp puro	Guaracamp	Geral	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
c203ad5b-ffa0-41c8-99c4-4974884c2fb4	7891000332221	Molico Zero Baunilha	Nestlé	Sobremesas lácteas	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
26c87ce0-6a45-4ffb-9790-d42bf19865c3	7891962058726	Toast torrada tradicional bauducco	Bauducco	Geral	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
24926ce0-16ef-436f-9cce-2bbf46dd5078	7896051164104	Leite 13g proteína	Itambé	Leites	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
de9d3d6b-84bd-4bec-b8bd-9746f6b0b1f5	7898386200083	Agua mineral	\N	Bebidas	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
7f77b82d-2496-4366-aefd-faf639e9a2d9	7898678661172	Futuro burger defumado	fazenda futuro	Alimentos veganos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
9b92c2be-1a95-4547-9da6-a7ce1c54ef0b	7892840225919	Stax sour cream and onion	\N	Geral	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
4b0d148b-0c92-4ceb-a1a4-dc75bf821316	7897763530508	Sorvete Napolitano	Paviloche	Congelados	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
565a3d20-c9af-4102-9576-bd45bcaebf3a	78910041	Hortelã	Garoto	Salgadinhos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
cc4493c7-d805-4f10-badc-6ae9b3fe0b05	7896336012830	Pacoquita	Santa Helena	Geral	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
42adda90-a05a-4bdd-b785-6016e1b5bd1f	7891143012585	Cream Cheese Tradicional Polenghi Pote 150g	POLENGHI	Queijos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
c5a1d542-e1f2-4d8c-9f69-f76c4f3702e8	7898905356161	Leite de Coco Tradicional	Copra	Bebidas	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
f80c62ac-0857-4667-9e55-de8590f02ef5	7894900093001	Fanta guarana	Fanta	Refrigerante	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
bde81909-64d2-4011-8d94-7877c8a82d11	7896064201148	MINI BUTTER COOKIRS	Santa Edwiges	Alimentos veganos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
9f3a04b0-f9d2-47c9-a4f0-72aa7a57d973	7891143001206	Queijo Processado - Sabor Cheddar Sandwich-In	POLENGHI	Queijos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
d4480666-12be-4f6c-ae6e-bf0737af827a	7892840808051	Gatorade uva zero	Gatorade	Bebidas	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
5152d0fc-51cf-4a88-9997-7a3e0d2a1279	7896653706726	Creme de avelã extra cacau	Flormel	Geral	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
bf2769d6-9e9d-4286-a4ea-6818cde6502e	78936171	Iogurte Grego Tradicional Nestlé Pote 90g	Nestlé	Sobremesas lácteas	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
21781c5d-1b53-410a-901a-00cdd0a6067c	7896001223479	Dark. Chocolate	Linea	Geral	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
b42e5c9b-585e-487c-b90a-b55928786026	7896024720207	Biscoito salgadinho queijinho	Piraquê	Geral	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
4171bf3b-44af-429e-8f28-3c6e2d4531db	7891098041630	Chá Preto Com Gás Limão Leão Lata 290ml	MATTE LEAO	Bebidas	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
595185d0-7ba9-4de9-a7c7-7644c16a93df	7892840818258	Ovinhos De Amendoim Elma Chips Pacote 65g	ELMA CHIPS	Alimentos veganos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
49ad8571-ffbe-4909-8704-5f16a3699741	7892999150117	Leite UHT SemiDesnatado Leco 1L	\N	Geral	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
0a328b01-c0e3-41d8-b328-68e4203d7f30	7896000596383	Chá de Hibisco sabor Romã e Goji Berry	Natural Tea	Bebidas	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
af8afc9c-dcbb-4953-a21e-0aebbaf1e7d2	7891098040848	Chá Preto Ice Tea Limão Leão Garrafa 450ml	leão	Bebidas	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
e49732c5-78c5-4185-8ebe-cfa5c84eb538	7896292341098	Milho	Predilecta	Alimentos veganos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
72779e16-654a-4a1d-b4ca-3b36ceb315e2	7897517209667	Grão de bico cozido	Fugini	Alimentos veganos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
401215ba-fe69-40ba-b9b6-a9978a8edc66	7898920041448	Creatine Monohidratada	Max Titanium	Dietary supplements	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
b4d6d946-6eb4-4497-86c2-6a283eae8450	7896051111528	leite Itambé semi desnatado 1L	Itambé	Geral	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
e0a28f30-f947-4a51-8bad-9d149dad6c71	7891962053240	Torrada Multigrãos	Bauducco	Torrada	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
b4d96d73-3d47-413f-82ac-6b31b8cd2c4d	7894900681017	Refrigerante Limão Sprite Lata 350ml	PORTINARI	Bebidas	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
3e2a3242-56b1-476c-9757-8ecf7ccc3d58	7896024760531	Crackers intégral	Piraques	Geral	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
ea155c21-a098-4def-be84-96ab9660ed77	7891098010568	matte Leão original	\N	Bebidas	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
0812de16-2136-4030-94a2-6de476610a1d	7896292313330	Passata di Pomodoro	Sacciali	Alimentos veganos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
653aed78-c708-4a52-8273-460c94c0d0c4	7896098900253	Detergente Ypê Clear	\N	Bebidas	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
d519505c-0e6c-479a-bf4a-8c4c41eb2f43	7896504306105	Queijo Ralado	CoopSantaClara	Queijos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
77c3de7a-282a-449b-b237-73533f1a4ce8	7896283800801	Jussara leite	Jussara	Leites	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
9dd4c986-7ef9-4504-aca1-2ce592734f32	7898080642899	Italac Pro Play Whey Banana 250ml 15g Zero Lactose	Italac PRO PLAY	Bebidas	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
84d5229a-d110-4e77-b0df-492c56dcdb2b	7891098041883	Chá Verde Limão Leão Reequilibra Garrafa 1,5l	GARRA	Bebidas	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
7729a6d4-5233-4434-9b2c-c476bb294862	7896045102396	café extraforte 3 Corações	\N	Geral	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
d006fd42-67a6-4281-89ab-b958c35bd29a	7891079012581	nissin	Nissin	Geral	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
e2823e6d-e2f4-4104-8721-b7f38c781a0f	7896005310878	água De Coco Padronizada Tial Caixa 1l	TIAL	Geral	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
969accac-1288-476e-b207-1f0f949ff20c	7897001050539	Alimento com Soja Purity Zero	Cocamar	Geral	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
88e4686a-a468-4fa6-9727-836598484643	7898571520514	Yogurte Natural Desnatado	Yorgus	Sobremesas lácteas	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
8fa6e529-81d3-4e51-b0aa-7bc377c091f7	7896002365963	Snack De Trigo Sabor Peito De Peru Com Requeijão	Crocantissimo	Geral	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
8ae951c1-4c95-483f-8bed-0aa789e1926f	7891962063874	BISNAGUINHA BAUDUCCO QUE	Bauducco	Alimentos veganos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
ffad8cb6-876f-4b74-aa61-abc228aeaa4a	78938823	Halls Mentol	Halls	Salgadinhos	open_food_facts	2026-06-03 13:52:41.976	2026-06-03 13:52:41.958
99689052-cc36-49ca-9b7b-45a577c4d350	7898939247022	Leitissimo integral	Leitíssimo	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
ae4efab2-493a-42c6-a259-da64e23a787b	7891149103102	Skol Pilsen	Skol	Bebidas	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
bb8371f5-68fd-4cd2-a609-93709d45ee5c	7891104393067	adoçante	adoçante	Sweeteners	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
a1b250cb-a763-481b-8c93-e8fdba2b5f60	7896434920778	Leite Condensado	Triângulo Mineiro	Dairies	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
b1c5242d-6072-4e4e-a19d-0e835702e522	7896183001896	Azeitona fatiada	Rivoli	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
ad5ade8a-b654-4f72-b02a-4e5750650634	7898215157465	Leite Zero Lactose Proteína	Molico	Leites	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
6a62d56b-ab44-4eb0-aeb8-7fb7c6c4e31f	7891991000833	Refrigerante Soda Limonada Antartica	SODA ANTARCTICA	Bebidas	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
3b2bed2b-afa2-4378-b995-aaa8ffcbeb47	7896051128441	Leite Pó Instantâneo Integral Zero Lactose Itambé Nolac Pacote 300g	Itambé	Leites	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
f0becfaa-04cd-4adb-9f31-a607e6195193	7891000369500	Cereal Matinal Snow Flakes Caixa 620g Embalagem Econômica	SNOW FLAKES	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
c02ff27d-235a-46e8-9de5-005f86226b60	7891025117131	Activia Triplo Zero Ameixa 170g	Danone	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
26f71e90-1b5a-4102-92d6-f29be6631c99	7898955617526	Queijo Mussarela Fatiado	Président	Queijos	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
5a094d1a-46d2-4293-84fd-33c3f1cf26c9	7892840815943	Doritos Original	Doritos	Salgadinhos	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
02d72bf0-6b07-4363-93f7-d39563854d47	7622210568823	Bolacha Salgada Sabor Cebola com Sour Cream	Club Social	Salgadinhos	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
7aefeae1-8c05-4c55-8715-0d699371fcea	7891025115595	Iogurte YoPro	YoPro	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
8371edcd-7833-4898-91f8-059b61c32d83	7896002310352	Pão na Chapa	Plusvita Artesano	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
81e3628c-3252-43cb-9fba-abe7eda6ae0f	7898923217017	Guaraviton Ginseng	Guaraviton	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
ad6f22a5-e1b3-4ba2-901f-c2606a5dc407	7891095031177	Batata Palha Extrafina Parmesão Yoki Sachê 100g	Yoki	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
cb541426-bdad-4956-b67f-a88f29709189	7898955705209	A tal da Castanha Oroginal	A tal da castanh	Leite vegetal	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
4fccf19a-35e9-4a49-b599-bfc328ce3136	7894900660302	Suco de Maracujá com Vitamina C	del Valle	Bebidas	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
7085951c-dbd4-44e2-b0fe-920cc45ab583	7891098041074	Ice tea limão light	Leão	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
a4f2f661-b9d4-43fa-8655-2108f7c35185	7898215157113	Almond Breeze Chocolate	Almond Breeze	Bebidas	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
6d05741f-6589-41b3-9d99-2909047c64ee	7896931614200	Suco de Maçã Integral	Campo Largo	Bebidas	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
69edc75e-8bbe-4389-bc55-66137ad3286f	7898994939726	bebida de aveia orgânica	Nude	Leite de aveia	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
6143e791-8b91-4f5a-a144-5357205e1234	7891000357972	BISC RECH FININHO NEGRESCO 57G NESTLE	NEGRESCO	Salgadinhos	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
1270f07e-7a5d-4029-9a14-5be926e4dde8	78936478	Refrigerante Laranja Fanta Garrafa 200ml	Fanta	Bebidas	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
1d896f40-5815-4deb-8a3c-cc87e418afb7	7891962054476	Cookies sabor chocolate	Bauducco	Salgadinhos	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
7ce7a5d8-ce9e-4ac6-8d25-42732a50bc98	7894900180503	schweppes	Coca-Cola	Bebidas	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
4b5d13d8-a156-41eb-b33e-421584901a0a	7898205924725	Iogurte Natural Whey Morango	Verde Campo	Sobremesas lácteas	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
36e1d949-1bc7-4fcd-b8a8-3fcb05d05ab7	7898556021012	Zero Whey	Sports Nutrition	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
7019c99a-7f2e-4fe8-9d46-c49d219f1343	7891097104503	Manteiga	President	Pastas e cremes	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
a994a684-cb8e-430b-a3a4-2545cebe82ea	7891168100014	tostine maisena	Nestlé	Salgadinhos	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
2aa89b96-97b6-45b6-b316-6f9a16eef7c8	7897163500187	Pãezinhos tipo Bisnaguinha	Farias	Alimentos veganos	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
c8ba2b40-9ab1-44f4-9843-574cfbc6249b	7896024760289	BISC LEITE MALTADO COBERTO 80G PIRAQUE	Piraque	Salgadinhos	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
3bfc8e40-8218-40ed-ab51-b503c0d44324	7896283002427	GranolaEspecial	Jasmine	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
245a6eae-931b-450d-a46f-deacf0ae5f71	7896003738612	Biscoito Cream Cracker Manteiga Marilan Pacote 350g	MARILAN	Salgadinhos	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
4aacc403-9bb7-470f-9fad-12e004b67720	7891331010560	Barra de Cereal Morango com Chocolate	NUTRY	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
e08733aa-e0a0-4e0f-9a41-37590e0f921c	7891331014537	Barra de cereal castanha-de-caju	NUTRY	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
1b65ccc2-c500-4271-85e1-d298dc59d0f5	7898919865192	Omega 3 - EPA DHA	Vitafor	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
b22589b3-bf38-4a3a-be83-37816ab0ab53	7891097000140	Iogurte Grego sabor Morango	Batavo	Sobremesas lácteas	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
8cabfae8-103b-4c3c-80c0-13379143a0c9	7896181704119	BANANA ZERO	Dacolonia	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
9d1142b5-8402-4f9d-b054-a3c09770d48e	7898205923940	Ioguete Desnatado Zero Lactose	Verde Campo	Sobremesas lácteas	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
ab21e08e-c88f-40ba-ab86-a43be19b0b5d	7896104866238	Banana Bar	Ritter	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
76a6c885-6cbe-43de-8703-148528dfdac6	7898692300323	Ultracoffee	PlantPower	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
112b7e98-332b-4fd6-b6ce-e16d3926f852	7896066303208	Wrap com proteína	Wickbold	Alimentos veganos	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
dd5c2fdf-6221-4108-af28-f83d0fc9a483	7892840816636	Salgadinho De Milho Onda Requeijão Elma Chips Cheetos Pacote 75g	ELMA CHIPS	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
be0c434a-bbb7-4694-a166-74ac5bd17f08	7891097000270	Iogurte Grego Tradicional Batavo Pote 100g	Batavo	Sobremesas lácteas	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
71da33e6-d23e-4a37-9064-f54d1867c581	7891095023257	Yokitos lua sabor queijo	Yoki	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
41d766e9-3a2d-4a91-970f-419d5d2b409d	7891340365422	Chocolate Branco	Spantooo	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
aeb239cf-9ccd-4771-92b2-4dc875e28273	7891025116592	Activia zero	Activia	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
6d85d7ef-3a5a-4f0b-ab82-57a317d6542b	7894904578566	Pizza de Lombo com Catupiry	Seara	Congelados	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
a6b7b7e4-712d-4a6a-a19a-86928c3e1702	7896066301419	Pão Do Forno Original	Wickbold	Alimentos veganos	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
cf295f47-95ea-4daf-89b8-91b52cfc8bae	7896022200732	Macarrão de sêmola	Galo	Alimentos veganos	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
a3239b37-dcbc-4224-be5c-ed417a9bb947	7896003738919	Biscoito amanteigado sabor coco	Marilan	Salgadinhos	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
6d2b6f53-07db-4873-b1c7-52f31bbfe373	8005121000931	Macarrão Italiano Capelli Dangelo Divella 500g	Divella Gaby	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
a327ce7c-3592-416f-b1f7-aa0b4459b7e5	0078976143007	French Rolls	Turano	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
bc9fcbad-b678-40ad-afcc-a5b6c28c3252	7896061300189	Biscoito Din Crackers Queijo Tucs Pacote 100g	TUCS	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
a19dbf5a-4aac-4084-ab6a-ede028d1921c	7896024760586	Snack De Batata Original Piraquê Pacote 60g	PIRAQUE	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
752b4f0d-1c70-4368-b1d7-fffffb3f768e	7892840817749	Amendoim Japonês Elma Chips Pacote 400g Embalagem Econômica	ELMA CHIPS	Alimentos veganos	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
6f52fb38-0abc-4080-8976-0595a353923e	7896058503791	Amendoim Crocante Cebola E Salsa Dori Pettiz Pacote 500g	PETTIZ	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
000bc039-f018-487b-8e37-533f8a0f1fbc	7891095002146	Amendoim Torrado Salgado Sem Casca Yoki Pacote 150g	Yoki	Alimentos veganos	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
0ed36f3a-33e0-4a60-ade1-8b4ad0466fee	7622300801786	Cream Cheese Light Philadelphia Pote 300g	PHILADELPHIA	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
ab2fbcab-9715-41b5-b16a-82d618aaaafa	7891031412022	Maionese Tradicional Hemmer Squeeze 290g	HEMMER	Condimentos	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
14ad9591-626c-4570-b1ed-d1d7ef89337f	7891048038383	Chá misto Frutas do Bosque	Dr. Oetker	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
05953e5b-60b7-41db-98ad-302dbb77defe	7891098041692	Chá preto, laranja, mel	Leão	Bebidas	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
cd973380-9b1c-4b20-9242-ede4629dbfea	7898130990055	Requeijão cremoso de búfala	Bom destino	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
6bc1e9a7-c989-452d-8c3f-0e51f2ecb9ab	7896275970857	Doce de leite	Frimesa	Pastas e cremes	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
c5532738-ca93-4ad7-9ceb-e04ef030dc20	7891962054506	Cookies	Bauducco	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
4882d2fa-622b-4902-88c4-dd9037776ec3	7896098900208	Lava-louças Ypê Neutro	Ypê	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
d7c0f8a2-38ba-48c4-bb1e-7a528281b116	7898058130403	Pão Integral Castanha do Pará e Quinoa	Delícias do Trigo	Alimentos veganos	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
f6f56367-cd61-465a-a2c3-66175af7305b	7896903813013	Crossaint	Padaria	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
8ce6c21c-b9d9-41b5-a053-383d19530ddf	07011696	Chá morango, manga	Twinings	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
5c8af837-e8c1-4a3a-8412-bcdd31b91e02	7898958161507	Iorgute Morango Vida Veg. 14g	Vida veg	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
0acef242-56ba-4c7a-a530-65339fb18f66	7898649351361	Tortilha Chips De Milho Com Sal Frontera Tex Mex Pacote 125g	FRONTERA	Salgadinhos	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
91a811bd-e309-4a4b-88b7-dfbb281ec928	7896000594198	Bebida Adoçada Morango Maguary Caixa 1l	MAGUARY	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
c48e814a-5aae-4a6d-8975-a326074ad1b7	7899916904839	Suco Uva E Maçã Natural One Ambiente Garrafa 900ml	Natural One	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
a9f13874-f02e-4a0c-890e-4f94dbcb1dc9	7891167012066	Atum Light	Gomes da Costa	Atum ao natural	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
26e969bf-c750-43e6-826a-2d68c4adc024	7896275970758	padrão	Frimesa	Queijos	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
71dc13c9-8af3-47d4-9a32-a3e2bae19f22	7898641070345	Whey DUX Chocolate	DUX NUTRITION	Dietary supplements	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
e301ab89-b61c-4800-aa7c-90dd0ab43c98	7896423402223	M&M crispy	Masterfoods	Salgadinhos	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
3e1a7c69-bae0-4e05-9844-eda9b5a77a65	7891000006689	Tempero Granulado 7 Vegetais Maggi Meu Segredo Caixa 49g 7 Unidades	Nestlé	Alimentos veganos	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
9b8a09e1-c51b-4e62-9ef5-a2ef35a76485	7892840820640	Batata Frita Rústica Cream Cheese Lays Pacote 68g	Lay's	Salgadinhos	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
6b0f31c6-92c2-4f9e-9a1f-7bea74827fe6	7891164028695	Bebida láctea fermentada morango	Aurora	Bebidas	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
35876f55-0c09-4b64-accb-926b6667aaef	7898073359100	Blend de azeite de oliva extra virgem	Lisboa	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
db9b2ff9-1853-400d-bb21-dffccee89072	7894900087000	Soja Juice Pinapple	ADES	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
5da1975d-6f5e-4d73-b5bb-894ab33b3f0f	7896051166382	Itambé Whey Baunilha	Itambé	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
e6131c82-d4cf-4db3-a18b-92dbc47327e2	7896625211036	Bebida Láctea UHT 250ml Vigor Doce de Leite	Vigor Viv	Bebidas	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
cbd1fe54-65c7-42e4-92eb-0aee151eb09c	7896253401472	Rosquinha Chocolate	RANCHEIRO	Salgadinhos	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
69dff767-7e8e-4403-881b-a71b7e8a6db0	7891151031141	FREEGELLS gum	FREEGELLS	Goma de mascar	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
ebe239d8-0d6d-4efd-981a-1d3dbee13b0b	7898994703853	Kefir D3snatado	Kefir	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
b8d560a8-0136-41c0-957a-0dd50076564a	7896034610017	Leite UHT Integral Parmalat 1 Litro	Parmalat	Bebidas	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
4e127018-e7d7-4637-a94b-bbd953622492	7892840813444	Pepsi black2	Pepsi	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
2c7d5920-4e4e-465d-9942-13ade05d4386	7896030519628	Creme de Queijo Ricota Original Light Tirolez	Tirolez	Queijos	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
e93f4be1-922f-4c45-8969-b60458ded659	7896496972005	Granola	mãe terra	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
e0feb484-4a23-4793-aab4-0a0947a4f8b4	7898641073230	Whey Dux Cookies	Dux	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
edae9ca0-4f25-443a-97c7-d75a788facc8	7891515484040	Presunto Cozido Fatiado	PERDIGAO	Meats and their products	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
90610ad9-56db-452d-bcdf-3163cc531f43	7894904268573	apresuntado fatiado	Pamplona	Meats and their products	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
0274496d-599c-4170-948a-b5aea0a31a5a	7891515742065	Salsicha Viena Perdigão 500g	PERDIX	Meats and their products	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
3289a92d-be81-4c0b-9371-d850ef2b38bb	7896114100902	Queijo Mussarela Fatiado	Ipanema	Queijos	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
5e186b22-0dfc-498e-b24d-d88ae7441ed0	7894904578146	Hambúrguer Rezende	Rezende	Geral	open_food_facts	2026-06-03 13:52:48.13	2026-06-03 13:52:48.113
309e6563-689a-4376-bee9-3085f4bdfe7b	7896336012250	Amendoim Salgado	Grelhaditos	Alimentos veganos	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
b39b3754-b6c3-4fdf-8904-dd8123e4269e	7896022200022	Macarrão De Sêmola De Trigo Grano Duro Fusilli Renata Superiore Pacote 500g	Renata	Alimentos veganos	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
99147ed9-e7f3-47d7-a338-0278ad4dd15e	7891000049891	Sopão Brazil	Maggi	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
3a3f71da-9905-4475-917b-ca568af8546b	7891143013919	Requeijão cremoso light	Polenghi	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
3fbfaed9-eb03-4d18-a7d7-9ef3216d044e	5601252110841	Clássico 100% Azeite de Oliva Extra Virgem	Galo	Alimentos veganos	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
21e9dc9c-d527-4c63-9af9-f3af39993b4b	7891008042023	Cacau em pó	Garoto	Cocoa and its products	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
2e43b29b-b528-4915-a7d1-b4a5b219afe1	7891515410315	Claybom Cremosa com Sal - Margarina 50% de Gordura	Perdigão	Alimentos veganos	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
14d13a3a-6df9-4d11-b6ef-c60edbde24bf	7898633330853	Panetone com gotas de chocolate	Romanato	Salgadinhos	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
be58b174-c70e-4ca5-878a-664529164640	7896038305193	Urbano Zero Glúten - Massa Alimentícia de Arroz	Urbano	Macarrao	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
65d1dc20-b6ce-4a54-b6bc-56efc98eb326	7896062602008	Feijão Carioca	Solito	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
015e23a4-4804-4261-a286-0d2134b7b354	7897517209650	Ervilha	Fugini	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
2c251520-9ab1-4cd1-a1ed-5eb51fcaf29f	7896283002434	Granola Zero Açúcar Superfrutas	Jasmine	Alimentos veganos	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
638f3436-5292-40d6-9fa4-772785009a3d	7898276600108	Feijão Caldo Nobre - Feijão Tradicional	Comércio de Cereais Good Ltda	Feijão	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
3a906ea4-24c0-4381-aa7d-472294baa873	7896353302068	Requeijão Cremoso Tradicional	Catupiry	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
27e1ab9d-53bc-4afc-b2f7-3968e3668e9a	7891097104350	Creme de ricota	President	Queijos	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
9b44c350-cd04-4a45-9a1e-4b214729141c	7896283002229	Proteína Texturizada de Soja PTS Media	Jasmine	Alimentos veganos	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
e0ce08ec-6bc4-491a-b93f-9bd9d07510ea	78906679	Requeijão cremoso	Ibiacão	Requeijao cremoso	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
68805dab-f323-4ed5-8111-0e4c8426af69	7892840820398	Batata Palha Extrafina Elma Chips Pacote 90g	ELMA CHIPS	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
48c858c8-7c8c-4d0e-9094-5a09e69ab714	7894900320015	Citrus schweppes 5% de suco	Coca cola	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
254bc6cc-264f-4142-b6cc-accf4b5f7e48	7896005223475	Salt Plus! Original	Águia	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
b8bdb162-9c59-4611-b527-3274cb76b828	7898205923858	Requeijão sem lactose	Verde Campo	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
a7306188-1acf-41c9-87ba-d573ab363e67	7898080642936	Aveia em flocos	Italac	Café da manhã	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
59ffec04-c0d3-4478-8439-5f3e526e913b	7896259410133	Leite em Pó Integral - Camponesa - 200g	Camponesa	Leites	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
fea5c092-d8a9-46ed-80d4-1cf943813122	0041224877238	Spicy Chili Onion Crisp	Roland	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
87ec854d-2d84-4017-b31f-c6f237ded9ad	7891515600624	Macarrão Com Bacon Carbonara Sadia Hot Bowls Pote 300g	Sadia	Alimentos veganos	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
2c769a99-17b9-4611-85fd-11ab345da64c	7896036000267	Molho De Tomate	Pomarola	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
31be16a9-99aa-44ac-aba5-3110e121fbce	7891962000725	Bolinho Baunilha Recheio Chocolate Bauducco Pacote 40g	Bauducco	Salgadinhos	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
0a91eca2-de6f-4bbc-a6c6-e5283bacd6e5	7898945133203	Leite uht integral	Damare	Leites	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
bf907784-2280-4c0f-bda3-3c45c0a8fa32	7894900550030	Del Valle Fruit Uva 1l	Del Valle	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
b85aaea1-8f65-4dd8-882c-c7c82c9bfcfb	7891095910984	Amendoin Crocante Sabor Molho de Pimenta	Yoki	Alimentos veganos	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
1ff6c435-c0fa-4e3b-a8c5-49384471f4e4	7891025123149	Manteiga extra com sal Danone 200 g	Danone	Pastas e cremes	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
5e9c7343-92e3-4860-8533-a2c607cc99a4	7897122601252	Carne Seca	Vapza	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
3e943e38-4768-4f80-992e-fa4191d6e957	7896333023136	Batata Palha Tradicional	Tutti Giorni	Alimentos veganos	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
e5a3e8b6-1dfc-4957-859f-d0abd8eb045e	7897318572816	Manteiga	Davaca	Pastas e cremes	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
413ca50f-c03c-4e98-9c28-fbd5657601cf	7896569405515	Leite integral	Lider	Leites	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
54fb3c23-d1f1-4879-b316-a928107f843c	7898080641328	Leite Integral Nilza 1L	Nilza	Leites	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
4d7516f4-7994-4e5a-9bb0-7a993c76021a	7891030003467	Creme de Leite Leve UHT	Mococa	Leites	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
f6d1ca12-66d8-43d3-a5f0-743fa54e6b80	7790199604372	Azeite de Oliva Extra Virgem	Morixe	Alimentos veganos	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
7731a004-7f4d-4849-8cfe-7ae3aa53a07c	7896085087172	Tortinhas Crostata Chocolate c/ creme de Avelã	Adria	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
586d59b7-9ff7-44d2-8a20-56a542908a48	7891025123040	Iogurte Grego Calda Flocos Danone Pote 90g	Danone	Sobremesas lácteas	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
1a8e060b-48b1-4826-9347-af6df148d052	7896931614941	Agua de coco integral	Campo largo	Bebidas	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
319a947e-ec2f-4671-a45a-9571ea732cda	7891000317396	Moça Zero Lactose	Nestlé	Dairies	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
8c7696ef-419e-4f82-9479-c9a218cc44e1	7896005281710	Pena Dona Benta Com Ovos	DONA BENTA	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
22f8d83b-2a37-480e-a1c3-4c5b0fdbbc06	7891141036170	Suco Integral Uva Tinto Aurora Caixa 1,5l	INTEGRAL	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
e05d5964-ac7d-421d-a108-815d705c5012	7802225427579	Rocklets Maní	Arcor	Alimentos veganos	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
f3d747db-168c-4a6d-934c-63e83293314d	78938793	Bala Cereja Halls Pacote 28g	HALLS	Alimentos veganos	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
f8cddd04-c992-44fb-ae3d-64ac3f9d0044	7891000368893	Chocolate Ao Leite Com Castanha De Caju Diplomata Classic Pacote 80g	DIPLOMATA	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
f485288a-5b81-455a-b76e-9be72f4ab87e	7891000369098	Chocolate Ao Leite Classic Pacote 90g	Nestlé	Salgadinhos	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
4fb7e3a8-b966-4d2c-abac-5ce5544bdb19	7896183910136	Aveia em flocos finos	Zaeli	Alimentos veganos	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
afcbfa88-d3c6-4ce0-9ef1-bda6af13e526	7898117960033	Cuscuz	Rei de ouro	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
32933f6e-48df-4656-9d61-8b1ac23a651e	8710624311773	Muesli met noten en zaden	Bio+	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
ef813399-7cef-4bd1-83ca-462d4d9e1852	7898965602147	Fruta pocket	Solo	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
561a7625-aba5-48a0-a5b8-e1d52340e310	7894900583700	Refresco Adoçado Morango Del Valle Kapo Caixa 200ml	DEL VALLE	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
ebcc194f-df73-4cb8-89f9-d434267d570b	7898403780062	Manteiga de primeira qualidade com sal	Betânia	Manteiga	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
f5b013cc-9b87-40d6-81ac-dcd35d242846	7898064011666	Bebida Láctea UHT sabor chocolate para dietas com restrição de lactose	Betânia	Bebida Láctea UHT	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
e757046a-97f1-4c3b-b332-a08de0922429	7894900180541	Cítrus	Schwepps	Bebidas	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
35cdbcab-35fa-43e8-a0e7-54b083228735	7891025101376	Danone Morango	Danone	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
0ca2d500-5f09-414b-993d-6cd437d757f6	7896181500834	Shoyu Light	Hinomoto	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
bfd5a264-8e94-460b-836e-d15fa234fbf2	7896181711971	Pacoquinha	Dacolônia	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
856a1ffb-4a10-46b5-9b7c-ae80b4fa1751	7898205924374	Queijo Tipo Cottage	Verde campo	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
2013442f-f4ac-4eb8-8cad-9ce63739e7c8	7896052604975	Refrigerante Tutti Frutti Itubaína Retrô Lata 350ml	ITUBAINA	Bebidas	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
5d9a3cc6-6844-4672-9a2a-a621f2ba81aa	7898686950459	Nota Milk chocolate	NotCo	Bebidas	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
c2991f17-0dee-4fdd-b9d1-7daeb0eeefa0	7891962058719	TOAST CEREALE MULTICEREAIS BAUDUCCO	Bauducco	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
6d348861-954d-4974-b8da-e2ba1453da4e	7896213006396	Biscoito Maizena Tradicional Vitarella Pacote 350g	Vitarella	Biscoito sem recheio	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
452cf9b6-242d-44fc-9bdc-20d27986e49d	7898215152453	Piracanjuba ótimo	\N	Latrocínio	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
997d254b-9483-4115-af93-4bb4a9361acd	7896002311335	Pao de forma artesanato australiano	Pullman	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
36a01938-7087-4030-a668-34533582c1f6	7891515555245	Margarina Original Com Sal Becel Pote 250g	BECEL	Pastas e cremes	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
bb036e51-436c-4089-ba51-efd6b912eb63	7894321242521	Bebida Láctea Uht Chocolate Toddynho Levinho Caixa 200ml	Toddynho Levinho	Leites	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
3e5e9a56-115d-4d80-a1d5-d9901008f3c1	7898215157458	Zero Lactose	Nestlé	Leites	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
3b93c88c-f4ff-41b4-9f1a-0fab981a3c03	7894904271535	Margarina Com Sal E Creme De Leite Delícia Pote 250g	Delícia	Alimentos veganos	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
b3a19e35-e2ac-49a4-a3f5-7c826bf108f2	7894904271573	Margarina sabor manteiga com sal	Seara	Alimentos veganos	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
a937107f-5695-4c8f-99a3-8236de012b70	7896122300516	Manteiga Porto Alegre	\N	Pastas e cremes	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
a7ead7b8-284c-49ba-85f8-6f5d9824bd6e	7790580116965	Gomitas sabor a Limón, Uva, Manzana y Frutilla	Arcor	Salgadinhos	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
153f15ca-ef52-4b69-93f1-331cfd434f29	7891097001581	Requeijão Cremoso Poços De Caldas Pote 400g	POCOS DE CALDAS	Requeijao cremoso	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
626dcf50-2e93-4da4-bda5-63d91c5199e4	7896051140405	Requeijão Cremoso Zero Lactose	Itambé	Queijos	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
e5e89e59-6d54-4289-88d0-884ae6caf747	7896051135111	Manteiga Extra Sem Sal Itambé 200g	TOP LINE	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
3a66ebc4-dae5-4c17-8bd5-11110aa08b75	7896331100143	Manteiga Extra Com Sal Aviação 200g	AVIACAO	Pastas e cremes	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
10b6fcc6-ff93-4a53-a5c0-9e87606b0ca9	7896122301308	Requeijão Cremoso	Porto Alegre	Requeijao cremoso	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
fbb8711d-88cc-485e-b729-3160cd032b2b	7896010400311	Creme de Ricota	Regina	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
8be6a699-22bc-4af0-8747-e68dc93d3201	7896051165958	Cream Cheese Tradicional	Itambé	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
0348eb35-3cd5-479e-aa43-7ad7710ea687	7896122302527	Zero Lactose Fatiado	Porto Alegre	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
ef375aca-0e03-4d8e-a3a2-d1d269f7a306	7891000103937	Queijo Petit Suisse Morango Chambinho Bandeja 320g 8 Unidades	Nestlé	Sobremesas lácteas	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
6e0eca36-5eac-4549-9fce-eaa59c148084	7891000360668	Iogurte Parcialmente Desnatado Morango Chambinho Recreio Squeeze 100g	CHAMBINHO	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
55a9f9ff-aba0-4a7f-8361-61f18ada5db8	7894904255818	Pizza Calabresa Rezende	Rezende	Congelados	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
9e65559c-a37f-439f-be69-eded88b29903	7893000671997	Pizza Lombo com Requeijão e Mussarela Sadia Caixa 460g	\N	Salgadinhos	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
d8513f93-5d56-4e04-90cb-922f2fd9cc44	9002490258825	Red Bull Summer 250ml	Red Bull	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
d72d94b5-21e1-47fa-bc33-32572b798bee	7896074600016	Pão de Queijo Congelado Super Lanche	Forno de Minas	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
1e8f8f59-72c6-4bc0-a8fd-a7273b968454	7899975800585	Sorvete Napolitano Flocos Tradicional	Nestlé	Congelados	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
73993cee-6e12-4cba-964d-7f425805ded8	7891000120507	Sorvete sabor creme	Nestlé	Congelados	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
c2a1d24a-9f35-4525-b1f7-c9a9aabb93c8	7891025123378	Iogurte Integral Grego Original Frutas Vermelhas Danone Bandeja 510g 6 Unidades	INTEGRAL	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
01a02b22-de1c-4175-a9d7-166c5178557f	7891025110668	Queijo Petit Suisse Morango Danoninho Para Levar Pouch 70g	DANONINHO	Geral	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
0372ff50-de09-4640-8c24-07d933523585	7891025124320	Leite Fermentado c/Fibras Danone	Activia	Leite fermentado	open_food_facts	2026-06-03 13:52:54.182	2026-06-03 13:52:54.164
008c2b26-8426-4c66-99d1-578f67f64e90	7896051164630	Pedaços Coco	Itambé	Sobremesas lácteas	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
1d2eac54-4214-4817-be7a-ee7720ecb7de	7896051165637	Grego Morango	Itambé	Sobremesas lácteas	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
9fb28246-0b4c-4c08-9318-d05f9fb5b880	7896051166122	Iogurte Flocos Itambé Pedaços Pote 450g	FLOC	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
9c929f2f-e476-4480-8578-c09e250d18d0	78912298	Sobremesa Láctea Flan Calda Frutas Vermelhas Batavo Bandeja 200g 2 Unidades	Batavo	Sobremesas lácteas	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
4bff3494-d011-496d-82b4-74ea819d7d98	7891097010828	Iogurte Integral Coco Batavo Pedaços Pote 500g	Batavo	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
73afcb9c-b22e-4810-a499-bb3e0d656706	7891000371251	Iorgute Ameixa, Aveia e Amaranto	Nesfit	Sobremesas lácteas	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
2a1888d4-4e75-4382-b9db-3264336ecb9d	7898962892343	Pasta de Amendoim Sabor Chocolate com Avelã	Power One	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
1093dfa1-d612-4a1e-b812-62cf36dc24ca	7894904575350	Hambúrguer De Carne Bovina Tradicional Seara Caixa 672g 12 Unidades	Seara	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
c2b5a920-aac0-430e-afee-6da5a6ba1b20	7891515546519	Batata Pré Frita Palito Congelada Sadia Pacote 400g	Sadia	Alimentos veganos	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
a50b2948-eac6-4661-bfa9-89f8e0d744ed	7896105800897	Batata Pré Frita Smiles Congelada	MCCAIN	Alimentos veganos	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
c8de31b3-6b06-40f4-b238-ca148ed76a18	7896105801092	Batata McCain Airfryer Extra Crocante	Mccain	Alimentos veganos	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
1e9bfd08-1c28-4e0b-b838-fbe3a1548efd	7896639800653	Torrada de Arroz Integral	Okoshi	Brown Rice Toast	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
57d3b8ff-570f-4288-86e9-60f07a2743d4	7893000437029	Coração de Frango Congelado	Sadia	Carnes	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
75ac0188-6291-4740-a0f8-b4092dca742e	7893000482401	Filé De Peito De Frango Congelado Sadia 1kg	SADIA INTERNATIONAL	Congelados	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
effe3f60-e803-4d3f-abcc-acbcdef158ad	7898920195226	Nutri Nectar Maracujá	Nutri Nectar	Bebidas	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
eb2d2cc8-a64a-40c8-925b-c9a848402727	7891097101892	Iogurte Pense Zero Morango	Batavo	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
56efd1ea-b1f3-4c5c-bf31-be3d40c946e6	7896229800261	Iogurte Desnatado Natural Fazenda Bela Vista Copo 170g	FAZENDA BELA VISTA	Iogurte	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
c7ae6ff3-f553-453b-9b33-8150d74a5308	7896051128076	Zero Lactose Desnatado	Itambé	Leites	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
e9094831-b0d9-4784-be90-f63b7930c6b5	7898958161514	Iogurte Vegetal Pasta De Amendoim Vida Veg Protein Frasco 250g	VIDA VEG	Sobremesas lácteas	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
2f96c1af-b473-4e1a-a1d4-741f342f7c83	7891097000799	Iogurte Integral Cremoso Natural Batavo Pote 500g	Batavo	Sobremesas lácteas	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
27e34739-489a-4834-b395-e5d611e2941f	7898205924909	queijo mussarela fatiado	Lacfree	Queijos	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
ae4acdec-5ed2-4fc6-9c39-579859d4e6a1	7891151036993	Freegells Gum Tutti-Futti	Riclan	Goma de mascar	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
282d86d0-3227-42f8-8b03-d7ac19b855ba	7622210696595	Maracujá	Clight	Alimentos veganos	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
26c514a2-ce8d-4bc9-8a2f-e1525c4f0da3	7891150072824	Caldo Tablete Galinha Knorr Zero Sal Caixa 48g 6 Unidades	Knorr	Broths	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
1324dd69-c8b6-4f6f-963a-eac61dfe19e1	7908109125583	Hambúrguer Carne Bovina	BestBeef	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
46e46edd-93cc-487c-9b12-07fb42494855	7899970402401	Chocolate Com Pedaços De Café Espresso Hersheys Coffee Creations Pacote 85g	HERSHEYS	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
80c91b92-c182-4c09-9d99-fa194c9d7356	1220000250222	Ultra Watermelon	Monster Energy	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
2e735376-5caf-4f2d-86d3-c102377cba31	9556023211622	Sour Cream & Onion	Jacker	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
fa06f0d3-f07b-42c0-a90b-f87b1ed4bde9	7898599217212	Proto wafer morango	Nutrata	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
75364890-653e-41c1-93ae-97915eec4ce6	7896066301396	Pão Sem Glúten	Wickbold	Alimentos veganos	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
d44238e4-b732-4c0b-aca3-2bfc42ce287b	0750894671267	Yummi Nuts mix de almendras, marañón, maní y pasas	Yummies	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
18ce608d-d25d-4597-ab04-dba09ba9c6ea	7891962003894	Biscoito Recheio Goiabinha Bauducco Barrinha Pacote 30g	Bauducco	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
a4ba1af9-2d66-4470-a523-cbfbb5df0267	0609963170968	Caldo de frango	Davozzi	Broths	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
b6d3b3d8-5a72-4db7-8486-71d33873a400	7891515520656	Margarina Sem Sal Qualy Vita Pote 500g	QUALY	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
595ebf87-a958-4c70-ab18-73e70c867bbd	7898905153982	Bonare Ketchup Original	Bonare	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
5575f73d-d444-4dc2-9604-b3df2f02a371	7896436102769	Refrigerante de Guaraná com Bergamota	Fruki	Refrigerantes	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
b2bb76bb-f089-42e5-904b-fe4dd02c0d4f	7891000097649	Fórmula Infantil Para Lactentes Nanlac Comfor Lata 800g	Nestlé	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
b935f72e-cbd1-40b7-b97f-52ccf4dd0ec9	78907478	Talento Castanhas do Pará	Garoto	Salgadinhos	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
1ac87117-f400-40c9-bfa2-9e3d7240704b	78912908	Refrigerante Coca Cola Garrafa 250ml	COCA-COLA	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
59753846-1468-4c33-9c24-313b55cafb89	78922327	Goma De Mascar Menta Fresca Zero Açúcar Mentos Pure Fresh Pote 56g 28 Unidades	MENTOS	Salgadinhos	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
e8f468c5-fd35-4749-a81a-e340aea6554b	7891000310199	Caldo Pó Legumes Maggi Caixa 35g 5 Unidades	Maggi	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
63044676-8e99-4a2c-a309-7f37239ccffd	7891000340073	Tempero Granulado Tomate E Ervas Maggi Meu Segredo Caixa 49g 7 Unidades	Maggi	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
4d28a141-569a-43e8-bd53-e70509f8da16	7891000360583	Iogurte Grego Tradicional	Nestlé	Sobremesas lácteas	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
b47c3f1c-2931-4bc1-b934-98cdb4e94b92	7891025121909	Iogurte Parcialmente Desnatado Coco Danone Garrafa 1,25kg Embalagem Supereconômica	Danone	Iogurte	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
d2cdaaef-25ca-4922-9b74-469bd0371ab9	7891025123361	Iogurte Integral Grego Original Danone Bandeja 340g 4 Unidades	Danone	Sobremesas lácteas	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
8344562c-c256-48b5-9e80-48b221e6f9be	7891097087448	Pack Leite Fermentado Desnatado Bob Esponja Elegê Caixa 480g 6 Unidades	ELEGE	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
b407aef5-82bb-47f3-a386-39e96789822a	7891098041937	Chá Morango Maracujá Leãozinho Caixa 23g 10 Unidades	chá leãozinho	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
a25ef61c-60b5-49ee-ad8a-23ff980e6edf	7891132110186	Caldo Pó Bacon Defumado Sazón Caixa 32,5g 5 Unidades	SAZÓN	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
7e5657b5-dd05-476b-a7bf-bfd71fe5e18b	7891150012318	Caldo Tablete Carne Knorr Mais Sabor Caixa 57g 6 Unidades	Knorr	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
b7baf359-e8ae-4915-a8c6-b466d1ed7bb8	7891203055262	Bolinho Baunilha Recheio Chocolate Panco Bebezinho Pacote 70g 2 Unidades	PANCO	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
f878354d-be48-4e6a-ad0e-62fb650f018b	7892840817466	Batata Palha Extrafina Elma Chips Pacote 205g Embalagem Econômica	ELMA CHIPS	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
c12b997f-b06b-4a69-ac0e-a8b6069b5b83	7892840817435	Batata Tubo Ruffles Orig 134g Pepsico	Ruffles	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
39f273af-2268-4c71-a619-13fb33582db2	7892840818234	Batata Palha Tradicional	ELMA CHIPS	Alimentos veganos	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
1b9bcb65-eff6-452b-86c3-1180b7b015e9	7892840818623	Biscoito Cookie Original Toddy Pacote 133g Embalagem Econômica	ORIGINAL	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
0dabc49d-8139-44bc-90ba-17dd22bd9e7e	7894321220529	Achocolatado Pó Original Toddy	TODDY	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
c9c14e2f-3b53-41d2-9ff6-f2a1542322d2	7894904072439	Lasanha Presunto E Queijo 600g Seara	Seara	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
c2b4d6f2-fdb1-4528-8859-0d08dfb23fd7	7894904271481	Margarina Com Sal Cremosy Pote 1kg Embalagem Econômica	CREMOSY	Alimentos veganos	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
36d4260c-812f-43e2-bcc4-2bab43d73f26	7895800309780	Goma De Mascar Melancia Zero Açúcar Trident Envelope 8g 5 Unidades	TRIDENT	Salgadinhos	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
3787e392-11f4-46ce-8249-1112e6bef581	7896001210110	Adoçante Em Pó Stevia Linea Caixa 30g 50 Unidades	LINEA	Sweeteners	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
8b0122b0-c224-4384-81cd-d68b30cea01b	7896024760449	Pack Biscoito Original Piraquê Pacote 138g 6 Unidades	PIRAQUE	Salgadinhos	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
68f0dc91-502e-4f3f-84ca-c089b315593f	3045320518733	Geleia Damasco Bonne Maman Vidro 370g	Bonne Maman	Alimentos veganos	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
b9da6d8c-568f-4996-8331-9b83e00ef3fa	3083681080803	Milho Verde Em Conserva Tradicional Bonduelle Lata 170g	BONDUELLE	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
f36f5843-2479-4ac9-b636-422c4489fa89	3083681080926	Ervilha Em Conserva Tradicional Bonduelle Lata 170g	BONDUELLE	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
c1a14990-680a-4be2-8d30-b79bf620a7f6	3415583272282	Sorvete Dulce De Leche Häagen Dazs Pote 100ml	HAAGEN DAZS	Congelados	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
dd46cdc4-03d7-430b-a315-c4da514238cf	6194017200172	Azeite De Oliva Extra Virgem Tunisiano Rahma Vidro 500ml	Rahma	Alimentos veganos	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
ac70cfa3-f6e8-4aae-80aa-3b5438bf79a7	7622210561909	Bala Morango Azedinha Patinhas Bubbaloo Pacote 82,5g	MONDELEZ	Alimentos veganos	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
b7432ade-91a9-492f-8410-9ce058052390	7622210570376	Goma De Mascar Melancia Mint Zero Açúcar Trident X Senses Pote 54g 28 Unidades	TRIDENT	Alimentos veganos	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
a92a2be0-a91e-4fd5-b8dd-3521c44c7525	7622210571540	suco limão	MONDELEZ	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
1b86d1e0-1302-41db-b52d-3fd216ffac2a	7622210573483	Goma De Mascar Blueberry Zero Açúcar	TRIDENT	Salgadinhos	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
5a4e2710-4bf0-4e68-b83f-d151ee932267	7622210574695	Snack Assado Crocante Queijo Parmesão Club Social Pacote 68g	CLUB SOCIAL	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
69acf35e-a80a-488b-b162-0d91b4bf983d	7622210575630	Choc Lacta Laka Diamante Negro Pacote 80g	DIAMANTE NEGRO	Salgadinhos	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
b171cd4d-cc3a-4d88-82e2-bf2fee59b02f	7622210674050	Chocolate Ao Leite Lacta Diamante Negro Pacote 80g	Lacta	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
610f55d5-051f-42be-8183-9bc14f1a3b85	7622210674395	Chocolate Ao Leite Com Amendoim Lacta Shot Pacote 80g	MONDELEZ	Salgadinhos	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
9d6eda2d-f2d1-4add-af75-3cce8a9396b7	7622210696632	Refresco Em Pó Laranja Zero Açúcar Clight Pacote 8g	CLIGHT	Refresco em pó	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
e6fe022a-cb33-406a-8f3d-2a3dc6f58a77	7622210754714	Biscoito Cookie Chocolate Com Gotas De Laka Lacta Pacote 80g	LACTA	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
0fac0e02-c7aa-40f8-a7eb-926fa0e0fa7b	7622210794765	Pack Biscoito Original Batman Oreo Pacote 270g 3 Unidades Leve Mais Pague Menos	OREO	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
7dfb8bcc-85fd-4086-88a1-6003c716250a	7622210956002	Bala Cereja Halls Pacote 84g 3 Unidades Leve Mais Pague Menos	HALLS	Desg	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
9d187344-6c43-45b0-9eaf-bc39469de1d0	7622210956200	Bala Mentol Extra Forte Halls Pacote 82,5g 3 Unidades Leve Mais Pague Menos	HALLS	Alimentos veganos	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
7beb8a80-3168-44ef-9db7-0dcdfba4e76e	7622300873509	Pack Biscoito Chocolate Recheio Chocolate Oreo Pacote 144g 4 Unidades	OREO	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
fd0d0162-3b91-45b2-acf1-2f2ef5113c54	7804633010091	Azeite De Oliva Extra Virgem Chileno Deleyda Premium Vidro 500ml	DELEYDA	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
4b2be2ba-2cf3-4a09-b810-4afd042cd005	7891000071625	Fórmula Infantil Para Lactentes	Nestlé	Alimentos infantis	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
f3a3a27b-f854-4a5d-9a05-612516b1418f	7891000086131	Cereal Infantil Multicereais Mucilon Pacote 600g Embalagem Econômica	Nestlé	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
a4102e1a-bd05-4ef0-9882-6f85e9ac22ad	7891000096482	Composto Lácteo Sem Sabor Nutren Senior Lata 370g	Nestlé	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
364f34f2-b9d8-40c1-87f3-f9d66153441a	7891000120071	Sorvete Napolitano Tradicional	Nestlé	Congelados	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
0685fb6f-fd4a-40e8-9839-2498d24a8e96	7891000259429	Bebida Láctea Uht Farinha Láctea Nestlé Caixa 200ml	LUXCEL	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
f9cc936a-b9a8-4c38-89ce-81736307bfc1	7891000277249	Ovo De Páscoa Ao Leite	Kit Kat	Salgadinhos	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
77b57e17-b898-45f0-baba-efbdf7917526	7891000304792	Biscoito Integral Coco Nesfit Pacote 160g	Nestlé	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
dd646e80-c6df-40cb-8be9-50a78c9661b2	7891000304839	NESFIT banana	Nestlé	Salgadinhos	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
2139f710-565b-492f-b767-3496cab94cb5	7891000319505	Cereal Infantil Multicereais Mucilon Pacote 180g	MUCILON	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
f8c9771b-4fe3-484b-9979-79fe0821d21d	7891000319581	Cereal Infantil Milho Mucilon Pacote 180g	MUCILON	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
c4ffd8b6-4ede-49be-bcc9-2ed4f572ad55	7891000320242	Biscoito Integral Milho Mucilon Meu Primeiro Lanchinho Pacote 35g	MUCILON	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
fb23428a-a4a3-4035-80cd-f30f44330d76	7891000321652	Chocolate Branco Galak Pacote 25g	GALAK	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
47fcf0ae-0663-44f4-97ad-814cc582c37a	7891000338087	Achocolatado em pó Nescau 550g Refil	Nestlé	Beverages and beverages preparations	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
eb3f0e40-98fa-4f6d-9e92-9a1a8b2c0165	7891000347942	nesquik	Nestlé	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
427abccf-64b8-4483-b86b-b471d202c610	7891000367506	Cereal Matinal Nescau Pacote 30g	Nescau	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
8247a221-5fc0-454d-b042-a810eaaac4a6	7891000368992	Chocolate Ao Leite E Branco Duo Classic Pacote 90g	Nestlé	Salgadinhos	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
116722b9-0ad1-400e-a91f-f407525fa330	7891000376843	Biscoito Recheio Chocolate Bono Pacote 90g	BONO	Salgadinhos	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
10fc0e9b-8faf-4b8a-b69b-0e6970f6db44	7891000376959	Biscoito Recheio Morango Bono Pacote 90g	MORANGO	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
f87aec7e-0c08-4154-a33b-fe140ed0b98c	7891018001386	Café Torrado E Moído Tradicional Café Brasileiro Pacote 500g	CAFE BRASILEIRO	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
d9f56748-2153-4e45-a8b4-b256037bf44f	7891008124071	Chocolate Ao Leite Garoto Crocante Pacote 80g	CROCANTE	Geral	open_food_facts	2026-06-03 13:55:04.273	2026-06-03 13:55:04.235
9cedc1d1-100c-4ce8-8390-5870ed5dd3d9	7891008124828	Chocolate Ao Leite Caju E Passas Garoto Pacote 80g	GAROTO	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
c4ac04ea-4269-4668-995d-040ea330d7a6	7891008351026	Chocolate meio amargo	GAROTO	Salgadinhos	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
a6ebfdb7-7087-42ad-9949-498bd7efe026	7891021007078	Cappuccino Solúvel Tradicional Melitta Lata 200g	MELITTA	Alimentos veganos	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
ba115aec-fcfc-4fae-b274-0e0f77667bf4	7891025107910	Leite Em Po Aptamil 800g 3 Danone	Danone	Formula láctea	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
c4585e10-48e9-43f7-b2e0-18d1ae8cb737	7891048014004	Granulado Oetker Tradicional	Dr. Oetker	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
1e484f43-0b7f-4d31-a7e0-07171a39a492	7891031406014	Mostarda Escura Holandesa Hemmer Squeeze 200g	HEMMER	Condimentos	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
c08c443b-70e5-4af1-8e7f-afe85a6e9ad7	7891048036020	Chá De Camomila Com 15 Sachês Dr.oetker 15g	Dr. Oetker	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
1a1c87f0-ed5f-4c96-a782-25654c87dfbc	7891048036044	Chá De Capim Cidreira Com 15 Sachês Dr.oetker 15g	Dr. Oetker	Bebidas	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
ebc93cfe-7592-4da6-8ebd-6b8a8fb50158	7891048044513	Pudim Dr.oetker Baunilha Diet	Dr. Oetker	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
9e6704ce-d69a-464c-90dd-8cb38ff8b915	7891048048948	Abacaxi Dr. Oetker	Dr. Oetker	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
4ebcec26-38b5-4c75-9663-b461c14505ef	7891048050057	Gelatina Em Pó Sem Sabor Incolor Dr. Oetker 24g	Dr. Oetker	Cooking helpers	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
d977e6e5-6b92-4b83-96fc-1b6aea51509f	7891048050606	Gelatina Dr.oetker Abacaxi 20g	Dr. Oetker	Cooking helpers	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
2bb20607-5c55-4f0b-a067-4cf2b3e44023	7891048050637	Gealtina De Frambroesa 20g	Dr. Oetker	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
671ed794-1d4c-4771-bd82-6c8e2a1cf85d	7891048050675	Gelatina Dr.oetker Tutti Frutti 20g	Dr. Oetker	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
a9fcaa3c-ba5b-4b5b-99f5-6c090f99982c	7891048061688	Mist Bolo Oetker Baunilha	Dr. Oetker	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
45ed70ac-7fe3-4c9e-920e-41eb40bd7f86	7891079000311	Macarrão Instantâneo Lámen Carne Com Tomate Nissin Miojo Pacote 85g	AJINOMOTO	Alimentos veganos	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
be6b5763-f241-4c12-af5e-ed44234f51bf	7891079001004	Macarrão Instantâneo Lámen Carne Suave Turma Da Mônica Nissin Miojo Pacote 85g	NISSIN	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
9df0973e-85d0-4f44-adb3-881291ec93a1	7891098040909	Chá Preto Ice Tea Pêssego Leão Garrafa 1,5l	LEAO	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
54be82fa-46ff-4e55-ba0c-3d65ccc39bb8	7891079011775	Macarrão Instantâneo Lámen Picanha Nissin Miojo Pacote 85g	AJINOMOTO	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
c93db43f-0f21-4ea0-b094-ff5077a0dc9e	7891079012963	Macarrão Instantâneo Lámen Costela Nissin Miojo Pacote 85g	NISSIN	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
0c8e3f18-b019-485a-ab70-5f0fd199dba6	7891095002498	Glicose Yoki Squeeze 350g	Yoki	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
be7bdf12-8f52-46e2-9721-4cb14f8c5231	7891095015047	Amido De Milho Yoki Caixa 200g	MAIS VITA	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
4b029f09-f749-41ed-87cf-76deff4097b8	7891095015344	Amendoim Torrado Salgado Sem Casca Yoki Pacote 500g	Yoki	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
ba14d79e-bd5d-4bdb-9f38-8eadc05dac3d	7891095023134	Batata Frita Ondulada Com Sal Yoki Yokitos Pacote 45g	Yoki	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
e9eaf21f-e8fa-478b-8e7a-413e86fe7aba	7891095150137	Molho De Pimenta Kitano Frasco 150ml	KITANO	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
e37fbc15-0276-4485-bb6e-c5fccd462b5f	7891095154012	Pimenta Do Reino Preta Moída Kitano Pacote 50g	KITANO	Temperos Naturais	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
2391def9-5812-4ae9-9570-dc61ab2ac0cc	7891095154074	Canela Pó Kitano Pacote 50g	Yoki	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
7af0df22-635b-4de9-b131-971ba371d7a7	7891095154104	Colorífico Pó Kitano	Kitano	Alimentos veganos	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
b8106571-c0cf-4898-bd64-4d81320169a1	7891095604753	Bicarbonato De Sódio Kitano Pouch 80g	Yoki	Food additives	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
d279e5e0-21ea-436a-b236-73a286bdad1b	7891095910939	Lentilha Tipo 2	Yoki	Alimentos veganos	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
fd66ee86-121e-4af1-a3e9-c30686495002	7891097001260	Iogurte Desnatado Morango Zero Lactose Batavo Pense Zero Pedaços Pote 500g	Batavo	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
a1c98bad-ddea-46d9-a868-a0acb4f9e814	7891097015519	Manteiga Sem Sal Batavo 200g	Batavo	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
06793de9-bef8-4c45-86ef-457409b4e7e8	7891097100994	Queijo Ralado Le 4 Queijos Président Pacote 100g	PRESIDENT	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
7e939840-09cf-4109-868b-757f0b31b4cf	7891097102387	Queijo cremoso	Président	Queijos	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
687dce1c-e6d1-4a32-b49b-dbed4484bef8	7891097104060	Molho 4 Queijos Président Caixa 200g	PRESIDENT	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
159df947-3579-4201-a74c-bc8979f147ea	7891097104329	Bebida Láctea Uht Baunilha Zero Lactose Parmalat Wheyfit Caixa 250ml	parmalat FIT	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
648bd8ac-334f-4dea-b64f-c9394390f091	7891098001511	Chá Morango Chá Leão Caixa 20g 10 Unidades	MATTE LEAO	Bebidas	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
8d49c612-c4eb-4c1b-bd00-a246a020b130	7891098040572	Chá Mate Original Matte Leão Zero Garrafa 1,5l	MATTE LEAO	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
eeebb04d-7223-41c5-a671-3125bbb92f70	7891098041913	Chá Verde Limão Leão Garrafa 450ml	GARRA	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
ca57a97e-b8e3-4526-81d5-41ddca7c8939	7891107111927	óleo De Canola Tipo 1 Salada Garrafa 900ml	SALADA	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
0075a4da-7ddf-4a7b-ac7d-e728c5ec6051	7891132000999	Refresco Em Pó Laranja Zero Açúcar Mid Pacote 10g	AJINOMOTO	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
f25b9630-2df2-4bce-9a00-c78d1cbae8e8	7891141036194	Suco Integral Uva Tinto Aurora Caixa 1,5l	INTEGRAL	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
d91d482c-1547-4ae2-9d02-03b1206e8881	7891149108282	sukita	SUKITA	Bebidas	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
d54b9e42-4ce0-4af6-9095-e87121f68a95	7891150050242	Sorvete Flocos Kibon Cremosíssimo Pote 1,5L (700g peso líquido)	Kibon	Congelados	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
d8d9de30-6d46-4186-986d-0ea18701f112	7891150058897	Ervilha Em Conserva Knorr Lata 170g	Knorr	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
172ff420-f7d4-4d9c-b6fa-0abbc659b395	7891150087194	Sorvete Morango Com Chantilly Unicórnio Kibon Pote 800ml	MORANGO	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
222484f1-a023-459a-867f-b5fc10fb17bb	7891156076086	Bebida à Base De Soja Uva Yakult Tonyu Caixa 5,4l 27 Unidades	YAKULT	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
8fe0e9a8-4e0b-4647-8384-45fff63a9418	7891164005832	Linguiça Calabresa	AURORA	Meats and their products	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
e411caed-b509-428e-99d6-5dd1dc3f8b31	7891167012059	Atum Sólido Em óleo Gomes Da Costa Baixo Teor De Sódio Caixa 120g	GOMES DA COSTA	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
1ad03d85-1f80-4603-a4a4-aa6d28417367	7891167021082	Sardinha Com Ervas Gomes Da Costa Lata 84g	GOMES DA COSTA	Peixes	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
880fd07c-03cd-4328-ab51-62fb6d50da1a	7891167023017	Sardinha Com óleo 88 Lata 84g	88	Peixes	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
983b3303-cf80-4eb3-85d2-febbd98c1ba3	7895144207759	Bala Sortida Fruit Tella Pacote 92g	FRUITTELLA	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
d155735b-df8a-4fad-9276-f4dead5ba582	7897277703092	Iogurte Desnatado Zero Lactose Ati Latte Copo 170g	ATI LATTE	Sobremesas lácteas	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
d1de57c4-e5d7-4d62-bcd9-39efdd60501e	7896216100527	Ravióli 4 Queijos Mezzani Bandeja 400g	MEZZANI	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
cb5439f4-ad62-45a6-bfcd-ca18c1c459b1	7896036099742	Maionese Tradicional Liza Pote 450g	LIZA	Condimentos	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
0074658e-1154-42a7-9bc1-7f0bdd2d8a59	7896005310366	Suco Manga E Maçã Tial 100 Caixa 1l	TIAL	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
30e7ea44-631b-43ea-8a0a-337e4f581e8e	7896102582949	Maionese Heinz Pote 400g	Heinz	Condimentos	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
d57feaf6-e9c7-4929-8dbb-b2fbea4e76a5	7896185313058	Bebida Láctea Uht Chocolate Shefa Shefinha Caixa 150ml	SHEFA	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
67ecec59-234f-45a0-87ba-db2d2cf9e279	7898276522332	Petit Gâteau Congelado Chocolate Mr. Bey Sobremesas Premium Caixa 240g 4 Unidades	MR. BEY	Salgadinhos	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
cc77459c-501c-448a-a4d7-0423ce05bc00	7891962067629	Biscoito Cookie Chocolate Com Gotas Cobertura Chocolate Branco Bauducco Maxi Pacote 96g	Bauducco	Salgadinhos	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
bee2389a-781d-41ed-9ea8-ec90af375854	7896066304960	Mini Panettone Com Gotas De Chocolate Turma Da Mônica Wickbold Caixa 80g	SEVEN BOYS	Salgadinhos	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
fee152e1-d763-4725-8d9f-7816ab9020fe	7896292322912	Bananada Predilecta Lata 600g	PREDILECTA	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
00e3cbe6-450a-4aa5-97a9-273e2762a1c9	7896066307497	Minibrownie Chocolate Meio Amargo Wickbold Do Forno Pacote 30g	WICKBOLD	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
bd2ab865-db61-4dbd-9c61-70b6f90a8819	7896557200030	Produto Cremoso Requeijão Vale Do Pardo Cremille Copo 200g	VALE DO PARDO	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
4674129b-b51f-4770-a249-75a12e06acfd	7896209256507	Sorvete Chocolate Choc Chip La Basque Premium Ice Cream Pote 500ml	LA BASQUE	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
cb9e0949-3942-4939-8c0c-ebad71a3e9f4	7898340610675	Biscoito Amanteigado Rosquinha 2 Castanhas Brasileiras Empório Do Cerrado Pacote 250g	EMPORIO DO CERRADO	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
8c3cea68-5c5a-4738-9e58-0af5c83fe299	7896216100176	Talharim	MEZZANI	Alimentos veganos	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
5acd40c8-352c-46ca-9923-18cadb807fb3	8001250152091	Macarrão De Sêmola De Trigo Grano Duro Capelli D’angelo 209 De Cecco Pacote 500g	De Cecco	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
d2304ad8-75f9-4792-95c5-7e7123dad97c	7896775102505	Pasta De Amendoim Integral Zero Lactose Guimarães Pote 1,005kg	AMENDOIM	Amendoim torrado	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
76fe6e2b-4fa2-4af3-98e3-a86a1442e6ad	7896058599435	Pastilha De Chocolate Ao Leite Dori Disqueti Sachê 120g	DISQUETI	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
5bd1fef6-2214-4ffc-8ee4-88df4611d074	7892840812737	H2oh Citrus 500	H2OH	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
46c479e5-30e0-4db7-a92a-1484421b1de2	7896336002732	Pack Doce De Amendoim Paçoquita Pacote 176g 8 Unidades	SANTA HELENA	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
b08804c9-1793-4303-b121-5902ac017dda	7896623100196	Leite Pasteurizado Tipo A Semidesnatado	XANDO	Leites	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
be783b92-8cfd-4f2e-91ef-a7b8768ab7a3	7896000530325	Néctar Misto Uva Maguary Caixa 1l	NIELY	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
ceb3521e-c04a-4ddd-a790-c3fe47679f88	7897951610623	Manteiga Extra Com Sal Serramar Pote 200g	SERRAMAR	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
50703f99-f6d9-454e-a085-520502bc0347	7894900027037	Refrigerante Coca Cola Original Garrafa 3l Embalagem Econômica	COCA-COLA	Bebidas	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
6073a2f5-b3ee-4687-9622-c1a38a7209fe	7896030519635	TIROLEZ MANTEIGA C/Sal	TIROLEZ	Pastas e cremes	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
542b7b9b-a92d-4cb5-98d6-937be21bf862	7896490290730	Refresco Em Pó Uva Frisco Pacote 25g	FRISCO	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
780cf845-bd77-47ac-8743-6fd2ef7a09c1	7891203059345	Bolo Mesclado Chocoboy Panco Pacote 300g	PANCO	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
94e0a87f-58f6-45e9-8370-c86043529258	7896058599497	Amendoim Crocante Pimenta Vermelha	Dori	Alimentos veganos	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
8f3aad16-51f4-4565-a71c-f7e3367b3893	7898051681001	Açúcar Demerara Orgânico Itajá Pacote 1kg	ITAJA	Alimentos Básicos	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
715c8a03-c565-4dcc-b400-bcd2e24fab99	7896030519659	Manteiga De Primeira Qualidade Sem Sal Tirolez Pote 200g	TIROLEZ	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
b23619f9-895e-4fc5-a1c5-41c42f5223f6	7896213006266	Biscoito Cream Cracker Integral Vitarella Pacote 367,5g	VITARELLA	Salgadinhos	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
0c999117-61f7-4b4c-b33c-8f788843c0f5	7896102584998	Maionese Quero Pote 495g	QUERO	Condimentos	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
9135824a-92a9-4261-a827-7beb7dea5893	7896885500130	Bananinha Sem Adição De Açúcar Paraibuna 200g	PARAIBUNA BANANINHA	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
81e0c726-c88e-4e75-8402-b140d20be479	7896002303286	Pão Integral Grãos E Castanhas Pullman Pacote 450g	PULLMAN	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
39610130-64b6-4e58-8544-61750d89a1bf	7891203059482	Bolo De Milho Panco 300g	PANCO	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
d115ae6d-3d10-4ca7-9b67-2977f6fb939f	7898080662668	Energético Baly Garrafa 2l	BALY	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
367fd6c0-d21a-439c-a063-0782c6189d83	7898192039907	Chá Branco Pitaya Feel Good Caixa 1l	FEELGOOD	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
2c23f034-5e4c-405a-94a3-cdb49f2f742b	7896005286579	Espaguete Dona Benta Sêmola	Dona Benta	Alimentos veganos	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
164217bb-308a-4b5d-8fb5-04c1c64a84f3	7896002302197	Pão De Forma Original Pullman Artesano Pacote 500g	Pullman Artesano	Alimentos veganos	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
6c765d95-76e4-47d7-a03c-2b3693a1ea0c	7896205788040	Macarrão De Sêmola Com Ovos Espaguete 8 Adria Pacote 500g	SYMBOL	Alimentos veganos	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
9c7c4a02-1995-4065-b2c6-ffd1ba836991	7891962050089	Biscoito Chocolate Recheio Brigadeiro Bauducco Recheadinho Pacote 104g	Bauducco	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
5d9f887a-bbe0-4dfc-8ed3-e91641b5677d	7896623100714	Suco Integral Laranja Xandô Garrafa 1,5l	INTEGRAL	Bebidas	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
676e3c7d-900f-43cb-9725-1c8e0cbebd15	7896272000830	Azeitona Verde Em Conserva Sem Caroço Vale Fértil Vidro 160g	VALE FERTIL	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
a57cd8f9-5de4-4049-af24-bc496fcaa4c8	7896058599817	PETTIZ	PETTIZ	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
0d7c9510-b424-4e27-96eb-df3d9d01c598	7896348300840	Cappuccino Solúvel Chocolate Com Avelã Melitta Lata 200g	MELITTA	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
3dd66f66-944e-4282-8fc2-4cf883db480f	7896205788033	Macarrão De Sêmola Com Ovos Espaguetinho 9 Adria Pacote 500g	ADRIA	Macarrão	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
3605031a-9c64-4900-b5d3-c6ca55f756fa	7896216100534	Capeletti Carne Mezzani Bandeja 400g	MEZZANI	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
a183c1e5-6377-4a54-bd1a-780e150b8543	7896283006159	Granola Cranberries E Açaí Jasmine Especial Pouch 250g	JASMINE	Geral	open_food_facts	2026-06-03 13:55:10.165	2026-06-03 13:55:10.145
cb356a06-1cef-4f74-8cae-0d6c2b596602	7896183202125	Queijo Cottage Quatá Pote 250g	QUATA	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
ce595112-9548-4664-b41c-ee188ce4823c	7894900660432	Néctar Uva Del Valle Caixa 200ml	DEL VALLE	Bebidas	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
0c65dfc3-d38f-48cc-8226-339e6b711d32	7891193012054	Pão Milho Seven Boys Casa De Vó Pacote 500g	SEVEN BOYS	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
7588aef7-098d-481c-941d-d4f8098d1c50	7896496972326	zooreta pizza	mãe terra	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
7692c3fe-2602-451a-a2be-ee084530b135	7891193049203	Bolinho Laranja Seven Boys Pacote 30g	SEVEN BOYS	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
c272fb37-721c-4d6e-b2dd-1ebd8fe5ba38	7896005804513	Cappuccino Solúvel Classic 3 Corações Sachê 100g	3 CORACOES	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
1d91cb06-2b87-45b6-ab97-2e2d23b09428	7896004400730	Coco Ralado úmido Adoçado Mais Coco Pacote 100g	Mais Coco	Coco seco	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
ad78b790-894d-4f69-8f1b-59eba3dcb867	7898635640202	Sal De Parrilla Para Churrasco Br Spices Frasco 330g	BR SPICES	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
bc8e421f-a9fa-43bf-b6de-265fc8b5c293	7896036096437	óleo Composto De Soja E Oliva Tradicional Maria Garrafa 500ml	CARGILL BRASIL	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
f5a462ef-2a5f-4976-90c1-61096e451379	7894900660425	Néctar Pêssego Del Valle Caixa 200ml	DEL VALLE	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
61c17fc9-141d-4ca7-8934-91f5d9e80455	7898943163066	Atum Ralado Ao Natural Robinson Crusoe Lata 120g	ROBINSON CRUSOE	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
84f368f1-3b3d-4e70-b7de-a8d3156d5165	7896036090879	Molho Para Salada Caseiro Liza Squeeze 234ml	LIZA	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
9cb6d3ed-9c84-4202-8630-519eb6340f5d	7891962018553	Panettone Com Gotas De Chocolate Tommy Caixa 400g	Bauducco	Salgadinhos	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
3cb6f9ec-6cc8-45fa-bed2-78ca2290e56b	7891962027401	Panettone Tradicional Visconti Caixa	Visconti	Salgadinhos	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
2e6de143-d9f0-4026-9b04-2913cc9f5c55	7891515892401	Linguiça Paio Defumada Perdigão 370g	PERDIX	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
063373ab-ad2d-4611-b829-09c1f4c663e4	7898651400569	Chá Verde Jabuticaba Zero Açúcar Yaí Caixa 1l	YAÍ	Bebidas	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
c59d2e42-18de-42da-82c6-e74850c8e7cd	7893000290174	Copa Fatiada Sadia Speciale 100g	Sadia	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
13ffd6a9-da52-4ede-91fb-d189e073a97e	7898341430074	Néctar Maracujá Del Valle Caixa 1l	DEL VALLE	Bebidas	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
aba75a60-be49-47c1-9f48-8048407bac4b	7891203021120	Biscoito Wind	PANCO	Salgadinhos	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
b304f609-fa95-43c2-a0a8-56a118604a6b	7896283006142	Pão de Forma Fatiado Tradicional Sem Glúten	Jasmine	Alimentos veganos	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
8e709793-287d-4206-a92d-587057c29834	7893500019206	Arroz Carnaroli Tio João Variedades Mundiais Cozinha Italiana Especial Para Risoto 1kg	TIO JOAO	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
c038317e-c606-4036-a279-e661315c8122	7899970402821	Chocolate Ao Leite Extracremoso Hersheys Pacote 82g	HERSHEYS	Salgadinhos	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
e23e87ca-faee-4b61-8cff-68476c0597b6	7895000292028	Agua De Coco Taeq Tetrapak 200ml	TAEQ	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
9c6b65a6-0f9d-4aa1-90b6-c50a7b44c036	7896066305622	Pão Integral Sem Casca Wickbold Pacote 450g	WICKBOLD	Alimentos veganos	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
27033bfc-83be-42e8-aa17-e2494ff31fb5	7896005800027	Tradicional	3 Corações	Alimentos veganos	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
deabb20d-5995-4235-b1ae-fdf1b8e37ce2	7892840817459	Batata Ruffles Stax Sour Cream Cebola	Ruffles	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
b29bff96-df9c-4d35-8990-21fc39ee6aa0	7896229800544	Leite Pasteurizado Homogeneizado Tipo A Semidesnatado Zero Lactose Fazenda Bela Vista Garrafa 1l	FAZENDA BELA VISTA	Leites	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
3808b4af-385a-4406-98a0-24828ff4be94	7896007830763	óleo De Gergelim Torrado Kenko Frasco 100ml	KENKO	Óleo	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
b4890418-ab05-4a65-ae91-527a79bea715	7896229800841	Suco Integral Laranja Fazenda Bela Vista Garrafa 1,5l	FAZENDA BELA VISTA	Bebidas	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
458807b5-b6b5-4fa6-bff8-6756b2ad0d2f	7896094915046	Adoçante Líquido Stevia Zero Cal Caixa 80ml	STEVIA	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
ee2f3b5e-637a-442a-8de0-c57c163b36da	7896051164708	Iogurte Integral Itambé Natural Milk Copo 170g	Itambé	Sobremesas lácteas	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
d4256402-cc8a-4980-b95c-f1eb58b79f69	7897701101715	Chips De Batatas Doces Fhom Raízes Pacote 45g	FHOM	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
c050c1f6-5ff7-4d03-aee9-4246fb50e54f	7896001215009	Geleia Amora Linea Vidro 230g	LINEA	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
0b293b7b-406c-438f-b408-58211c03b291	7896292360976	Geleia Framboesa Predilecta Vidro 230g	PREDILECTA	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
7de27586-e50d-406d-a9bd-fb57b70e4da4	7898080664389	Baly Energy Drink Melancia Garrafa 2L	Baly Energy Drink	Bebidas	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
74f03d5a-aa71-4fcd-b2e0-16dfe0291740	7896052607129	Refrigerante Laranja Pera Fys Lata 350ml	FYS	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
736e3ec0-07b8-42c7-b22d-ce3a02d86857	7892840819910	Salgadinho White Cheddar Popcorners Pacote 85g	POPCORNERS	Salgadinho	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
1c49b351-6b1c-44f4-9d4b-7f2df7000d77	7896102501995	Extrato de Tomate Extrato⁺	Quero	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
a2a0788e-9a4f-4208-b8a9-435eefd92b40	7896653702827	Pack Doce De Leite Flormel Caixa 60g 3 Unidades	FLORMEL	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
cd0ecb9c-637f-46d7-b69c-6a1d58ffacfd	7896063284821	Doce De Leite Vitao Vidro 200g	VITAO	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
2380c648-c584-4c4b-98da-73358a190d3d	7898171340635	Suspiro Biscoitone Caseiro 100g	BISCOITONE	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
8a8e55bd-b238-4e70-904d-9486c4a3a349	7896085086496	Biscoito Recheio Chocolate Ao Leite Adria Mousse Pacote 130g	ADRIA	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
4a890ad4-fc6b-4bf4-bb37-6f7429434e10	7896036098806	Molho De Tomate Passata Pomarola Chef Vidro 700g	POMAROLA	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
d08729aa-2eab-4e6c-8bfe-d20df94b5210	7896283005268	Linhaça Dourada Em Grãos Integral Jasmine Pouch 150g	JASMINE	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
258ec939-437b-475a-9e00-735cc510b90b	7896030520181	Queijo Mussarela Fatiado Light	Tirolez	Queijos	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
5118df53-f93f-4ce3-a49f-ecdebdee81f8	7894900612059	Suco Maçã Del Valle Caixa 200ml	DEL VALLE	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
674fb40b-08f7-4d8d-9815-691e9214ec04	7898954360102	Suco Uva Turma Da Mônica Life Mix Caixa 200ml	LUMINUS LIFE	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
24bc5e4f-22e0-4899-a7d0-44941ccc2b73	7896036095126	Molho De Tomate Bolonhesa Pomarola Sabores Sachê 300g	POMAROLA	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
61248b56-22a2-48b0-80a3-be74d426043d	7891991015929	água Tônica Antarctica Lata 269ml	TONICA ANTARCTICA	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
56315063-3299-4cbe-8d37-0ea66c2a374e	7896196080444	Tomate Pelado La Pastina Lata 400g	LA PASTINA	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
ac6c0605-653b-421d-bead-4e3f9e1e9c8f	7896496917501	Biscoito Cracker Integral Orgânico Multigrãos Mãe Terra Pacote 130g	mãe terra	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
c910294c-7a9d-4a96-8665-a5f8d8e2873b	7898409951848	Achocolatado Flocos Crocantes Ovomaltine Pacote 190g	Ovomaltine	Bebidas	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
58244dc2-7e96-401c-aab0-097ca7c07af9	7894900660364	Néctar Abacaxi Del Valle Caixa 1l	DEL VALLE	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
96b18c31-9065-4009-b6b8-adf2c4ecf45d	7896356800035	Arroz Polido Tipo 1 Pilecco Nobre Pacote 1kg	PILECCO NOBRE	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
014e7f83-1f73-43a0-9587-e7ec068db407	7896623100318	Leite Pasteurizado Tipo A Semidesnatado Zero Lactose Xandô Garrafa 1l	Xandô	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
22e92392-e3df-489a-8b89-be84f91cb5de	7896002362054	Bolo Baunilha Recheio E Cobertura Chocolate Ana Maria Pacote 42g	ANA MARIA	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
4a3bf9b0-3b8b-48cb-a5f5-92dac547e112	7898911931116	Bebida Adoçada Cranberry Juxx Funcionais Caixa 1l	JUXX	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
554149b6-3101-4a0c-be77-a020d6fe2e87	7897122600149	Mandioca Cozida No Vapor Vapza Caixa 500g 2 Unidades	VAPZA	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
5a58bc40-979b-4c9a-ac01-4f91ef85e4d5	7892840268046	Snack De Trigo Tomate Temperado Eqlibri Panetini Pacote 40g	EQLIBRI	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
fb5ca407-c900-4080-9c7e-8542ba617025	7891193020363	Bolo Chocolate Seven Boys Pacote 250g	SEVEN BOYS	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
7708ad56-7447-41a3-bc0e-7a9b2f663872	7896931614194	Suco Integral Maçã Campo Largo Garrafa 900ml	CAMPO LARGO	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
71e5dc6b-79f5-4c16-9142-bf72311be9c2	7896931613678	Suco Integral Uva Tinto Campo Largo Caixa 200ml	J P CHENET	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
2dae7d96-7c75-4401-97fa-ad541b9be47b	7891203010506	Pão Sovado Panco Pacote 500g	PANCO	Alimentos veganos	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
fa209d74-8de9-488a-8dd1-1b3d4125e4fd	7891962068022	Biscoito Bauducco Chocolate	Bauducco	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
25e8f73e-8a42-4d1b-9506-8269290fd802	7894900650013	Refresco Adoçado Maçã Del Valle Kapo Caixa 200ml	DEL VALLE	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
962a3f7a-e31a-4478-adc6-e1359b9d12d1	7896089011982	Café Torrado E Moído Tradicional Pilão Pacote 250g	PILAO	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
ea0eb27d-58bf-4fed-b2f7-49d726a5f7c7	7897721410002	Espaguete Petybon N 8	PETYBON	Massas	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
79bd9fc9-2a58-4e7a-871d-205b581638c0	7896024760654	Biscoito Wafer Recheio Morango Piraquê Pacote 100g	PIRAQUE	Salgadinhos	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
b8dcdc7e-20ea-4f95-b937-60be7c2f9558	7896001210141	GELEIA DAMASCO 230G LINEA	LINEA	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
ba6cdd9a-ad0d-4479-87b6-6d2613e21ec8	7896594971283	Sorbet Com Granola Açaí Frooty Pote 200ml	FROOTY	Alimentos veganos	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
6e28576e-19bb-4862-aefe-5a8325e021c6	7896085076183	Biscoito Plugados Recheado sabor Chocolate Suíço Adria Plugados Pacote 130g	ADRIA	Salgadinhos	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
2104756c-bcef-4c00-afec-96a1f70668f0	7896496972340	zooreta cebola	mãe terra	Salgadinho	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
1084d3c3-a002-41ac-b0db-8f68839ccfdb	7896048200105	Vinagre De Maçã Pet Castelo 750ml	CASTELO	Condimentos	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
da43d539-bac0-49f1-81c2-f832c5b21529	7896025804081	Molho De Pimenta Sweet Chilli	SABORES CEPÊRA	Condimentos	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
19101098-f5f9-44b5-ad69-58603cc09ddd	7896292315112	Geleia Morango Predilecta Squeeze 210g	PREDILECTA	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
35d36029-0c36-4400-ba25-8deae1a309f4	7899970402883	Chocolate Ao Leite Com Amendoim	Hershey's	Salgadinhos	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
4852d042-cdc2-4323-8657-49c8be5ae263	7896071024822	Biscoito Chocolate Recheio Baunilha Toddy Pacote 100g	TODDY	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
a851d3d2-ce73-43e6-8d06-8361cd6af9ef	7896007800896	Molho Para Yakissoba Sakura Garrafa 500ml	SAKURA	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
5338bf51-1b23-424f-ae52-ff6e3b9d574b	7896001260665	Gelatina Pó Abacaxi Zero Açúcar Linea Caixa 10g	LINEA	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
4b45cafa-0de0-420f-8fd1-9ed076d64860	7891962035451	Biscoito Champanhe	Bauducco	Salgadinhos	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
a07b769f-f8f7-4288-a28b-5cc592189c7c	7896002362436	Bolo Baunilha Recheio Chocolate Ana Maria Pacote 70g	ANA MARIA	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
563c59fb-7c42-4e88-a529-b18f7c8a7992	7896002301633	Pão De Forma Sem Casca Tradicional Pullman Pacote 450g	PULLMAN	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
eb4d21c6-7c49-4e6a-ac24-9d4aa8a9b88f	7896625211081	Iogurte Grego Flocos Vigor Loucos Por Flocos Pote 90g	VIGOR	Sobremesas lácteas	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
9ebe760b-ba9a-4eee-8fad-b87520fb2f75	7896038350056	Farinha De Arroz Urbano 1kg	URBANO	Alimentos veganos	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
99ec8c03-0112-4c66-8574-d5e129b60e46	7891203010308	Pão Caseiro Coco Panco Pacote 350g	PANCO	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
dac4d840-97b4-4bd5-a210-e463ae2d5811	7896005310243	Suco Maçã Tial 100 Caixa 1l	TIAL	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
935ce474-de78-47c3-ab54-c60f9bc6b726	7891991000819	soda limonada zero açúcar	SODA ANTARCTICA	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
1a6ab2f3-0009-43e2-9a4e-0b391b67cc60	7898924049372	Manteiga Reliquia 500g C/ Sal	RELÍQUIA DA CANASTRA	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
fa17e5cd-7b5b-40ac-b8d2-a6e083bb003f	7896058505962	Bala Iogurte De Morango Dori Yogurte100 Original Pacote 100g	DORI	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
97e9325d-e981-4f70-987e-571332396754	7896001215245	Geleia Goiaba Linea Vidro 230g	LINEA	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
9fe845c6-4017-463c-b9a4-63d3fb5f2ea3	7898921567336	Batata Pré Frita Tradicional Congelada Bem Brasil Pacote 1,05kg	BEM BRASIL	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
841f77cf-754d-4238-baa3-b7376d46e40c	7894900611014	Suco Uva Del Valle Caixa 1l	DEL VALLE	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
1f18b9b2-404a-4795-905a-c1a263b4897d	7896229800780	Suco Uva Fazenda Bela Vista Garrafa 900ml	FAZENDA BELA VISTA	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
ea27b792-e1da-42f5-b383-e9971c8e8533	7891991298407	Cerveja Zero álcool Budweiser Lata 350ml	BUDWEISER	Bebidas	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
68c8e422-4851-4c61-ba02-349872c452a3	7896036095102	Molho De Tomate Tradicional Pomarola Caixa 520g	PANOAH SELF ADHESIVE FABRIC	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
c26f13e4-1182-43bc-b083-b02976b14c99	7891515485528	Empanado De Frango Tradicional Perdigão Mini Chicken Pacote 275g	PERDIGAO	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
23984a21-428c-4fae-baba-3e7b630f9441	7898568901036	Chia Em Grãos Orgânica Vitalin Pouch 120g	VITALIN	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
bfdb91bc-a5be-4430-a16f-701d3ab27028	7896401100097	Feijão Preto S. Máximo Tipo 1 1kg	MAXIMO	Alimentos veganos	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
40379ed0-3927-4eae-ae3f-515d59796148	7898366933130	Vinagre de fruta - Palmeiron	\N	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
cba5f1e9-3a37-4672-90b7-cd9089f0af5b	7891132000012	Ajinomoto - tempeiro caseiro	Ajinomoto	Geral	open_food_facts	2026-06-03 13:55:16.303	2026-06-03 13:55:16.281
12c55ef9-28b9-4a8d-91ab-2018e383cf9e	7891091061284	pippos queijo cheddar	\N	Queijos	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
fecbef66-f8b0-4252-8474-e3080c39ce3f	78916234	Chiclete Poosh Recheado Sabor Framboesa	7Belo	Chiclete	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
4ea01f05-fbdb-47bd-a0cf-3fc6c1e84962	7896079502544	Manteiga Extra Sem Sal	Elegê	Pastas e cremes	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
aa51bc26-638a-4e2d-ae22-94eb2b7123f2	7701001912769	Granola Nibs And Cacao	Taeq	Alimentos veganos	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
580ec36a-85a5-4259-999b-4e7fa38a5594	7898253581000	pão integral	linear	Linear pao integral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
3a667890-d303-4eda-9bf9-61f63d3dd090	7898938890045	Pipeline Punch Juice	Monster Energy	Bebidas	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
357de271-d87b-42c4-b9c7-3baaae12362b	7891098000415	Chá Preto Chá Leão Caixa 16g 10 Unidades	MATTE LEAO	Bebidas	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
ad71715e-44ac-4331-bd2f-fcec7931366d	7622210548535	Ovo De Páscoa Sonho De Valsa Lacta 357g	LACTA	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
7ef5a7ea-b9ac-4340-ae2a-0322897a199b	7622210661852	Biscoito Integral Cacau Cereais Belvita Caixa 75g 3 Unidades	belVita	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
177308af-2cb9-48f1-8c20-9ba4b65f1844	7891000582107	Sopão Carne Com Legumes Maggi Sachê 200g	Nestlé	Meals	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
8e318d54-e9e2-4fae-81dd-3a9323a4d4f6	7891097000126	Iogurte integral com preparado de abacaxi	Batavo	Bebidas	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
e99ebd44-8eda-44cb-bc96-395467363e8d	7891150079908	MAIONESE CHIPOTLE SQUEEZE HELLMANNS	Hellmann's	Condimentos	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
7aae0420-56e6-4969-8880-b8aaa5d9a58a	7898930142784	Milho Verde Em Conserva Salsaretti Lata 170g	SALSARETTI	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
9cc989e1-b2a7-4e73-8293-de4e1d015147	7891000377765	Achocolatado Pó 30 Cacau Nescau Lata 180g	NESCAU	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
d3d5bbb0-fd8d-4f0c-a677-dfb2df37700b	7896051166566	Iogurte Desnatado Morango Zero Lactose Itambé Fit Garrafa 1,15kg Embalagem Econômica	Itambé	Sobremesas lácteas	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
e95c280c-ef1c-40a6-bcad-d322294a5368	7891000912645	Bebida à Base De Café Frappé Nescafé Dolce Gusto Caixa 135g 10 Unidades	NESCAFÉ DOLCE GUSTO	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
795d379a-c430-46db-a8f9-d257b4f69a34	7891150089181	Biscoito Maizena Vegano Integral Cobertura Cacau Mãe Terra Choco Pacote 58g	mãe terra	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
09c77645-7315-4798-91e7-1ac16811b0ed	7896085087141	Biscoito Recheio Chocolate Branco E Geleia De Maçã Com Canela Adria Tortinhas Crostata Pacote 80g	ADRIA	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
444083ba-f6af-4aff-9a94-476f654c4146	7891097104237	Cream Cheese Light Président Pote 270g	President	Queijo cremoso	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
9d5f5fc9-6d9e-4262-82fd-647fcf8298e5	7898686950565	Creme de Leite Vegetal	Notco	Creme de leite vegetal	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
6c494cc6-40e7-472a-aa7f-c1a81d1f9e4f	7896005218013	Gelatina Pó Abacaxi Sol Pacote 25g	SOL	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
287e9f1e-0af5-4e75-b583-ce5697d64bd2	7896001282414	Pack Adoçante Líquido Stevia Linea Caixa 120ml 2 Unidades Grátis 50 De Desconto Na 2 Unidade	LINEA	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
b80bf311-f0d8-4e6a-8569-4647afd85c6f	7896000597847	Suco Uva Maguary Fruit Shoot Caixa 150ml	FRUIT SHOOT	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
63b25677-2c54-4b53-9fe8-bb583dc56250	7896000597878	Suco Maçã Maguary Fruit Shoot Caixa 150ml	FRUIT SHOOT	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
c80a106f-0403-41a8-90db-ea964501370a	7898686950312	Bebida Vegetal Chocolate Not Milkinho Caixa 200ml	NOTCO	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
4fd557fc-9a39-49ae-a2cb-9d364c9580d9	7896005216927	Mistura Para Bolo Chocolate Com Avelã Dona Benta Sachê 450g	DONA BENTA	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
957e0ba2-364a-4526-af46-171f421bf9f6	7898279790776	Bala Minhoca De Brilho Fini Pacote	FINI	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
4c39624e-574e-4e37-ba9e-7a6ce3596663	7898921567121	Batata Pré Frita Palito Congelada Bem Brasil Mais Batata Pacote 2kg	BEM BRASIL	Batata	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
54cee656-9bf0-4376-a1a5-1111f5e4eef5	7896196060361	Arroz Negro Tipo 1 Integral La Pastina Caixa 500g	LA PASTINA	Mercearias.	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
c3c95244-4ede-4cd7-84c4-46608f4bd13e	7893753603467	Filezinho Sassami De Frango Resfriado Sem Osso Korin Sustentável Livre De Transgênicos 600g	KORIN	Meals	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
9ae78687-797c-43ae-974b-67469e0d2594	7896237901080	Cogumelo Champignon Em Conserva Inteiro Raiola Vidro 200g	RAIOLA	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
4b6fab34-1a5a-407e-9440-12d30f84ecb3	7896045110629	Power Whey sabor Biscoito	3 corações	Dairies	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
0f8a04ba-2837-42ce-8853-684175511f35	7896002305013	Bisnaguito	Plusvita	Alimentos veganos	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
a1a96512-0958-4e19-a03a-64c2b3a4bec9	7896311708314	Creatina	Integral Medica	Dietary supplements	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
5702748b-9f65-4ccc-88ff-d83c50bc3179	7891000370643	Aveia flocos finos	Nestlé	Alimentos veganos	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
1a6baf24-5a19-409a-8c71-670ef0df02ab	7896181711827	Amendo Power Crunchy	DaColônia	Alimentos veganos	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
dac6310b-f302-49fd-bafa-b60be9232647	7899567236815	Sassami empanadp	Swift	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
39b2c39f-a50d-4965-b260-11c05f39a449	7891095911561	Farinha de mandioca temperada	Yoki	Alimentos veganos	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
b86367d7-0ed6-44fa-b630-70ef38286e33	7895800304211	Trident Hortelã (sem açúcar)	Trident	Salgadinhos	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
131dad4e-715a-4cdb-9813-5c5d6e1c7b18	7896058258691	Ågua e Sal Aymore	\N	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
5e82d902-3132-41cd-9451-18f1fbee4b46	7896213005924	Treloso sabor Chocolate	Vitarela	Salgadinhos	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
95bd354e-519a-4038-bda1-4ca5c4552a4f	7804622380198	azeite de Oliva	O-LIVEAndCo	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
cdca2a47-2fdd-40be-ab1b-6e0da5896f2c	7891000299791	Especialidades	Nestlé	Salgadinhos	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
2e01b3dd-cb4c-4804-8bbf-b21b72716288	7899801811136	Tâmara com caroço	Desert Queen	Alimentos veganos	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
36d36101-8f1e-4aa7-910a-d70ce59e9081	7891203069771	Pão De Forma - Vida Zero	Panco	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
641c5c11-09df-4b6d-8eae-206102657dd6	7896461300451	Salgadinho de trigo sabor churrasco	Cegonha	Salgadinhos	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
f0511116-1b53-4239-ab10-9e8217081ea9	7897115106696	AMENDOIM DOCE PRALINE 60G AMENDUPA	\N	Alimentos veganos	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
1e1423f9-579f-447d-adbf-b9098f7ffc56	7896024761439	BISC LEITE MALTADO ORIGINAL 132G PIRAQUE	Piraque	Salgadinhos	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
8a0cc0e4-170f-4fa1-abd5-51d3ae68a9f6	7896003737417	BISC RECH TEENS BAUNY 80G MARILAN	Marilan	Salgadinhos	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
46a39d0c-caf0-4363-b77a-bd2b57bc18a3	7896058257670	BISC TORTINI TRUFA TRIUNFO 90G	Arcor	Alimentos veganos	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
1210e7b0-43d6-4d52-a3e5-70a583e46bde	7896058257182	BISC RECH TORTUGUITA CHOCOLATE 86G ARCOR	\N	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
0bbb0879-e015-4660-8c43-ff59829382a4	7898958804022	Tapioca	Tupã	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
a9b07639-4e38-45e8-a39e-b9641097a268	7898934907402	Flocos De Milho Para Cuscuz	Mano Velho	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
9e8d1e6a-91d7-440a-bc10-3f112905762c	7897047000628	Pacoquita	Rio	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
bbd2ed87-f6ce-4655-bcf4-33c87b1533b4	7891000381625	CHOCOCOOKIES RECH AVELA	Nestlé	Salgadinhos	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
19b19e1e-d3c5-4503-8e07-30a3fe2744da	7898965398194	Whey Protein	Shark Pro	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
b9729d82-1e09-41f5-8625-e16796d0e680	7896232800456	Grão de bico	Geriba	Alimentos veganos	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
fbad5456-5f19-4868-999a-f3d01c1d9dbb	7896232801798	Ervilha seca partida	Geriba	Alimentos veganos	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
fe1f524f-10f4-4b01-b439-966912038a8c	7804668080113	ENERGY BALLS KIDS: Maní Cacao	SMART SNACK	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
a11a47a5-00ad-4e20-a0ed-23ab1a11ac61	7897395099329	cerveja petra 350ml	Petra puro malte	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
089597fa-d28d-466c-b78c-896d8e5fd779	7896009301117	Atum ralado em molho com tomate	Coqueiro	Seafood	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
8143e435-e952-43a8-a594-6b91c286de05	7896009301100	ATUM PEDAÇOS OLEO 170G COQUEIRO	COQUEIRO	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
679d8dbc-8ab2-43b7-88e4-c5b75fc31b0b	7891700080415	Arisco - Galinha caipira	\N	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
054b305d-f8da-434f-8518-0ae5253f75c9	7896590806039	Creme de Leite UHT	Cemil	Dairies	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
50c4121e-de42-419e-b71d-36c0eb2e3e26	7896333015629	Farinha Tapiova	Tutti giorni	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
a20bc5b0-f7fd-415e-8cfc-24b6d1f6af0e	7896058258639	Tortuguita	\N	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
762fe423-7e04-4611-a2d8-0025d2473b71	7891962008387	bolacha Bauducco chocolate	Bauducco	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
f58e1b45-1a42-43f6-bff3-0ffca041f6d0	7896327512967	fermento apti	\N	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
2cc26753-dd98-4665-b19a-275eff88e9c5	7896327501855	Aveia em flocos apti	Apti	Café da manhã	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
eff8c97e-c2fd-4642-a536-941576f39079	7891340303233	Look Chocolate	\N	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
8b48c78d-27ff-4264-a369-78b5ecf564e3	7898080640369	leite integral italac	Italac	Leite em pó	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
9bd481f6-cf35-4c4c-8b1f-9ec273263f9b	7896094928510	Dual Fit Tamarine	Tamarine	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
b04322cb-2335-47f6-88fe-78985c0bf456	7891048000106	Chocolate Em Pó Solúvel 70%	Dr. Oetker	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
a705873b-ae60-4021-9a78-0db878056da0	7891000390078	Iog Nestle Bi camada 150g	Nestlé	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
d0f8b37d-23b1-4e00-959a-afd7e924c3bd	7898969669030	Pincbar caramelo salgado	Pincbar	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
c80ff8e9-3737-4110-9f51-dc174243f330	7898591450600	Dentaduras	Fini	Salgadinhos	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
9073649b-6526-4cc5-bb1e-d0e9262a0364	7896279600293	COAMO Margarina Dualis	COAMO	Alimentos veganos	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
72d06468-debb-4d87-b13c-2e10e935dc35	7896004005430	Müsli	Kellogs	Alimentos veganos	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
132fb488-08b6-40f6-8fcd-939f8ea5dabd	7891000339237	COOKIE PRESTIGIO 60G NESTLE	Nestlé	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
bb858fb5-45ab-46a2-ab7e-cf672060d32d	7891330016921	MUMU KIDS BANANA 15,6G	\N	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
15f0abae-71a2-4a1d-9294-3561e811a40e	7896079813138	Torrone com castanha de caju Montevérgine	Montevergine	Salgadinhos	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
f8ae8d18-ea42-4ad7-9264-85fabc8ef7dc	7891000370377	Cereal Matinal De Milho Sabor Chocolate	Nestlé	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
5cd0d7aa-8628-45b0-a3d6-1a28d6954a71	7898130990512	Manteiga de búfala bom destino	bom destino	Pastas e cremes	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
420b50a0-8b16-401f-8c3f-ec4bf04656d7	7891962060361	CHOCOBISCUIT AO LEITE 36G BAUDUCCO	Bauducco	Salgadinhos	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
331b7b4b-a740-4049-917e-fb62a0bf0513	7899970400940	TABLETE SPECIAL DARK LARANJ 85G HERSHEYS	HERSHEYS	Salgadinhos	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
f6d19b33-b2a6-482b-a37d-ec401ab8f3ee	7891000395561	TABLETE NEGRESCO 150G GAROTO	Garot	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
544aacd3-0f9a-4385-ad23-b9fc5b5e96c8	7891000361214	TABLETE CLASSIC AO LEITE 150G NESTLE	Nestlé	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
8c90c342-df42-4a5c-aea8-531b6d609b96	7891000118580	CHOC PRESTIGIO DARK 33G NESTLE	Nestlé	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
3e855347-745e-4b55-ba1b-934f771994bd	7891330014934	TABLETE NAPOLITANO 70G NEUGEBAUER	Neugebauer Alimentos	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
6f6b64c6-a5e2-4e30-9264-e4db81796756	7896290300189	Arroz Prato Fino Branco	PRATO FINO	Alimentos veganos	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
ace80476-b815-4b79-98c5-c537151edc93	7894321631011	polentina	Quaker	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
2d9a5edb-0e57-4026-bdb4-a8baca9b3378	7891048038048	Chá de Erva-Doce Nacional	Dr. Oetker	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
f08f6dec-6918-4008-a09a-e7c8abae7d8b	7892840819323	Black	Pepsi	Bebidas	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
f6b1f1cd-7d6c-4aac-aef6-f6e6496ec928	7891025114406	Triplo Zero Morango Corpus	Corpus	Iogurte	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
0ca2675d-51d3-4ec5-b9e1-6cfb84d75196	7891000307120	Nescafé Original Extraforte	Nestlé	Beverages and beverages preparations	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
6e4d3160-dddc-4dae-a0ee-ff981dd00308	7622210573261	TRIDENT X SENSES PEPPERMINT 54G MDLZ	TRIDENT	Geral	open_food_facts	2026-06-03 13:56:26.271	2026-06-03 13:56:26.253
a95f848f-6ad4-4fee-a251-98ba5d98abc1	78922310	nentos	MENTOS	Salgadinhos	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
98e1fcf3-6862-427a-89ab-57759156d8c7	7891008124583	TABLETE CROCANTE 25G GAROTO	Garoto	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
8c4f9b7f-62ac-4263-b859-f6702eb36bdc	7899970402456	Ioio mix duo	Cacau	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
38d0740d-b702-4299-b3cc-ab3fa3db3cd9	7896079846730	Tubin morango	Montevérgine	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
23f839fa-05d2-43a6-a9d3-930988e7a1cb	7891999004888	maionese vigor	DAN VIGOR INDÚSTRIA E COMÉRCIO DE LATICÍNIOS LTDA	Condimentos	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
849bdaed-0af1-4937-a625-eea8fd5fa03c	7891079011478	Hot sabor Mexicano com Pimenta Jalapeño	Miojo	Alimentos veganos	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
49c51d60-9d76-4e92-bd91-20a3b77a2379	7891203068613	Miojo cremoso	Panco	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
ef327c56-701e-40c0-8fc9-fd58629819e1	7898205924466	Iorgute Frutas LacFree	Verde Campo	Iogurte zero lactose	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
773a6f4a-a177-4d12-b392-43d09d2d63be	7896371000007	Cerveja Therezopolis Gold	\N	Bebidas	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
24663697-7ea9-4da3-8fd0-6db0e296182a	7891000253182	Creme de Leite Leve	Nestlé	Dairies	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
b7003f28-2045-4560-af3f-32a06c80a8c9	7896002361033	Bolo Laranja Pullman Pacote 250g	PULLMAN	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
5397f1b7-18db-49d4-ae23-ab720c29047a	7896004009377	Sucrilhos 60% menos açucares	Kellogg's	Alimentos veganos	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
095dac50-797f-4900-9738-f26ae85eb1ae	7892840814724	AMENDOIM JAPONES 145G ELMA CHIPS M	Elma Chips	Alimentos veganos	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
1da6ab46-fd06-435a-b15a-4098643627aa	7892840814748	Amendoim Frito Salgado Sem Pele Elma Chips Pacote 100g	ELMA CHIPS	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
3f55e862-4288-4925-8fee-17c400bfacd6	7896702900082	Pipoca clac caramelizada	\N	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
6b735c48-7579-4560-8635-9196fa1138fd	7899941201811	100% Whey Sabor Morango	Max Titanium	Dairies	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
48865cfc-b35c-4e02-8149-09ca3f1f72d5	7899916913244	100% jugo de naranja exprimido	Natural one Quillayes	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
f329e62b-1c87-4b21-8335-60ec39165589	7898641073971	Creatina	DUX Nutrition	Suplementos Alimentares	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
f59b3c2d-8922-411c-8ac7-180d261b92ad	7894904002450	Texas Burguer	Seara	Hamburguer	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
4fd8dcc1-2043-48b6-b5fe-14ee4521bff9	7891000349724	KIT KAT MINI CARAMELO	MOMENT	Salgadinhos	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
49ffb16a-f40b-4ccc-9cfb-47d227469137	7891000350119	Biscoito Cookie Alpino Nestlé Pacote 60g	ALPINO	Salgadinhos	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
03545f4d-a8b5-4de8-abe4-1a3ceed588c9	7898080641557	Creme de Leite Zero Lactose	Italac	Creme de leite	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
7fe762d4-5240-4e95-8511-220e177f7ce6	7891000377543	Choco Trio	Nestlé	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
4f399702-bcbc-4c5a-8c96-142cfedf0282	7892840820633	lays sal marinho 68g	Lay's	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
9995b8c7-ace0-41ed-aed7-0c58a0f92839	7891515432652	Presunto Cozido Fatiado Sadia Soltíssimo 200g	Sadia	Carnes	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
351ec2ff-3d7d-48f0-a889-77841d0930cf	7893000632233	Pizza 4 Queijos Sadia Caixa 460g	\N	Salgadinhos	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
aba106e3-ff13-401a-a2fb-0d905fbdf750	7891097104411	Requeijão cremoso com queijos 400g	Elegê	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
8ade496d-0665-463a-9faf-332890c9cef7	7891025124030	Activia Triplo Zero - Morango	Danone	Bebidas	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
13830c90-1f4f-4a64-b3f8-fe240dc3451b	7896333000205	Orange juice	Naturalle	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
a43618da-3fa6-4e3d-ac43-2a8560ce2d3b	7896181711810	Pasta Integral De Amendoim Amendo Power	Da Colônia	Alimentos veganos	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
23a6b895-8411-4fb6-b049-e00f9315c538	7896315120457	iate Guaraná	\N	Refrigerante	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
8f3321eb-288c-4444-8444-b1ee41751dbe	7898215157120	Bebida à Base De Amêndoa Baunilha Blue Diamond Almond Breeze Caixa 1l	BLUE DIAMOND	Bebidas	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
654b5b88-2f70-42ca-9972-6c821096dec4	7891910030347	Café união 500g	União	Bebidas e preparações para bebidas	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
dcc6a3f2-af24-44f8-8b66-a441d26f8489	7894904272945	Margarina com pedaços de Ervas aromáticas	Delícia	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
f1c05024-e502-4484-b29e-c808b569cb2a	7896427701414	Leite Italac desnatado	\N	Leites	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
f211fbdb-353c-4764-ba93-87d5202aa7c6	7896261405066	MIXED NUTS MEL 350G	Agtal	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
1ec738a2-cef6-4386-8235-e5aced2640f8	7896002311748	Takis Fuego	Takis	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
5b9b6c78-aba6-49c9-b419-b353e192941f	7891143017009	Creme de Ricota Light	Polenghi	Queijos	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
252ce7a7-d890-49b6-ad35-3f8f6367f948	7891143015425	Queijo Frescal	Polenghi	Queijos	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
9317bc55-b44b-4967-9b81-09cd023d4b4a	7891143020795	Queijo Cremoso Polenguinho Fresco 68g 4 Unidades	POLENGUINHO	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
8e1e5816-ca9b-41de-8328-342d33dd6e97	7898019061449	Ovos tipo extra brancos categoria A	Granja Marutani	Eggs and their products	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
3de5eac9-bacd-48a5-9c67-04321c5a2ce8	0070847022305	Monster energy absolutely zero	Monster Energy	Bebidas	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
5ff9393e-0322-4d63-8af8-f919cb4b9965	7891091010008	Cuscuz - Novo Milho	\N	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
033cbff8-5c88-4ede-ad1c-3ed908477a7a	7896629650138	Coalhada Triplo Zero	Canto De Minas	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
4cf3f988-2685-4fa2-b0a6-04df17ab3b33	7896279000604	Sirop falernum	\N	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
300ab9a1-00da-414c-9043-f6437511d538	7896828000239	Kero Coco 1L	KERO COCO	Bebidas	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
d3393c14-0c13-4035-8c4c-ead112bc0d14	7896114990220	Atum em lata	Pescador	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
0bc1736a-ab52-41a7-aaf7-56dd7264c4e9	7896025804050	Molho De Pimenta Chipotle Defumada Sabores Cepêra Squeeze 270ml	SABORES CEPÊRA	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
b927e27f-43a4-466a-80a6-cf9e4b4edf56	7891000372586	WAFER nono Choc. 110g	Nestlé	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
072bd36a-f84f-48c5-a230-ae573849ecf2	7896022086831	Biscoito doce sabor leite	Isabela	Salgadinhos	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
bf721204-c565-4606-ba87-b4d7508a32e1	7896022207571	Sem Glúten Espeguete 8	Renata	Alimentos veganos	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
f506fe47-2c9d-405c-b53e-b4984d5e81cd	7898968764118	Bebida à Base De Aveia Baunilha Café Nude. Caixa 250ml	NUDE.	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
c55396b0-fddd-4571-8e27-5229435b1020	5010477352910	Granola Berry Fruits Jordans Pouch 400g	AB BRASIL	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
3f2fab85-1059-4da5-ba7e-cf6f0174e47d	7896022200268	Macarrão Renata	Renata	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
941429ae-1928-45ce-8b56-3ecf0f102841	7897042701438	Biscoito de polvilho Sabor Queijo	Nazinha	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
5b9a1911-5e98-4b48-8262-8d4d86e01ffa	7896005802588	café 3 corações gourmet	3 Corações	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
1cb98b81-2b16-44d7-98cb-e1979266a0f9	7896058257724	BISC TORTINI TORTUGUITA CHOCOLATE	Arcor	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
9aa2bb5b-57ae-49fb-b426-1c77e4cd9bf0	7898142863910	Brigadeiro	Arcor	Salgadinhos	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
663a5764-54df-46b2-b725-bd8f7b0a012e	7896653706047	Creme De Avelã Com Cacau	Flormel	Pastas e cremes	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
4a464551-37a9-4917-9314-151790bf8571	0602883464506	Mukebar	Muke	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
4f99668f-680d-4309-9c60-614b7afa80a2	7891000244548	Iogurte Parcialmente Desnatado Vitamina De Frutas Nestlé Garrafa 1,25kg Tamanho Família	Nestlé	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
b5e73b47-0f19-4819-b52f-7e547cabde4c	7891991301138	Skol Beats Senses	\N	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
12eceda0-25c2-4708-b5b1-3b098cf88263	7898377662425	REFRIGERANTE IT! GUARANÁ PET 2L	it	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
ff039d18-e0b7-4498-b7b4-b68fd95e9d3c	0749355080137	Pão de Queijo coquetel congelado	Ideal de Minas	Queijos	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
b18657ee-dcbd-400d-af45-476ec4f8a6b5	7896569405027	Leite UHT Desnatado	Lider	Leites	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
45cf0f30-8601-4b8e-93a1-6952821a0d26	7898391410774	Massa de pastel Cesabela 1kg	\N	Alimentos veganos	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
7b310163-13c5-4d52-a2b2-fb17abe95f81	7896372400110	Pão de mel 300g	\N	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
a60e678b-17a4-47b6-9a24-9b8ff0883415	7898955705988	Leite Barista	A tal da castanha Batista	Bebidas	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
fef43034-5b22-4d6e-89a7-f973765d5d25	7896353302075	Requeijão cremoso reduzido em calorias	Catupiry	Alimentos	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
cd0ce92a-69cd-46a8-b226-28c79fed15ec	7896074606735	Pão De Queijo Congelado Tradicional Forno De Minas Pacote 820g	FORNO DE MINAS	Salgadinhos	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
51ae7c3b-5c6e-47ef-b7fc-117dffee1ef5	7896066301464	Pão Australiano Integral Wickbold Do Forno Pacote 500g	Wickbold	Alimentos veganos	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
32051efc-28e3-4530-8a56-f83b26f03928	7894904204557	Linguiça Fininha	Seara	Lanches	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
ae5e8969-1e62-437c-af97-0a1b40e294d5	0070177197315	Chá (Infusão) de Camomila, Mel e Baunilha	Twinings of London	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
40cba5d1-0a6f-4717-8db6-57467f579693	7896326100219	Guaraviton roxo	Açaí	Bebidas	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
1f31dd75-1f89-4234-a7a7-a146306d87dd	7896292001442	Adoçante MAGRO	\N	Sweeteners	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
604e0d21-61e9-4915-b7fa-027cb377beb0	7896931614149	Suco de Uva Tinto Integral	Campo Largo	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
dd96b88d-b37f-424f-b1dc-f4a40d266ad5	7891000243954	Café au lait	Nescafé Dolce Gusto	Capsula	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
fdafda4d-cf9a-4b2d-afcb-36705e6436ce	7891515524630	Linguiça Tipo Portuguesa Sadia	Sadia	Meats and their products	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
f5dcdf4f-4183-4f01-b1ff-c6d6d24116b3	7891515606831	Linguiça Fininha Sadia	Sadia	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
cdd37cb2-1952-49e2-a846-5c30377d9a4c	7896031201423	Maturatta Friboi	Maturatta Friboi	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
6d44210b-c262-40ee-b70a-a85a9442fd8e	7891515544041	Mini Chicken Tradicional Perdigão	Perdigão	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
a62f1a17-9c32-4c64-a3e3-09044294e69d	7891000261026	Iogurte Parcialmente Desnatado Morango Salada De Frutas Maçã E Banana Ninho Bandeja 540g 6 Unidades	Nestlé	Alimentos veganos	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
d5bea103-6f84-4c01-a239-61106126e679	7898908593617	Vinagre de maçã	\N	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
be17cff7-7362-487f-aca9-473776efebbe	7896066761879	Bel moranguete 450g	\N	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
3708fc94-92d9-4334-b5b6-df9d861200de	7896066761886	Bel leite condensado 450g	\N	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
b3e09bc7-1a15-48d1-97ee-ae3c3bbf0653	7896058507690	Amendoim crocante sabor natural 1,010 kg	\N	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
d9ea4b93-51b1-453b-9993-69c867c41661	7896275921101	Banha	Frimesa	Fats	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
a48fcd79-2792-4332-bbd6-cb2c4067de1f	7908529700254	Mostarda salsaretti	\N	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
f80d3930-4deb-4cff-b0a8-2f412c429157	7891097104770	Iogurte com creme e preparado de fruta sabor baunilha com raspas de chocolate	Batavo	Bebidas	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
70c2fb8b-1b25-460a-be73-2339dc6e26a8	7891079012918	Cup Noodles Verduras	Cup Noodles	Alimentos veganos	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
90b2864c-1c78-4c6d-9854-36f867841259	2220860211240	Estrogonofe de Frango, Arroz Branco e Batata Assada	Liv Up	Meals	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
378dfead-083e-4f6a-a950-a9611217e770	7896275981952	Manteiga Extra Sem Sal 200g Fort Atacadista	Frimesa	Pastas e cremes	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
172ce9f8-e19f-4c95-ac01-98a4560ac74b	7896122301315	Requeijão cremoso light	Porto Alegre	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
858a09dd-ea3b-4bfc-a937-e9671227aa25	7896844300498	Pão integral (50%) com castanha e quinoa	Caseirinho	Alimentos veganos	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
8a3db187-0cb3-4348-86ce-1bb54992dd48	7893000290099	Presunto Parma Fatiado Sadia Speciale 100g	Sadia	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
b7bf549c-d1a9-4a83-be9f-c93a52d2971c	7895144297460	Chiclete mentos	Mentos	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
81f535c1-dbfc-4969-ae30-79d457a54989	7892840822637	Pimenta Mexicana torcida	Torcida	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
ac98f839-b858-47a9-a0bd-26ba23b89a13	7896214532023	Geleia Goiaba Queensberry Classic Vidro 320g	QUEENSBERRY	Geral	open_food_facts	2026-06-03 13:56:32.108	2026-06-03 13:56:32.088
a303065d-45f6-48ed-b385-9410d77aacce	7896306624803	Trento pro	Trento	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
e5466359-d599-4a5d-a389-7afd4095e3f7	7891097104220	Cream Cheese	Président	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
83b6d933-83f4-4773-a8e3-e4192bce9fb3	5601252118533	AZEITE ANCESTRAL 400ML	GOURMET	Alimentos veganos	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
fd172aa9-80e7-45fd-89cc-1199505e96b8	7899985000425	Pão Brioche	Paderri	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
a8b023f9-0988-4d9a-a349-84d3f2aff2cc	7892840822866	fandango queijo 35g	Elma Chips	Salgadinhos	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
3ec1dcef-c0bc-471f-a88e-6d50b3766ccf	7898205924794	Iogurte Probiótico	Verde Campo	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
6b3316a1-5f86-406d-828f-a7ed97d824a2	7891150079892	MAIONESE VERDE SQUEEZE HELLMANNS	Hellmann's	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
ee6d3b56-496c-46ab-9c5b-65e7eecd0a7a	7891000397077	Leite em Pó Ninho Adulto Semi Desnatado	Nestlé	Bebidas	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
906c6395-5eec-409f-84bf-a20e9e20796c	7898006951982	Sorvete frutas vermelhas	Oggi	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
6ee9343a-8918-4595-9641-bd1ae670c52e	7891097000201	Iogurte Integral com preparado de ameixa	Batavo	Sobremesas lácteas	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
a85a3be3-7f8d-4841-9cfe-a7aab73ae4d9	7899916904853	100% Orange Juice (Shelf Stable)	Natural One	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
ce356ab4-3aa4-43c0-8fdc-ecdd7090f097	7899916905584	Suco de Uva e Maçã	Natural One	Bebidas	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
8669292a-2549-4d56-96cf-10a679c67d5c	7896798603188	Protein+ Banoffee	Banana Brasil	Dietary supplements	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
1045aa54-ecfe-4d2f-a33d-70f194fb5ed8	7898692300866	Jungle Endurance Tangerina	Plant power	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
9a54d2c9-509c-4964-930a-8d3c362b8b71	7896253402141	Ramcho	Rancheiro	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
36d6f7e6-5de4-4bef-8764-603490df7e49	7896775101287	Pasta de amendoim integral	Guimarães	Alimentos veganos	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
48269486-af5f-49da-a7c8-7bad76708b5a	7891098041142	Ice tea pêssego	Leao	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
94584f3c-e95b-48bd-80b2-86a2752213dd	7896002311427	PAO DE FORMA 30% INTEGRAL TRADIÇÃO	TRADIÇÃO	Alimentos veganos	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
736910a1-5e77-4ef8-a950-9c8ca20a1c02	7896024809032	Cevada solúvel	\N	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
e0531086-1ee4-4927-8206-7eec0f74e57b	7896001223530	Chocolate Branco Linea Caixa 30g	LINEA	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
7ca40fb9-dac4-4550-be06-f80a305b0d2a	7891097106101	Iogurte Pense Zero Maracujá	Batavo	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
aa5cb212-d9c1-437c-b763-94cc9a010ca1	7891999014092	Queijo Parmesão Cilindro Faixa Azul 195g	FAIXA AZUL	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
43ca569b-e49c-4418-84c0-d64a80e9e557	7898274525427	Iogurte natural integral	Da matina	Sobremesas lácteas	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
da254fb7-4aa0-4e27-be1b-bb1c09def42d	7891167831667	Patê de Atum com Azeitonas	Gomes Da Costa	Pastas e cremes	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
c29b803b-bf64-4792-8372-2336fcb3586c	7897781600146	Popcorn	Crac	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
a6773801-e12b-4984-81bd-d0e3de8fd6f2	7896003705164	Mini Maizena Marilan - Marilan	\N	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
c0899d12-62c2-4725-a053-6c6adbc077d2	7891095911394	Farofa Pronta	Yoki	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
9abfae26-d5bc-46cf-89f1-22d935ea5fb2	7891000370520	Show flakes	Nestlé	Alimentos veganos	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
4cf1b4e8-36f1-41fb-a1f6-d8a4eb5734ff	7896004006833	Cereal Matinal Frutas Kelloggs Froot Loops Caixa 230g	FROOT LOOPS	Alimentos veganos	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
95ad73a5-fe06-4106-a32d-e1efd2b76e82	7896051125433	Iogurte Líquido Light de Morango Fit ITAMBÉ 180g	Itambé	Bebidas	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
c8c1e885-129f-40bc-b888-c6fb0bd8e7b8	7891000298671	Morango Aveia e Baunilha Probióticos	Nestlé	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
db967465-2b41-4a8d-bdec-bb3767a4d082	7896003739510	Pit Stop Presunto	Marilan	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
ddbf04e2-3962-4125-9a42-d0fa5fde2890	7896986261640	Cacau show lá creme	Cacau show	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
1777882b-8c4d-42a6-8170-6456695b182e	7891962056500	CHOCCO BISCUIT AO LEITE 80G BAUDUCCO	Bauducco	Salgadinhos	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
dc54dece-ace3-4bac-b604-67f688c9f3e3	7896016601972	Água de coco	DuCOCO	Bebidas	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
b3190723-14e9-4a51-b786-9ee56c87e2c3	7896003739770	Magic Toast	Marilan	Torrada	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
194112a1-3bbd-4dd4-90d3-671a15d66197	7891097001062	leite parmalat zero semi desnatado	Parmalat	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
1fa07a10-7ba4-4edc-8be4-79e80b2b3aa6	7898641074701	Whey protein concentrado	Dux nutrition	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
04a907f3-58bc-42e3-a69b-1cbe59d307e0	7896294901443	Requeijão cremoso	Tirol	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
b7b5d19b-d7ec-4618-9421-f6f99356ed94	7896504305092	Leite Desnatado	Santa Clara	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
755875d6-9c52-4c86-bf9e-557bb6dc7db4	7896986261596	Bendito Cacao	Cacau Show	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
ee8ca1ad-a912-4514-8ce4-fbec947f7880	7898571520675	Iogurte Desnatado Grego Natural Zero Lactose Yorgus Pote 500g	Yorgus Grego	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
e21759a6-8eea-4033-9bee-be17e63db8a9	7896022086213	Wafer sabor Chocolate Branco	Isabela	Salgadinhos	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
d98f82a5-9e9c-45c3-8aa4-ef711902689e	7891025124269	Yopro+ Café Expresso	Danone	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
9cf51edf-b253-478a-98cb-b44d58da05d6	7896114101213	Creme de Ricota lpanema	Ipanema	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
5e7ebac6-0570-4a50-afb9-9b722ded452b	7891527064445	Lasanha ao molho de tilápia congelada	Copacol	Meals	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
c469b485-f8fa-4d31-a6ff-dcd873d3fad6	7893642467231	Pé de moleque crocante	Manamel	Alimentos veganos	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
dc885853-bc72-4112-b305-d16f52fdb4a1	7896798603225	Protein+ Torta de Limão	Banana Brasil	Dietary supplements	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
48cae8d3-889b-415c-83b1-04c25572b4a2	7896283006494	Sou Sweet	Jasmine	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
fcb3ede5-b9d5-44ad-a392-dac8b6b7651e	7896183210045	Leite em Pó Desnatado	Glória	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
e44aa581-5b0a-45c4-bb16-5236615c6480	7896003739541	PIT STOP FERMENTAÇÃO NATURAL	MARILAN	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
77ce96c0-83b7-4956-91d5-b2067d7a7ca8	7891000389225	Nescafé cappuccino canela	Nescafe	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
fad1f236-4d5d-47c4-b853-e5bcf598d0e4	7891000096864	Iogurte Grego Tradicional Morango Maracujá Light Nestlé Bandeja 540g 6 Unidades Leve Mais Pague Menos	LEVE MAIS	Sobremesas lácteas	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
5338ca5d-a5b0-4e55-83e6-3bc0089eb469	7896590802123	choco mil	Cemil	Bebidas	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
b088f306-a666-41bc-af81-cd2c68966ac9	7891025124160	Corpus Triplo Zero Vitamina De Frutas	Danone	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
b741b295-8ca1-4945-b3e3-d68d2a789b6d	7896213006426	Biscoito Maizena Leite Vitarella Pacote 350g	VITARELLA	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
9b472c7c-0233-486e-bdcb-d343570e5c4e	7896003739428	PIT STOP PAO NA CHAPA	Mari lan	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
b3281196-330c-4972-8e5a-adb90ae0d368	7896862002398	Iorgute triplo zero	Frutap	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
7b6f246f-4329-4abc-9353-7e0697783862	7898058130434	Pão de forma - Delícias Do Trigo	\N	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
49e6979b-5bca-4f61-b625-32f7cedd39a3	7896261403475	Barrinha Joy Zero Açúcar	Joy	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
cd74903d-cbd9-46d0-8422-56946ac617cc	7891737017682	Biscoito Baunilha	Member’s Mark	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
f7887330-1338-43ea-bd30-04b17fb167f8	7891203069702	Pão de forma Integral 35%	Panco	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
0ed06926-b238-4f6e-8041-66714eeaf673	7898692300309	Bebida Vegetal Possible ORIGINAL	Possible Plant-based	Bebidas	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
71085f0a-6a89-4c1b-a56a-29469dabcca3	7898080664587	Energetico - Baly	\N	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
13d3401c-aed1-4667-be05-ad182604852a	7896102000160	Molho Barbecue Original Heinz Squeeze 397g	Heinz	Condimentos	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
d9121a4d-747c-4c88-8c07-673c5ddc75d4	7896003739718	Pit Stop Recheado Chocolate - Marilan	\N	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
3af7a2ef-e974-48ca-9132-0628e14ff388	7896022202606	Macarrão Linguine Gran Duro Superiore - Renata - Renata - Renata - Renata	\N	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
f3bb558b-f20e-4f56-a846-b34f4ae1d766	78938861	Uva verde	Halls	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
0cb223f0-7b09-4eda-81a6-85037376a171	7896181712565	Amendo Power Protein Bar	DaColônia	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
9931d4d5-fc2f-4ebb-a4b0-a30489bf9772	7896003739381	Lev Magic Toast	Marilan	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
9645da10-fd49-44f0-884e-9cdd0ee46fb4	7896063285415	Granola integral frutas vermelhas	\N	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
37df033e-52ff-4f65-85c2-de3f2bf618ae	7898937864795	Aveia em flocos	\N	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
13987691-f157-4d72-a527-641711409ac2	7898215152484	Leite Em Pó Desnatado Instantâneo	Piracanjuba	Bebidas	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
e17de35a-38b0-44a1-97a0-019faa656e65	7897972003954	Pão Nobre Integral	Kim	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
710cca6d-c8a4-46e2-b1dd-352754f2af1e	7894900700398	Coca cola zero mini	Coca cola	Refrigerante	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
a546d692-1780-4413-b277-5457252b478c	00948906	Arroz integral	Prato Fino	Arrozes Integrais	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
08b87060-122c-4d4c-9de1-4bdfd244c6df	7896999099575	Pão 63,5 integral	Thabrulai	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
e472a918-9b7e-472b-bf9c-46620b85d75b	7896122301254	Requeijao Light Porto Alegre	Porto Alegre	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
4a94e547-051f-4fe3-a1f5-eba40a58eb2d	7898687313192	Chocolate s/ açúcar	Dengo	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
5b081778-f0f9-416c-a929-0146e09fd7e8	7896009301124	Atum Ralado Ao Natural	Coqueiro	Seafood	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
50ae8414-cb04-4935-a4f3-d1d1dd21212d	7898930772080	Whey Protein	Growth	Dairies	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
cf67376d-053f-4061-bb5f-e6bb1169665f	7896213005177	Miojo	Vitarela	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
6c1fcdb4-0d20-444d-a113-46e25ec25ef2	7896006711117	Arroz Tipo 1 1kg Camil	CAMIL	Alimentos veganos	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
e0751bdf-5c7c-4a58-b5c0-7a7de525922d	7898080640765	Doce de Leite Italac 350g	Italac	Pastas e cremes	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
7182d8d2-694b-40ab-a954-731a0704eef5	7896005802373	Cappuccino Solúvel Classic 3 Corações Sachê 20g	3 CORACOES	Alimentos veganos	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
8e00c67b-cfc9-4951-add8-b23a54701478	7898403781465	YoBem	Betânia	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
812c410a-9ac6-4d7e-a254-f514b0bb62b7	7899769103281	Empada Palmito	\N	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
905e6410-217a-4c1a-b563-00a7429968d9	7896791904268	iogurte trevo 1,1kg	Trevo	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
15744a36-9fc0-4d18-965a-05ec2ac6e5eb	7891000358887	Chocolate, ao leite, com amendoim	Nestlé	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
58cfe625-c371-4b3c-9a3e-06fe117944d9	7892840822309	cheetos lua 35g	Elma	Salgadinhos	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
9fc90ec0-a5d2-433d-91c4-5dcaf4860e09	7891000369371	Chocolate Ao Leite Crunch Pacote 80g	Nestlé	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
7cc2bb48-c58d-40b6-bdcd-4d82c0138053	7891203059314	Bolo Laranja Panco Pacote 300g	PANCO	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
bac09062-00ab-44ab-9cc4-d302699de9b8	7896181710370	Bananinha com açaí orgânico	\N	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
97c3b689-e3e0-4bf6-ab02-75059cc64055	7896639800684	Torrada de Tapioca com Coco	Okoshi	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
d8c58717-c060-4f85-a10b-f3ac6e548dd9	7896292006003	Pudim sabor chocolate	Lowçucar	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
0cb0a580-7832-4e31-ab87-53cc66c7e84e	7895000318643	Leite UHT Desnatado	Qualitá	Leites	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
a5ce0bc8-cca5-456c-bb48-a7fe3f7ef70e	7892840823450	Baconzitos	\N	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
16c76abe-82e7-4338-b9ce-fdc42ceaee9d	7896256065817	Biscoito Integral de Arroz	Natural Life	Salgadinhos	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
1b49c72e-ee42-47c7-ae9e-fe503613201e	7896093201065	Pão Integral 58% com aveia, maçã e canela	Milani	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
e05825b5-702a-4a93-bea0-1676cbdf9d52	7898301335005	Pão de forma - Bella Vita - Bella Vita	\N	Alimentos veganos	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
8e5dc46d-0685-49e4-84a2-5c76819490d0	7896663322473	PROPOLIS VERDE 70	\N	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
62269280-5579-4790-9f6b-f3fc7eb1ddda	7896003739374	TORRADA MAGIC TOAST CEREAIS MARILAN	Marilan	Alimentos veganos	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
4b4d7083-af22-46f1-937a-7a89a43982c9	7896256600551	Queijo prato fatiado	Tirol	Queijo prato	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
5bc81071-7513-46b0-8299-410643f09ea4	7896004007342	Cereal Matinal Original Kelloggs Sucrilhos Caixa 690g	SUCRILHOS	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
75c16517-bcc2-44a9-bb84-245975ea5660	7896068944355	Cream Cheese Tradicional Danubio Pote 150g	DANUBIO	Queijos	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
fa04d4cc-5dc3-405a-82aa-735856ca03ca	7896569405034	Leite líder zero lac semi 1L	\N	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
c48544ca-2656-43bd-b267-6c866633a1a2	7898215152828	Bebida láctea	\N	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
fb18cc7d-a46e-453f-8630-ae2fb858e034	7899970400926	Hershey's special dark mint	Hershey's	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
b781e2e5-7fd1-4522-adef-91bcf50a6e8e	7896256041149	Granola caseira	Natural life	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
fb6dd752-cff1-4080-b520-5966e35db309	7896629640221	Iogurte triplo zero	Canto de minas	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
bdf60a0b-4380-45c1-9d3c-5c593c847931	7896002303422	Pão de hamburguer - Plusvita - Plusvita - Plusvita	\N	Alimentos veganos	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
b7a06209-aa71-4898-9154-f442cc23e088	7896283007422	Wrap espinafre - Jasmine	Jasmine	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
18defaf8-1a48-41a7-8f17-847ece6749c3	7896623100011	Leite Pasteurizado Tipo A Integral Xandô Garrafa 1l	XANDO	Leites	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
511df3f0-c2b6-481e-9b46-56fe95942e7d	7891025117162	Leite Fermentado Parcialmente Desnatado Vitamina de Frutas Activia Garrafa 800g	ACTIVIA	Iogurte	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
1c436c75-e452-4214-a8ad-c83ace09c926	7896180783856	Doce de soro de leite	Aurea	Pastas e cremes	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
bb970def-9556-4917-a0c0-7e0a303eb137	7891737321192	Farelo de aveia - Member's Mark	\N	Alimentos veganos	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
a479e29a-8d39-47c1-9416-01a3ac86f815	7898601948813	Maçã Escolinha	Cantu	Alimentos veganos	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
5bddad68-719c-4dbe-be18-1e849bf80cb7	7898686950978	Not Shake Protein (morango com tamara) - NotCo	NotCo	Bebidas	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
a0b7dc89-3208-4955-8ff2-fbdf145b5f4a	7891000395981	Leite em pó integral instantâneo	Nestlé	Bebidas	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
b86dc0da-52a0-41d8-a992-efe5e3f719e3	7892840823375	Batata Lays Clássica 70 g	Lay's	Batata	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
2f7af897-d333-43e2-83c4-4c3aedd983d7	7891097105678	Iogurte grego Batavo 510g morango	Batavo	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
846686f0-b77a-4061-9428-38b8b7031ed8	7895000360918	Atum Ralado ao Natural	Qualitá	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
e9cc65ff-8fe7-4354-8c2e-7c27f43d438e	7898929966056	Leite em Pó	CCGL	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
f8ab0ad3-0320-4d48-9338-1b5cf798c789	7898915000245	Pao natural	\N	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
4a0a8762-3df5-4d13-bb2d-1fb0cc85996c	7896051121817	Coalhada	Itambé	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
adc92ed3-4329-433b-95b9-71c867d87a69	7898403782011	Betânia zero lactose	Betânia	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
f4177f0b-8e51-4070-9287-61db3c1c3b5c	7898205924411	Natural whey	Verde Campo	Bebidas	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
5b95af39-a542-4be8-b7c0-f37d36caa0a8	7896022087159	lamen sabor carne	ISABELA	Alimentos veganos	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
b3a9403e-054b-4690-833a-894124d22bec	7891149010509	Brahma Chopp	Brahma	Bebidas	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
e6193a2f-82d3-4564-950f-2a78099914ad	7896629640207	Iogurte Triplo zero	Canto de minas	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
3a84f98a-03e3-4a91-bb82-fdabc9ba0e0f	7891025124597	BAUNILHA	Danone	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
68d9fcdf-6124-496d-8097-c3550084b28d	7891000377727	Achocolatado em Pó 60% Cacau	\N	Cocoa and its products	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
f67b9ea1-1288-4d2b-80a6-383da43e7947	7898205925340	Natural whey	Campo verde	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
5de73bc4-a0c7-4c19-b972-a329ec520db6	7891515546847	Bacon Em Fatias Perdigão 250g	PERDIGAO	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
b6bc24dd-b817-4ceb-8dbe-dbe41d7562e6	7891330019359	Chocolate meio amargo 40% - Neugebauer	Neugebauer	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
9aff0382-6305-414e-ab94-fa5a954a1791	7896259411796	Camponesa - Leite em Pó Desnatado	Camponesa	Leite desnatados	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
405b6d33-ada8-4403-a811-10e37d7599d8	7896045110636	Beb Lactea 3Corac 250ml Whey Cappuccino/DC Leite	3 corações	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
55638313-7d58-4ffe-a5ab-f3ef6020a6c2	7898967660039	Gelato Doce Leite Bacio Di Latte 490ml	BACI	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
898dcdcd-2ecf-4db7-85f9-3fbf4a4e9ca9	7891515434311	Mortadela defumada fatiada	PERDIGAO	Meats and their products	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
f88ef784-c053-49fc-9ee1-a7b62b58ecd8	7896058259094	Biscoito maizena - Aymore	\N	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
9f39ebfe-a881-49cd-bc0b-49ee287f555a	7896002302449	Snack De Trigo Churrasco	Grupo Bimbo	Salgadinhos	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
ad421a1d-fe23-4d42-a7c8-04dbfdfd302b	7891772144855	Granola Banana - Kobber	\N	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
0888690a-66b2-443b-b0ba-0183af963b78	7898331013249	Chocolate em pó	\N	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
b5e739a2-2320-410b-b40d-0e09396f06ba	7896590801232	leite longa Vida cemil	cemil	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
f6f6f69e-77fd-4f10-8aad-9ac5c3a243d2	7896093200990	Bisnaguinha	Sanny	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
4ce4864e-55b6-4c0c-892f-6ddcab19e927	7891000460511	Chai Tea Latte	\N	Bebidas	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
312a416e-b639-4ac1-bdbf-18bdf61bdbdf	7896256600223	Leite integral Tirol	Tirol	Leites	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
827f2cd8-8e5b-4876-a93d-53c0065ce283	7896002304191	Grand Burger Brioche	Plusvita	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
c0276947-71e1-490c-ac26-7af3648f55ae	7896590801263	Choco Mil	Cemil	Bebidas	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
a81dfc91-e2ec-4756-97e4-7fdc91198c0e	7892840821470	Ovinhos de amendoim - ElmaChips	\N	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
2ce46cac-f784-4032-94e6-f359a3d18985	7891330019373	Chocolate com amendoim Neugebauer 80 g	Neugebauer	Alimentos veganos	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
53975609-4341-496d-b06e-277a2c7e4352	7898904874345	PAO PANUTRI DEL GRANO INTEG 500G	Panutrir	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
85c153c7-fc02-4a8e-9e8c-4fd9fc530082	7896063285231	Cookies sem glúten	\N	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
c2ef35da-55ab-4104-92c6-932a250127a3	7898115901960	Bolinho sabor Red Velvet	Suavipan	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
6b4c09f4-95a1-45a1-80ae-bdbee030b208	7896412852114	A_Bolacha água e sal - Orquídea	\N	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
b5135118-4040-4f4a-b7e7-aa9d3de3c4c5	7896273904106	Arroz 10 Grãos Integral	Caldo Bom	Alimentos veganos	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
a9366340-9387-4a33-8e40-63ba0ba0bd70	7896005807668	Café 100% Arábica	\N	Cafe	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
8804bb7f-5bae-4aa6-ae60-93a381cc46ae	7896275900953	Presunto cozido fatiado	Frimesa	Meats and their products	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
c526635a-6cac-45ac-b18b-5e9b97cde032	7896022208028	Bolacha	\N	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
98362632-933d-4c6d-be95-43afe3bbeb4b	7891122124346	Aveia em flocos	\N	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
c6d53e7a-3ef9-4bbb-851a-b450fa2234cd	7898416520471	Molho Billy & Jack tasty - Billy & Jack - Billy & Jack - Billy & Jack	\N	Condimentos	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
1ce24d1c-b5ac-468a-bb07-cd57151f60a0	7896051124054	Iogurte Parcialmente Desnatado Coco Itambé Garrafa 1,25kg Embalagem Econômica	Itambé	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
7c710146-7b29-4dbe-90cb-9801b99008fb	7896245709241	Biscoito Micos Rosquinhas Chocolate	\N	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
a94f6c3a-e781-4c0e-bcca-13d85068899c	7898946780895	Paçoca Tijolo	Ricco	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
a183b21a-02c9-477d-a0b4-d78fb8e1703a	7892840822880	Fandagos Salgadinho de milho sabor presunto	Elmachips	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
9665b265-1d46-410e-ba7f-a4da02ce0b98	7896005802403	Capuccino baunilha	3 Corações	Café com leite in	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
5c8fdfbc-48fd-4cf7-8b72-f5f8f425e242	7896058598674	Amendoim tipo japonês - Dori - Dori	\N	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
5f0ff1b7-4cdd-4049-8293-d1a86761f890	7891025115632	YoPro Banana Shake	YoPRO	Dairies	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
540ac814-adf0-4240-a6f9-00ebc2236b35	7891000099032	Farinha Láctea Original Nestlé Sachê 210g	Nestlé	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
23ff8c50-f0b6-4d33-8e1a-fccfd279d5d3	7898003280450	Doce De Leite Portão De Cambuí Pacote 200g	PORTÃO DE CAMBUÍ	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
d9402c9a-ef61-46bd-a421-7045b42ccb12	7896590806305	Leite UHT Integral	Habitus	Leites	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
4eeec5d0-1a28-4a76-8e94-b63b2e3be32a	7891991303200	Cerveja Puro Malte	Spaten-Franziskaner-Bräu GmbH	Bebidas	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
2d38541b-7388-495f-9492-fbde5433e43e	7896051125488	Iogurte Desnatado Zero Lactose	Itambé	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
9e2851ab-7971-443b-8cfb-f02496a1eeaa	7896253401489	Cream craker rancheiro - Rancheiro	\N	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
71017fd2-5b5d-40e9-b2b5-124fbe564c84	7896213006686	Espaguete fino	\N	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
cb8e3a13-92c1-44ef-b30e-52e47c65d281	7891149108749	Coronita 210ml	\N	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
80bce0a9-ffdd-4eae-a2d5-5048bec7a0b7	7896625211227	Requeijão	Danubio	Requeijao cremoso	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
2cc806e0-55c6-4e7b-974a-52a8f90920b9	7896213006778	Massa semola parafuso especial	Vitarella	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
ea29d63c-9d7a-4f4b-8f4a-8aadd299abb4	7898005862609	Ki queijo	\N	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
1117659f-93a7-4d43-b069-39976af7575d	7896022204648	Amanteigado Leite - Renata	\N	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
fcbe27d7-88a0-4c18-86b2-edcd51e9661d	7891203069801	Pão 46% integral castanha Pará e linhaça - Panco - Panco - Panco	\N	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
d7760d14-b3e7-455d-b2f9-75464fce3f6e	7896085087110	Chocolate biscuit	\N	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
4629a125-8349-4cd4-b1c4-4bcb1a51ad37	7896003706840	LEV	\N	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
0c0408fb-e3ad-4951-bdc2-28bad887649d	7896259411628	Creme de leite - Embaré	\N	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
bb2f5e72-83d1-4d24-88eb-534504e217a2	7891962052588	TORRADA MULTIGRÃOS VISCONTI	VISCONTI	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
7ada5b35-99fd-464f-ac6e-2f88cdc2c246	7898215153221	Whey Piracanjuba	Piracanjuba PRO FORCE	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
1b96a939-f2d8-4cbd-ab5f-2b9c281026b7	7898967062048	Homus	\N	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
36bd78d3-854f-4ba5-aec5-ead13c524c0b	7898215152354	Leite Em Pó Integral	Piracanjuba	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
a454fe94-7d74-4da2-9f47-75841deb7efe	7897900317160	Trio nuts	Trio	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
37d608f9-8cce-4bd6-8fc1-4ce217d12e04	7898206502489	Native Açúcar Mascavo Orgânico	Native	Acucar mascavo	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
cbdf438e-8e56-4e71-856c-acf0585b2969	7898342050240	Sardinha	Nautique	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
c3b1b323-d39d-451d-aec1-95e6cd0aa22f	7896094919853	Adoçante Em Pó Sucralose Zero Cal Caixa 30g 50 Unidades	SUCRALOSE	Adoçante	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
f9895f8a-7897-4706-8e3e-56c222e1896c	7896292000186	Adoçante Lowsugar com Stevia - Lowsugar	Lowsugar	Adoçante	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
ea053897-f69f-4780-99e5-0800bfa1ab17	7896045506934	Cerveja Amstel Puro Malte Lata 350ml	\N	Bebidas	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
806cbd56-628c-49af-84c0-0db20e04ddd5	7896714291246	Cabelos e Unhas vitaminas	\N	Geral	open_food_facts	2026-06-03 13:56:41.156	2026-06-03 13:56:41.138
79ae7c21-448b-4219-bae2-268be164dc4d	7891268400113	Pão de Alho (1 un) - Mania de churrasco	\N	Geral	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
f177775b-c8af-430c-ae57-79d4c5b1200f	7891152801521	Cream Cracker	Richester	Geral	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
1d08ae38-e689-4be9-b66e-9c6fa255b73d	0789011559027	Fit Chips PROTEIN	TSUNAMI NUTRITION	Salgadinhos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
760c921b-a302-4056-a5d4-ff95f6051c13	7896093200693	7 grãos zero açúcar	\N	Geral	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
87319687-c59c-4070-aaca-099bc5db4a82	7894900660265	Sabor Goiaba	del valle	Geral	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
5314ad21-d863-4c77-817a-6d5f095acc2a	7898370100139	Cocô em flocos	Cocô do vale	Geral	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
fd873699-1f57-4c33-b64a-5b6a0f9d995f	7891000261484	Iogurte ninho - Ninho	\N	Geral	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
ad478c78-012b-423a-95fd-34451ed58136	7898912704016	ORFEU Café em Grãos Clássico 1Kg	Orfeu	Café em grãos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
2fe34da4-fbe2-457d-a487-1846403270d2	7898692301290	Bebida de Aveia	\N	Geral	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
95e00a2c-016f-4d93-88a7-17ebd84fce90	7896038310197	Massa Alimentícia De Arroz Urbano Parafuso 500g	URBANO	Macarrão	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
1b84f085-3050-4714-b167-553a5f5eda5f	7896006751113	Camil preto	Camil	Feijão preto	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
e5c67deb-52f3-4a93-8938-448d43b0d829	7896006744115	feijão carioca camil	CAMIL	Alimentos básicos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
3c466462-4722-4a4a-8642-485230b8c744	7896273903277	Arroz Arbóreo	Caldo bom	Arroz	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
1ca042be-bc68-4e58-83db-e97daa805225	7896038300013	Arroz Sete Grãos+	Urbano	Alimentos ricos em fibras.	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
32a5d126-d2f6-4dba-ab30-3fe0fef23cac	7894904231317	Hambúrguer de Carne Bovina	Friboi	Sandwiches	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
91d459fd-58bb-4a49-93dd-8bf64f224afb	7891095028337	aveia em flocos finos yoki	Yoki	Café da manhã	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
370e6cb5-4bb1-4fe7-a8e7-6b1605869918	7891103204371	Azeite de oliva extravirgem	Carrefour Classic	Alimentos veganos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
3b0f4639-aa32-4c1c-b1c4-3de774b85f04	7898939247015	Leite Uht Integral Leitíssimo Garrafa 1l	LEITÍSSIMO	Bebidas	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
c8719f3b-fe58-4ad0-b4fd-77f456d9b8b6	7898939247039	Leite UHT DESNATADO	Leitíssimo	Bebidas	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
8b1c54da-b8b0-4a9c-8e98-4a1cffba957c	7898215157830	Leite sem Lactose 0% de Gordura	Piracanjuba	Alimentos processados	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
78017a34-2b68-414e-88ef-6cfb16e3c014	7896259412885	EMBARÉ Leite UHT Desnatado Camponesa	Embaré	Leites	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
8757152a-b787-4938-bd0e-838d03cfb45c	7898568901265	Cereal Matinal Com Açúcar Mascavo Integral Tradicional Sem Glúten Vitalin Pouch 200g	VITALIN	Alimentos veganos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
1f2a14dc-9815-4921-9623-9fce2ca294bb	7896283000430	Granola Cereais Maltados Jasmine Pouch 250g	JASMINE	Aveia	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
ca94fca0-db64-4367-9589-2e19b07c9cf0	7891098042248	Leão xô tpm	\N	Geral	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
6fcb1713-9b7c-41f1-9f21-de6e53003e21	7898917945100	Castanha De Caju Torrada E Salgada Amigos Do Bem Pouch 50g	AMIGOS DO BEM	Alimentos veganos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
e6c05d58-0817-4e17-95f6-1d795f3e5d6b	7896496972104	Granola Frutas e Mel Sem Adição de Açúcar	mãe terra	Alimentos veganos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
ff48cd30-b16c-4ca3-b167-4082c977d42b	7891095031122	batata extra fina	Yoki	Salgadinhos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
d5ce9671-ee54-4d70-97a9-11bb47ff75ae	7898915949957	Cerveja Imperio Ultra - Império - Império - Império - Império - Império - Império - Império	Império	Geral	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
9e425db5-db56-452b-8aa6-2e421abd2da1	7896327515296	Aptiva Achocolatado	Apti	Achocolatados	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
9f78eea2-8e4e-4102-b6fd-1dec7b6cccd9	7896552906258	QUALICOCO Cacau em Pó 100% Cacau	QUALICOCO	Groceries	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
a7922b4e-dc58-439b-96ee-825d71ea7463	7891048000090	DR. OETKER Chocolate em Pó 70% Cacau	Dr. Oetker	Cacau	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
d8bc4617-f871-4570-8395-079558375f04	7891008040029	Chocolate Pó Solúvel 50% Cacau	GAROTO	Beverages and beverages preparations	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
8f453732-ca99-45e0-a2e7-ec45786bb1f1	7896214533006	Geleia Morango Diet Queensberry Vidro 280g	GUEENSBERRY	Breakfast foods	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
6e6ee7ee-edff-406d-9db4-477326441cb5	7896038351053	URBANO Farinha de Arroz Integral	URBANO	Alimentos veganos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
587f2501-522b-4a69-ae5c-658c1aab1d35	7893500085768	TIO JOÃO Farinha de Arroz	TIO JOÃO	Farinhas	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
d39c8df1-f42d-49b7-9750-cb6b714c85bc	7896534400200	VENTURELLI Farinha de Trigo Venturelli	Venturelli	Alimentos veganos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
a45973c4-35c2-4bc3-abd9-b1f56362113c	7896419438014	Farinha de Trigo Integral	Anaconda	Alimentos veganos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
48f7f4dc-4d8b-4f8e-a6a8-f4339a4ce600	7891048043035	DR. OETKER Essência de Baunilha	Dr. Oetker	Aromatizantes	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
6eeae4f9-34a1-453b-b41f-3c445528bb7f	7896002311250	Pão integral	Nutrella	Alimentos veganos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
91adb99e-3479-4263-8b0b-79dbf9ebdd5d	7897771400770	Mel flores de eucaliptos	Florismel	Pastas e cremes	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
7b729b8d-7ccb-4aae-916b-807b27555a05	7896267780709	Suco uva	\N	Geral	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
85873867-9abd-4cbc-bffc-396a4e4e78c7	7898687733426	Body Protein Vanilla - Equaliv	\N	Geral	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
a7523b22-2c05-43af-9386-967964642829	7898226340757	Pão de Forma Bh	SuperMercados Bh	Geral	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
8e3eadaa-f381-42c9-8208-ae49d501d982	7898113940299	Massa para Tapioca	Lopes	Groceries	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
b6b1c03e-663d-47b6-a606-086d3888dee9	7898215151982	Creme De Leite Uht Homogeneizado Zero Lactose Piracanjuba Caixa 200g	Piracanjuba	Lactose free products	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
89c610c0-8fad-428f-b5eb-33a63b398e0b	7891331010621	Barra de fruta	Nutet	Geral	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
bff40d12-78e9-46c7-b96d-f009eb5d59d7	7898205923896	VERDE CAMPO Queijo Minas Lacfree Padrão	VERDE CAMPO	Queijos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
2f1cb731-dddd-4b69-9d0d-867835d3510b	7892840249946	Doritos	\N	Geral	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
7963b095-b2fd-4a06-94bf-c89bb9f19f00	7898928727382	Granola Premium	WS Naturais	Geral	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
8bbe23cf-d5ff-4e9f-afdc-88b9b7b37aae	7896122303029	Iogurte 3x Zero	Porto Alegre	Geral	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
4f0e9889-d728-4416-9aaf-612bfd6d4784	7891048040065	DR. OETKER Fermento Biológico Seco Instantâneo	Dr. Oetker	Fermentos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
d2fd2d4e-0a8b-4b66-936c-35fed05dd39c	7898409957970	FLEISCHMANN Fermento Biológico Seco Instantâneo	Fleischmann	Baking ingredients	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
96f9fcb8-6ecd-4a7e-b89d-27fbc1ec8fa9	7898954933634	Pan con canela	Schär	Gluten free foods	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
7c3681e0-a84a-44f1-91cf-ea61771e9e5b	7896066303680	Pão Integral Chia E Macadâmia Wickbold Grão Sabor Pacote 400g	Wickbold	Alimentos veganos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
a8a38483-6534-4dcc-8de0-11df80d2b1fd	7897110300105	AVIAÇÃO Manteiga em Lata com Sal	AVIAÇÃO	Pastas e cremes	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
7aeeb3ff-4755-4d2a-bfd7-b6e1ed9c6fc9	7898641074404	Whey Dux Sabor Neutro	Whey	Geral	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
9a9f03eb-602b-4ef3-9db5-6346f7451b43	5604123002696	Azeite Quinta Do Crasto Selection	Quinta do Castro	Alimentos veganos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
5bde1af5-1311-47b5-9132-bf0e26bb3fdc	7898960497038	Passara di Pomodoro	Obra prima	Geral	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
58f54efd-e911-4677-b6e9-0f0bde274a8a	7896036090626	LIZA Óleo de Canola Liza	Liza	Alimentos processados	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
88868b38-f38e-459f-a574-2ba4e095b250	7892840823054	Ruffles - Pepsico - Pepsico	Ruffles	Geral	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
840e69e7-7ca4-4cda-a708-148a9439cf74	7893000394117	Qualy cremosa com sal	Qualy	Alimentos veganos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
e8fcdeaf-3b1c-419c-83bc-839f668531f5	7898946900019	Chimichurri Br Spices Volta Ao Mundo Pote 70g	BR SPICES	Alimentos veganos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
46338297-659e-45c1-a59e-4caa526f00f3	7891999970053	Queijo Parmesão Ralado Vigor Pacote 50g	VIGOR	Queijos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
f28d3efb-89dc-40ba-b870-229e61d493fd	7898215150343	Queijo Parmesão Ralado Piracanjuba	Piracanjuba	Queijos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
d434d862-e201-4af6-ab52-75facc377284	7898322980031	Kit Parmesão Ralado Parmíssimo 100 Unidades	Parmíssimo	Queijos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
e1c6db1d-3d66-412b-962d-2447dbc62e95	7896926701021	Queijo Maturado com mofo azul	\N	Geral	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
ebbaf4dc-9d4f-475a-ac7a-8560b8c93c71	7898416526855	D'CHEFF Sal Grosso Tempero Gaúcho	D'CHEFF	Alimentos veganos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
ae5dcca2-545f-43c0-9f26-a9a573e1553a	7898080640376	Leite em Pó Integral	Italac	Whole powder milk	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
f1e2230a-c612-47ee-a2e1-3c11cf9fb7fd	7896001223080	LINEA Molho Ketchup 350G	LINEA	Alimentos processados	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
3984e046-5c24-4337-92d5-52065c8cf371	7891031409121	Ketchup Tradicional Hemmer Squeeze 750g	HEMMER	Alimentos processados	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
7d65f256-58c1-4d6a-96d8-cd4f4054649e	7891150027831	Ketchup Picante Hellmanns Squeeze 380g	Hellmann's	Alimentos veganos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
3836a00f-bf45-45b8-936f-6935292274e0	7896025800069	Molho Inglês (Worcestershire)	Cepera	Condimentos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
fe40067a-fc79-42ea-9277-5088b9b554d3	7898912678072	SÃO FRANCISCO Vinagre Orgânico de Maçã 4,2%	SÃO FRANCISCO	Condimentos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
8ccc5b7c-7980-4a21-886c-7df0db15adbe	7897179000176	Pão de Forma Naturista 20 grãos	Vale do Sol	Geral	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
d48a90cb-207b-4715-93e1-f1f48290d7af	7891025124627	YoPRO sabor Baunilha	YOPRO	Bebidas Lácteas sem Lactose	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
7d5a2604-09c0-4b92-a316-5a1ff9690991	7891203069719	Pão Bisnaguinha Integral 30%	PANCO	Geral	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
f9a61cea-15fe-459d-a428-d8b78d83bd75	7891772154670	Granola Light Kobber Passas e Maçã	Kobber	Alimentos veganos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
766fdd47-2920-4fec-b832-af4e41754e26	7896043014004	Condensado de Soja Soymilke	Soymilke	Pastas e cremes	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
bb40663a-6781-4599-bd91-3f89b0f05f7b	7896714291239	Omega 3 - Neo Química	\N	Geral	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
d91bfe2a-d2b4-4bf9-812a-1e60b99e9d44	7896496995219	Cacao Granola	mãe terra	Alimentos veganos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
f09bee77-05fc-4994-a2ca-449df68be40d	7898115750025	Granola TIA SÔNIA	TIA SÔNIA	Alimentos veganos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
6558e350-1420-4346-933b-029ff2639ee7	7899767443846	Tapioca Nossa Goma Pacote 500g	NOSSA GOMA	Groceries	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
4ccf909b-81a9-4f99-8906-0f324f2343fe	7898055421504	Aveia Em Flocos Grossos Naturale Somos Aveia Caixa 170g	NATURALE	Alimentos veganos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
4ca87a3e-3452-4a28-bc01-dd01f30ee67b	7898649351248	Pasta De Amendoim Crocante Integral Fit Food Pote 450g	FIT FOOD	Pastas de amendoim	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
e57b8945-f830-4e60-9fa3-fca3eedbc991	7896045506040	Heineken Long Neck - Zero Álcool	Heineken	Bebidas	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
61f1bb73-1d79-4e95-b5d7-d6cbc6532b73	7898557010053	Chips Mandioca, Batatas Doces E Mandioca Com Beterraba Original Roots To Go Pacote 100g	ROOTS TO GO	Geral	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
b435c22b-8649-420e-ab26-f637f9f77744	7898962571583	Suco de Laranja	Natural da Terra	Geral	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
9f48a21e-7f98-46c3-b51f-abfa669b4278	7898994481317	Granola Premium Zero Açúcar Grano Square	Grano Square	Alimentos funcionais.	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
27baaac4-b545-40e5-a7b6-620c3c036976	7896283007347	Aveia em Flocos Finos Jasmine	Jasmine	Alimentos veganos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
eae349d1-24e3-4a39-9907-4e798faadb32	7896289900581	Tapioca	Akio	Alimentos veganos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
8a8197a5-39c1-4929-9d0e-15dcf20aef76	7894904271733	Margarina primor	\N	Geral	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
1f562eb6-f92b-459a-baad-59f49fc25dd8	7891164027681	Leite em pó integral	Aurora	Produto lacteos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
c36697d3-c5d1-4d9b-bd84-d635ced108f6	7896259412861	Leite Integral	Camponesa	Leites	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
35e45a4e-82dd-419a-a7d5-0ee88d5ab39d	7896085087189	Folhata adria	Adria	Geral	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
94f2ebb6-9411-43fe-b97b-de5203e9f55e	7895000318629	Arroz Branco Qualita 1kg	Qualitá	Alimentos veganos	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
fbc1c486-5b1f-4191-9827-9d4b3b887a40	7898951850064	Macarrão Com Ovos Espaguete 8 Barilla Pacote 500g	BARILLA	Macarrão	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
1efc0d54-610c-4482-98f1-0820c02fceba	7891097106125	Wheyfit de abacate	Parmalat	Bebidas	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
195f9aa5-deef-4390-a745-a4185b4e85fd	7898952041348	Granola. Austrália	Hart’s Natural	Alimentos veganos	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
4a60377e-a2b2-44b2-a9bc-84294a4611fa	7898994064732	Granola de Tapioca Manioca - Caras do Brasil	Caras do Brasil	Alimentos veganos	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
d137cfad-3e9f-4939-a345-8548f55e97b4	7897900310765	Barra de Cereais	Trio	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
85c9db18-5f57-4d2d-ae9b-24e151470d81	0095188878572	Tampico frutas citricas	Tampico	Bebidas	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
bf19a36a-b71d-4bd6-b2bd-a19382cceeb6	7898994972112	Leite Vegetal de Aveia	Naveia	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
9b72c3f1-7cbe-4a98-bbc9-145f8a6e79b0	7898024396994	Bombom Ferrero Rocher Bandeja 150g 12 Unidades	Ferrero	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
9c80c95d-5d1e-46aa-8bd1-c8ea0d58d205	7896183210175	Leite desnatado em pó	\N	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
0db8e923-41ea-4e3f-85b1-0cc754ef252f	7898963777809	Biscoito de Amendoim com Chocolate - Klein	\N	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
c6232b5f-c025-475c-83ac-395037f16d42	7891137000017	Valda friends sem açúcar	Valda	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
5f25ee2d-edb3-494a-be8c-5a674b089e42	7891000382349	grego calda morango	Nestlé	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
f015334c-3eac-400b-9473-39fda04d4db0	7891118025442	Butter Toffee - Arcor - Arcor	\N	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
310cb263-9a54-41c6-baed-fc380a59d898	7896256066326	Chips de arroz - Natura Life	\N	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
2e2e90ba-59e7-4bab-9f40-90fab189fce1	7891091010503	Farinha de Milho Flocada	São Braz	Flaked Cornmeal	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
071045f7-c52d-4875-9600-2d39cb61097f	7896238100093	Iorgut natural	Matliat	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
ef5823c7-c028-4a07-be5e-7d72967c3e0a	7896005403204	Suco concentrado de maracujá	Da fruta	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
a5fd3153-3e6b-4afd-9e5c-d255c969cfef	7896331100587	Doce De Leite	Aviação	Pastas e cremes	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
753133a7-6316-4e19-858c-5a8eed5a423e	7896623100509	Suco Integral Laranja Xandô Garrafa 900ml	XANDO	Bebidas	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
2579c62f-7343-4791-8732-9d608b588aea	7891010518158	sundown	\N	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
000f66e3-1c6b-4e43-a3ca-6b2c60912c44	7898215155195	LEITE BOM INTEGRAL - LEITEBOM	Leitebom	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
02c8e3cb-c337-4484-af97-fc3b130d0e2f	7897429363570	Pão Charlotte zero 60%	\N	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
545e1696-b04c-4efd-b3b5-c3aad4fb7319	7898142865891	TABLETE SPECIAL CAST CAJU 60G ARCOR	\N	Salgadinhos	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
8b29d034-442c-4809-8beb-48b0d5be3c03	7896691100685	Iogurte desnatado	\N	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
9f89eab1-7fae-453e-bda6-a4bcca18d7e1	7898933733934	Miojo Sandella Lámen Sabor Galinha Caipira com Pimenta	\N	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
5946a344-5fbe-46b8-9198-fc9c5ccfcf2d	7898080641564	Leite condensado zero lactose - Italac	Italac	Leites condenados	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
22f22289-fe47-4c26-a158-4f8e97245985	7891203058607	Wafer Golden Black Baunilha	\N	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
a92d3a4c-9441-4254-95f7-aab3d9771c59	7896061302244	Bichos do Brasil Sabor Banana	Bela Vista	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
dd979fc5-1921-4348-8e85-81a7002040e8	7896085087165	Biscoito Recheio Cheesecake Com Geleia De Frutas Vermelhas Adria Tortinhas Crostata Pacote 80g	ADRIA	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
3108001b-aa05-487e-8ce6-4c66f635a2ce	7898948313510	Farinha de Tapioca - Tap'oka	\N	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
5167ac8b-4050-449c-a193-fccb528dccf9	7895000471591	Granola mel	\N	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
8421f765-d527-4a0d-8c19-912943ecdd84	7896181709558	Flocos de arroz Caramelizado	Da colônia	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
85ae8fc7-6896-42d9-b8c1-049fb7eb0623	7898692301993	Jungle	Plant Power	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
2de98f96-d16f-4ef8-a0c3-76711b30d875	7898571520156	Ricota de Bufala	Vitalatte	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
ccc7c3b0-68ea-4284-8f5d-824f2c27779f	7895144605678	Mentos Mint Kiss Menta - Mentos	\N	Salgadinhos	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
e797454d-ad74-4878-baa7-643fbaf1e25d	7896045104499	Cappuccino Pronto Power Whey	3 Corações	Bebidas	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
f2711a5e-f62d-4d59-b936-8a0f483d3a93	7891515488536	Filé De Peito Bio	Sadia	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
12b01642-9bd8-4cf3-9df4-2702d25bfb84	7896256040791	Granola castanhas nobres - Naturallife - Naturallife - Naturallife	\N	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
8f9f9028-0f85-4da9-9b7e-eaf11181885f	7896711600614	Cuscuz - Guará	\N	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
0ede4db3-59c9-4e43-924f-bad1e09db1fa	7891091048605	Granola	São Braz	Grab	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
f0ed0776-b9dc-477a-97a9-a61fa9d5750b	7896038312191	Macarrão Penne farinha de Arroz - Urbano	\N	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
d68cd721-7676-487e-b670-9c387d7c3673	7891167831650	Patê De Atum	Gomes da Costa	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
16a4b495-3954-4120-99d9-428f0e17c96f	7896045318377	Pipoca doce	Magitlec	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
d5be5c6f-3514-45b6-a923-9172bbf0ced4	7898571521207	Iogurte Desnatado Ameixa Zero Lactose Yorgus Completo Frasco 250g	COMPLETO	Sobremesas lácteas	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
4d5bb23b-6072-4da3-8429-aa428303e48e	7896030519475	Queijo Coalho	Tirolez	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
66c79fd8-2909-4146-b0be-2e81b9d8cdda	7896005403525	Grape Juice	DaFruta	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
a35ae3b2-40c0-4467-a100-481b34e1ae75	7896484411929	Bebida láctea uht sabor Chocolate	Seleta	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
c9aed258-554b-4f6b-ba9f-21c859335162	7898994769026	Macarrão instantâneo sabor carne Maruchan	Maruchan	Macarrão instantâneo	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
ef114482-11eb-4f91-b137-0f4097820f59	7891962055459	Panetone com gostas de chocolate	Bauducco	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
315cafee-c26e-4d7a-8ea5-d209cef30008	7898921567411	Batata Congelada	Uai	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
591f74eb-16c2-4a80-8774-0602f466b715	7894900701753	Coca-Cola Zero Açúcar 1,5l	Coca cola	Bebidas	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
42106491-5d89-49d6-9c81-d03807f0e4ad	7891000364512	Chocolate em pó solúvel (Chocolate do Padre)	Nestlé	Cocoa and its products	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
5d03c40a-8a01-4dfc-b4dd-9254ad0bbd3b	7891962071695	Biscoito Wafer, Chocolate - Bauducco	\N	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
fe37a847-1c5d-4c67-9e85-02f52b05515d	78938595	Suco de laranja - Del Valle	\N	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
9426ef95-cfb6-44bb-bff6-4c58877e89ef	7896007811021	Aji no Shoyu	\N	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
06d3aa34-c237-48aa-8322-bd259c4bb085	7898969895354	Papapa maçã e canela 60g	Papapa	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
527e211a-47e4-4866-a808-e798df826596	7891150087606	Granola	mãe terra	Alimentos veganos	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
9b0cf3f0-516e-4670-a9d5-298eef562012	7896202891484	OLIVEIRA	\N	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
a13004f7-ddf1-4d02-8c49-8f3b9eebc917	7909389238154	Creatina monohidratada - Soldiers	\N	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
794b813f-53f0-410a-9e69-7a8642b0d523	7896180786826	Doce de abóbora e maçã com coco cremoso	Aurea	Alimentos veganos	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
2874840b-fa6c-423f-aa4c-5fe88c36c67e	7896011105178	Flay churrasco	\N	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
3e871556-2162-44f9-bb8b-3369d63fd11b	7891025122067	Yopro morango	Yopro	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
91d0290d-f5ed-43eb-888c-f3cd79c280f9	6893904504002	Eletrolito Mix De Frutas	Powerade	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
36bba88c-18f0-4962-8190-53f113e43b84	7896016509810	Farofa Pronta - Granfino - Granfino - Granfino	Granfino	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
0acfbebf-6e86-4701-bbc3-d6322e898a49	7898962076019	Aveia em flocos - Barano	\N	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
d1828172-41a9-4d6f-8dd2-2a4305de1783	7898377662463	Refrigerante lemon ice - Iti	\N	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
cb6fbf8b-aa33-4d36-9279-611c996edd42	7896653700793	Bananada Zero	Flormel	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
4b1f3dcd-2abd-440d-b0c4-af85c04cbfb7	7891097106132	Fit Milho	Parmalat	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
a7b7b814-5846-4396-85e8-142deae809ff	7898034923050	Requeijão light	\N	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
6d6117e3-0e9a-4a97-8c0b-c7be04ddc80e	7896004402192	Água de coco	\N	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
6d3bf8cd-37a9-4b14-ad4e-632e08d044b1	7896073901015	Pão Sírio Médio Tradicional Pita Bread Pacote 320g	PITA BREAD	Alimentos veganos	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
31eb9398-eba7-482d-9e75-1cf73c30d109	7891203010568	Pãezinhos Panco Egg Sponge Pacote 250g	PANCO	Alimentos veganos	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
a915afcb-c0c8-437d-9172-e74ad3189c4e	7896066317595	Wickbold Tradicional	Wickbold	Alimentos veganos	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
23e07ad8-3917-45a3-a668-133c5590a20a	7898591450723	Minhocas azedinhas	Fino	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
181a4f8b-f868-4d38-b772-2fde753ba7cd	7898205923643	Coco LacFree	Verde Campo	Sobremesas lácteas	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
f6eb34ba-f6bf-41ae-968b-f9d171e1a715	7898951336056	Iogurte Baunilha Polinésia	Delicari	Sobremesas lácteas	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
859d2c5c-2e9d-4e15-9c62-e6cfffff2e71	7891097102936	Iogurte de Jabuticaba Batavo	Batavo	Bebidas	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
27bd02f2-5ed1-4143-8b0b-193907e94c4a	8710624481179	Ovengebakken granola havervlokken	PLUS	Alimentos veganos	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
d0a92240-33f6-4e84-a64e-7068182f23df	7896022201746	Macarrão De Sêmola De Trigo Grano Duro Integral Fusilli Renata Superiore Pacote 500g	Renata	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
c56a5a46-7271-41fb-8257-9050656c0218	7891143019065	Requeijão cremoso para dietas com restrição à lactose	Polenghi	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
5a059d32-1c37-44cd-8741-f5b9c1d9ac8c	7895000529414	Milho sem Sal	Qualitá	Alimentos veganos	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
339d2eab-3db7-444c-b8a6-ace9a0cc8743	7899659900785	Milho	Bonare	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
6070853c-d7ae-4f8e-b68b-0dc80cf0a97f	7896022205348	Cracker Gergelim	Renata	Salgadinhos	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
21e07895-3f9c-4071-900c-4bf0a64ee897	7891156001040	Pack Leite Fermentado Desnatado Yakult Frasco 480g 6 Unidades	YAKULT	Leites	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
e8f41178-0e8a-48a4-91e3-d72a424de75d	7898930142791	Passata Rústica	Salsaretti	Alimentos veganos	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
0048ac14-1c5f-4155-bb4a-2c70e4c99766	7896003739756	Rosquinha	\N	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
34968494-4b2f-4e62-8767-cf0a297e9241	7896089089882	Café solúvel	Lór	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
50e4b9b2-de50-423e-8d5c-93da7921f2ff	7897900317115	Barra com amendoim, castanha de caju, castanha do pará, amêndoas e uva passa	Trio nuts	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
f6ae31aa-b740-42e5-ad42-59321db47564	7899686702901	Granola integral com cereais e banana-passa desidratada	\N	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
fc884bea-9036-44ea-8959-691e461a7046	7896105801030	Batata Frita Clássicas - Corte + Fininhas (Preparo na Airfryer - Pronto para consumo)	McCain	Alimentos veganos	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
f029eb02-2f58-4790-8042-bbb7f6ea4fac	7896798603287	Barra de banana e morango	\N	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
eb8f272f-5be7-4100-8dc8-461c213f5d6f	7898377661848	Cabaré ice	\N	Bebida	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
6225f2bd-c3f2-4d45-be7f-444e408a568c	7895144603063	Mentos frutas vermelhas	Mentos	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
a0cc2f07-fa5e-4ef7-af78-57888dc1b155	7898080643162	Pro Play Pasta de Amendoim	Italac	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
4ffbd509-9a89-4340-8df7-9c8085177048	7891265232137	Pistache Pasta	La Ganexa	Alimento	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
126dc14f-2892-436d-aac7-13cd19c4f991	7896945403111	Molho de tomate tradicional	\N	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
6d5d3ddc-0d64-4531-a6ea-b213b9480061	7895827564537	Pasta De Amendoim - Chocolate Crocante	La Ganexa	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
e6037c3b-c4c5-4299-a76e-866cdd2bc368	7898908593020	Vinagre de fruta maçã	\N	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
11762b5c-f379-4ec3-8011-3b5460461c67	7896005280911	Bolo Caseiro Cenoura	Dona Benta	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
6caa3862-56bb-46ec-9bae-729d0d1a7c6e	7898380412437	Salgadinho sabor presunto com milho e quinoa	Believe	Salgadinhos	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
72fa65d4-69e3-497a-8b35-af2364a44c59	7891150055070	Maizena	Maizena	Alimentos veganos	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
081a6a42-e8d3-4148-b335-189be775cd23	7891025115335	Coco cremoso	YoPro	Geral	open_food_facts	2026-06-03 13:56:48.653	2026-06-03 13:56:48.634
f475c6a9-632b-40e5-a48e-f7ae55c62ddf	7898571521634	Cottagy	Yorgus	Dairies	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
325aa08f-46be-41e5-84f9-3058cea64faa	7622210535016	Bis Limão	Lacta	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
ec3a3b46-5e18-48d2-8d8a-300ee57f1062	7896256600780	creme de leite	Tirol	Creme de leite	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
cac2d647-8386-4c28-a451-2bc49e430944	7896229800254	Iogurte Parcialmente Desnatado Natural Fazenda Bela Vista Copo 170g	FAZENDA BELA VISTA	Sobremesas lácteas	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
20a32c74-f5b7-4a7f-b781-c1f330b33fed	7898230897667	Spaghetti	\N	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
e5162515-9446-4b90-ace0-f7f2678f7158	7896009301056	Sardinha Sabor Limão	Coqueiro	Alimentos enlatados	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
a4c84743-5014-4161-a6b4-12f359722cfd	7891152801446	Cream Cracker Legítimo	Fabrica Fortaleza	Biscoito salgado	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
1bbd686f-c7ac-4cfa-833d-8b27905ec400	7908286500876	Choco post chocolate	Choco post	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
73300ebb-f2bd-4a70-a966-cebc93511d8f	7898055420514	Aveia	\N	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
89c3e039-a102-4443-a079-ce15111a3931	7896104808665	Geleia de morango	\N	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
c5e62525-0943-4459-a553-7d4c113396ed	7891000261965	Leite Em Pó Ninho Zero Lactose	Nestlé	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
b1dc9e5a-51e0-4a1f-9658-30044b279b8e	7899786900047	Pão Cenoura	Nutrivida	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
56de1019-5752-42b1-b8ab-553b9b18ec7b	7898641074503	Whey protein Shake Chocolate Branco 250ml	Dux	Dietary supplements	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
17ee5f7a-e550-481b-bcbd-4d803bcf4893	7898215150480	Doce de Leite Piracanjuba Zero Lactose	Piracanjuba Zero Lactose	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
8cc4fe09-c41e-4cbd-b471-a75aa5b82e84	7896071030069	Agua e Sal cream crackers	Mabel	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
c5de74fc-5860-46ad-bfca-7f9f1fc2e507	7896071030007	Rosquinhas de Coco	Mabel	Rosca	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
29d4e56f-6c28-4b88-b483-04870565f398	7896024761637	Biscoito Maltado Black	Piraquê	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
a093b785-c635-42ad-bc04-725f63acb087	7891000369340	farinha láctea	Nestlé	Alimentos infantis	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
dfc7b4c0-8bea-4344-a538-18b4769823b2	7896327516187	Gelatina de maracujá APTI	APTI	Gelatina	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
241b407f-0aae-4691-859d-87682429e8c8	7622210576071	BIS	Lacta	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
fd9cdc17-cd0f-4843-8699-584f0fd40aca	7892840822446	Doritos	Doritos	Chips	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
2070f046-2286-41a4-a990-8c4a3fcdd7d2	7896073900810	Pão Tipo Sírio Tradicional Mini	Pita Bread	Alimentos veganos	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
71b95813-dbe4-412d-873c-cd0b6fa2eecf	7899621109130	Best vegan whey	Athletics	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
15cb8453-c0f2-46b4-a616-3630097566a6	7892840822583	Stiksy	Elma Chips	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
97b47106-9e8b-428d-afe2-5e51ef1cdfa7	7898904874512	Pão de leite	Muffato	Alimentos veganos	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
0c86fccb-dd1a-4407-ab79-c94b48081bac	7892840823481	Doritos Dinamita	Doritos	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
68b55244-7a90-487d-a96e-dc73eb611996	7898904642685	Bananada com cupuaçu	BanaBrazil	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
40b283f5-6098-4963-be69-9663af79f997	7898378180751	Suco de caixa	\N	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
995a44eb-d62f-46b2-a702-c40cd6b71283	7898378180072	Suco maratá de maracuja	\N	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
7fa239ca-1e46-4ef2-a9b0-c15a443b1520	7896005802397	Cappuccino chocolate	Três Corações	Bebidas	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
5f530511-9811-4c03-99a9-03a5bd9159a9	7896733400575	Queijo mussarela	\N	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
ec62054b-147a-4e35-a3bd-3e6e578f5af3	7898061682401	Farofa costelinha	\N	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
cfb8b59e-5ee1-49c6-97d6-74850f438f5f	7896236305469	Sequilhos Sabor Leite Condensado	ValeD'ouro	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
d2cce8c7-2bb6-48bf-a277-8ec6a6792e89	7897542820226	Ovo Extra Branco Categoria A	Lana alimentos	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
94e1ac80-d7c5-4159-931f-1b9c2e203bb3	7898915414011	Leite UHT Integral	Terra Viva	Leites	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
08da7616-cc84-47a1-8889-cbaa70937fa2	7891164028305	Zero Lactose	Aurora	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
4ea31dd2-83be-433a-84b2-f6022930adf1	7896327501862	Farinha de aveia	\N	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
12b88704-7f15-4067-9439-6a6281d69bcd	7891991295086	Cerveja Original 269ml	\N	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
7f0612e0-ff9a-4e65-b26a-bf0d9772330f	7898278402526	Maionese verde	\N	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
bf8f34ad-8924-4ffd-ba02-e5983fd56d74	7898954933658	Mix prático schar	Schär	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
2b7f940e-77c3-4ed3-b9bd-cf68a2845f55	7891000382837	Snow flakes	Nestlé	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
05324399-dd9e-4def-8545-ab254c801ffd	7896252205101	Milho para pipoca Premium	Beija Flor	Salgadinhos	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
79c7c099-143f-49a1-afd1-77c33a4cf45f	7894900660401	Suco del valle manga	\N	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
411ddacb-f6ec-47bd-8294-845465c05744	7898596082769	Água de coco com polpa de coco	Copra	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
6ff4c7f1-6d7f-4d9a-b2c4-e88642610597	7896063201354	Cookies sem glúten (sabor morango com gotas de chocolate)	\N	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
405703a4-75a7-44a2-8476-3cb318d0dd88	7898215158004	Leite Em Pó Desnatado	Piracanjuba	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
ac219b25-3016-4b02-89cd-e310dc871833	7896181710387	Pasta De Amendoin Amendo Power Com Cacau	DaColônia	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
2f193562-9a02-4fa4-81b8-0613ad8db094	7896716311195	Salame tipo italiano	Pamplona	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
08acc862-15cb-4aa5-b6c7-b61ede48c8f7	7896267780754	Suco misto de pêssego e maçã- 1 litro	\N	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
38fb25b7-5ac0-4d87-8034-2554b900304e	7891143017788	Polenguinho	Polenguinho	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
1299357a-73fa-4c60-ac33-042fd834471e	7896384100053	Arroz parborizado	\N	Arroz Parborizado	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
d6b57323-86ce-47a6-89bb-cfdc0c81b3e3	7891515620981	Linguiça calabresa	Sadia	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
b884bd76-298c-4df7-bd13-9d6a1a98d460	7896181709534	Pé de moça	DaColônia	Salgadinhos	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
24d5f5cc-9df9-489f-940f-a15e2db7a4f4	7891150097858	Granola De Cacau	mãe terra	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
7fa0b483-562a-43b8-b161-eaa991e61e24	7896037913719	Suco de uva integral	Quinta Do Morgado	Bebidas	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
42e3544d-562c-4db5-a578-bec0c4260c33	7896063201422	Rosquinhas	\N	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
7a7fbaa8-38ca-4480-92c7-8dbc45e4293f	7896002311410	PÃO DE FORMA TRADICIONAL TRADIÇÃO	TRADIÇÃO	Alimentos veganos	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
eced9224-5b37-4506-8cbb-22ae0b3cb88f	7896071024433	Biscoito de morango	\N	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
8c7c764e-d82c-4ce5-9f46-6c28c6c9f697	7892840823382	Lays salt & vinegar	Lay's	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
5eae1e67-7c77-4ef5-bf56-464ddccbb555	7898958338015	Doce de banana coberto com açúcar	Bananinha Santa Branca	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
eec3976a-5011-4567-a742-15345a435c22	7898695690025	Queijo coalho light	Ilpla	Queijo	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
4f6e59bc-29ca-4e4a-95da-654b4cf983e7	7896791904107	pulsi 1,1kg	\N	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
28039659-f6e1-4654-a1a0-c037e6862a14	7896003739558	PIT STOP ORIGINAL	Marilan	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
556ac957-4a34-4dba-a64f-0c6854be5d5e	7896036099384	Óleo de coco sem sabor	\N	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
1b8e7b45-73f9-4b82-8400-d34cbfd66663	7892840822804	cebolitos 91g elma Chips M	elma Chips	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
dc5bc0ad-4ce8-4b6b-a8ac-a935735e3c49	7891097105951	Manteiga extra sem sal	Galbani	Pastas e cremes	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
405e490b-44f9-4cfa-9687-87821f3a1c0e	7896256065497	Chips de Arroz Integral e Milho Sabor Mostarda e Mel	Naturalife	Salgadinhos	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
ae9c13dc-3281-45b4-a0d0-49f7b02420db	7896058593150	Pettiz amendoins crocante ao forno	\N	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
09f07816-3778-4625-982a-071287e9b719	7898958658243	Mostarda amarela	\N	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
80267bc5-0daa-4279-a93e-a565b38547a5	7896283005602	Chia Em Grãos	Jasmine	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
26a3c287-b2c9-4ce2-91ff-87f27baf1530	7896051168027	Creme de ricotq	\N	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
7a8e2749-2c40-4089-b878-f99a4af57f85	7898623461420	Molho barbecue	Chef nobre	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
5a7b39df-fbbd-4b9c-b6a6-67427e6f0bad	7898034922343	Iogurte laranja, cenoura e mel	\N	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
0dd62aef-6668-45aa-9442-a849a02948c3	7891098040732	Matte leão limao	\N	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
0aa8509f-5895-44a2-9c14-ad38cb9b3886	7898944774391	Iso whey	Max	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
8592151f-9d2e-45c3-b64b-6fec7a84c5f5	7891150026001	loção	dove	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
957fae69-96f4-473d-bc46-4cfca5f4253a	7897977910295	Pasta de amendoim integral	AMORE PROTEIN	Alimentos veganos	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
803e5dbf-6cd1-4dad-9e8e-37218f6bafc2	7891164026424	Pizza Pronta Calabresa Aurora 460 g	Aurora	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
caacb136-118f-48aa-b7af-b30d30bbaa5e	7896508200034	Açúcar refinado	Alto alegre	Sweeteners	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
01f7413b-0363-46b0-b6ae-04efbb2f42b8	7896045109647	Três corações cápsulas	\N	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
fd8df574-a915-4dbf-9398-30651d7bd165	7891152800746	Amori max	\N	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
66faf93c-f72d-4719-b056-7883ade0190b	7891962050942	Cookies	\N	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
3856ede6-782a-47dd-b250-0726bbb52fbf	7893000079311	Margarina	\N	Alimentos veganos	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
3016dc21-3d73-48cb-b581-b79dad2bf0e9	7891150080546	MAIONESE SUPREME SQUEEZE HELLMANNS	Hellmann's	Condimentos	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
14cfd219-a579-48c0-a4dc-d4546d3711c8	7896417205014	MAC INST CARNE VILMA	VILMA	Meals	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
2f3f6b0a-f68d-46b5-856e-0c1e28632789	5601024022013	AZEITE EXT VIRGEM SELEC ANDORINHA	ANDORINHA	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
024f82e8-c816-45fa-8f1f-48b4952c5f1e	7898616501775	Cream cracker	\N	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
53966ce2-4516-4bb6-8a66-d8bfea02a0b2	7897685916183	Paçoquinha	Santo Antônio	Alimentos veganos	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
571d5218-876c-4d71-ba1c-57ea1936ccb0	7898169030432	Aveia flocos finos	\N	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
7137c2d6-7203-4741-aeb1-8eced7c1fc25	7891097105128	Creme de leite levíssimo	\N	Leites	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
bf2436d0-3d81-43d7-a892-228a5386eb42	7896986276316	Bytes	\N	Geral	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
af596b6a-ea3f-4173-be25-ca55ceaf6a1b	7898637354640	Coxa De Frango Desossada, Arroz, Feijão E Farofa	Liv Up	Meals	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
40cf0d7d-fcea-421c-bd93-57a2584465ef	7899916916931	Leite de Aveia zero lactose	Natural One	Bebidas	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
7f0acfa2-016f-4189-938e-ef96dad6f2a3	7891097105876	Queijo Parmesão Ralado	Galvani	Queijos	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
d40a3a97-9145-4b9c-b8e9-de25a29668f8	7899686704691	Suco de laranja integral	\N	Suco	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
b948cd5b-b01c-450a-a653-45d5e22f90f6	7899916906437	Suco de caju	Natural One	Bebidas	open_food_facts	2026-06-03 13:56:51.602	2026-06-03 13:56:51.584
4a40f823-0387-4af1-9ae7-7033bf4fa75d	7892840822910	Salgadinho de milho sabor queijo	Elma chips	Salgadinhos	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
ea34c6a5-d324-40ef-8920-59cd2c52b770	7896063281318	Granola Tradicional Com Castanhas De Caju e Uva Passas Vitao 800g	VITAO	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
ad7062e3-23f8-4a12-a308-687c6954e383	7896986243622	Pão de Mel de doce de leite cacaushow	Cacau Show	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
fe7b925b-4229-4142-bd6d-7e42425918f3	7899676514057	Flocão de milho	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
20c9d3b7-79d0-4a1f-b6c8-a04df9bf0897	7898600721578	Brasa Angus	Brasa	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
5dd22cfd-8432-40f9-956f-e42b97efa95c	7891032015505	Extrato de tomate	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
ca0bdb80-2363-486d-9dbe-91cf2cf59259	7896184800184	Cuscuz	Nutrivita	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
773f7fff-84d2-4175-9efd-a520576660de	7896022204921	Mistura para Bolo Aipim Macaxeira Mandioca	Renata	Cooking helpers	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
c00a9705-3f9e-4bee-afc9-788d751d2817	7896380500017	Ovo Branco Grande	Per’fa	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
3ff75935-41d6-4eb2-9d53-efd64a2434e5	7895144892832	Chiclete cool white	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
45a76cdf-bd53-4c0c-96c3-e0e49d742dcc	7898007290295	Feijão carioca	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
a667a149-d3aa-45b5-81a0-ceba9b222d0c	7898055421535	Farelo de aveia	Naturale	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
97e01c8a-0caf-4152-86a7-c2a4c3acc278	7891079011805	Miojo	\N	Alimentos veganos	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
8b815ac9-80c1-4a85-9be8-c28af14fbd93	7896183210052	Leite em pó semi desnatado	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
e457e08a-9911-4b70-b4fe-8cb9e72af2f8	7898965212988	Creme de avelã	Bendu	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
b8a3b5e0-e4d4-4c21-9a11-cce6311e2378	7896058259032	triunfu choco	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
beefe1cd-0f89-41c6-aaf3-49a47e19f339	7896004010298	Pringles Gigante	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
73155bac-cb30-4870-a00f-37b357c7537d	7898205925562	Iogurte	verde campo	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
1626e83c-33bd-4bc9-9d53-df4f253ba4b2	7898938321624	Uva verde	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
0f084a7f-b0b9-4b32-87bc-d5d9800bd988	7891340365583	Biscoito atrevidos	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
6db22af5-dc5e-4052-a069-acec494e3d8e	7896333044261	Geleia de morango zero açúcar	Mercator	Geleia de morango	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
44b809cc-78ca-4c1d-98f9-b1fa232ffef1	7895000374977	Leite	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
24d970fc-f243-4f93-8df0-35fab564e23d	7896180785881	Doce de leite	Aurea	Pastas e cremes	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
2db307f9-151f-406b-ae0f-0d240bcc8927	7898651400644	Chá verde	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
c61cbc04-eb5c-4683-b93a-d359c09163af	7896704109421	Geladinhi	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
d28f0294-cd5d-4d9a-9b8c-a17e4c00e7ce	7622210534835	Chocolate Ao Leite	Lacta	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
b7e69169-2de5-49f9-bb01-1b9791361d27	7897179000022	Pão de forma uva passa	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
5b9172e5-30aa-4c67-8dc8-b579aa334e93	7891000288474	Neston 3 Cereals	Nestlé	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
4c7d9377-5691-4e53-8cf3-85be295a35ee	7896050201633	Proteín booster	Moving	Suplemento alimentar líquido	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
80515e1c-f326-4f8d-ad0d-fe594a49f4b9	7898585460028	Pão sirio	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
9e5e2441-62df-4382-b4ff-38f0990bc096	7896117100350	Sardinha em óleo	Palmeira	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
b721f258-8ecb-4464-9b11-cc5b973b3046	7891962071404	Chocottone recheio sabor mousse	Bauducco	Salgadinhos	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
11188b80-1d99-434f-a186-ce339f9b0d7c	7898226100085	Mel	Apiário padre assis	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
d4a43a33-f41a-4ccb-9507-bfc1c4374a38	7896022200275	Macarrão espaguetinho 9	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
c713da30-47f1-43bb-b6e8-c1d34026b11c	7898636193516	Suplemento alimentar de eletrólitos	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
b843141f-37b5-46de-9a7a-f91098768c80	7896022207663	Biscoito cracker fermentação natural	Renata	Salgadinhos	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
72d50f88-5419-4f54-8918-6d6cc49723ff	7898215158448	Leite em pó	Piracanjuba	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
ceff9676-749c-4a5f-9ab5-898147bfe4db	7896062400079	Catchup	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
df34d327-ed1e-4fac-b67a-e0654af62881	0618341522992	Canja De Frango	Mexidona Foods	Mistura para o preparo de sopa	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
80a26e1b-d025-4684-8656-083f3ee908c3	7898636193882	Sorox	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
d51e4955-c517-4588-816f-c4c04459cd4f	7896438200593	Carb Up Gel Super Formula	Probiotica	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
89fd66f6-0509-4cbf-a748-320307998ae4	7898677570017	Psyllium Husk Flocos Finos	WeNutri	Alimentos veganos	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
0296d8df-5b72-46d3-acf3-ad9e2e4d5558	7896051167006	Iogurte Itambé	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
08d40e1b-08fc-4a18-8dca-e6f5a028af34	7896200021364	Biscoito mignon	Zezé	Salgadinhos	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
39c66cd1-99a4-413b-a5c1-659f4f91379a	7896117600041	Farinha De Mandioca Torrada Fina	Deusa	Mandioca	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
19ab34e0-38db-4168-b53e-1467959a5d38	7894900702217	Coca-cola Zero sem Açúcar 12 Garrafas 200 mL	Coca-Cola	Bebidas	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
8a3be7f8-8f89-45d6-89f0-045fe9aef6d0	7899970403415	Hershey's Special Dark Amêndoas e Toffee 73% de Cacau	Hershey's	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
ebec026f-3119-4534-b690-de9f987abb81	7898658060032	Pasta de amendoim integral	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
3cb2e423-3d50-4e88-b57c-f02d2706eb35	7891962071619	Cookies Caramelo Salgado	Bauducco	Salgadinhos	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
59715d48-1301-422b-9807-1a814b4ca1e5	7898417570024	Pão Árabe	Tenda Árabe	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
b8bbe387-aca0-4776-b357-4a98bd55db03	7898959612015	Manteiga com sal	Sô Minas	Pastas e cremes	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
d7e04e5b-7c4b-45cc-8467-bd68019c3208	7896036000816	Extrato de Tomate Elefante 1,04Kg	Cargill	Extratos de tomates	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
a146e20a-8048-48a7-98c7-0bd5e545f2c3	7896411800215	Cobertura caramelo	Selecta	Cobertura de caramelo	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
890ee2cf-e655-4cc6-a582-c466c7fb20ea	7899970403491	Chocolate sabor shake de caramelo salgado	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
768335a8-418a-4ead-a2cf-4c32be11f61e	7891772142219	Granola Tradicional Com Mel	Kobber	Alimentos veganos	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
eb20f7c4-033a-4856-802e-f63c100b88dc	7896843200539	Bioleve zero limão	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
2c4f2399-f773-4dc3-8064-7f57057a1195	7891700011075	Tempero Arisco com Pimenta	Arisco	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
04159d06-7a65-40e7-b9e3-35e3d62949bc	7891000412046	Kit kat triplo chocolate	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
21910b54-2935-4e46-8e0c-48993946e5da	7897179000268	Pão 44,2% Integral com Castanhas e Nozes	Vale do Sol - Naturista	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
72a5d328-b84b-475f-80ed-0dc2c4ad4c61	7898027121050	Mel	Natucentro	Pastas e cremes	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
1cb767be-4dd7-4198-bd57-c2aa4091cd48	7896931615788	SUCO MISTO DE MAÇÃ E GOIABA	Campo largo	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
c3edef7f-8498-428b-a895-1fae800d9a71	7898958059132	Nutritional yeast	Eat Clean	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
1f094348-3807-48e6-8693-f327eab862d6	7898637354671	Carne Moída, Arroz Integral E Feijão Carioca	Liv Up	Meals	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
8b0b6ae0-898b-4066-8e67-d4f1150de3f7	7896213004750	torada integral	VITARELLA	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
7bca8a15-b880-4b7e-96bc-6ec9241aee81	7896805320404	torresmo chips	seleção snaks	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
faa2bbb2-043e-4bc9-a50d-6917ffd9c6b6	7891080007705	Farinha de Trigo Tradicional Bunge 1 Kg	Bunge	Alimentos veganos	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
cdb8ffd7-3ef7-42f6-a184-f46cbe76004f	7897951610395	Queijo minas frescal	Serramar	Queijos	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
19883319-255a-4182-8a6b-48a2acc0311c	7896791904893	Iogurte integral 130 g	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
7d3754e5-a4aa-4b1c-bdf8-a375ef478618	7891515474157	Rebozado de pollo	Sadia	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
f9446c2a-c326-4c2f-8495-83cd738d9324	7891097105913	Manteiga extra com sal	Galbani	Pastas e cremes	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
09de9b43-5624-4d7f-b885-0256d148aeca	7898994481324	Granola Tradicional Melado E Canela	Grano Square	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
25513a0f-672b-49da-b940-8bffe4634a80	7898922104042	Manteiga	\N	Butt	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
d94e5935-a431-4bb3-bf65-a284d97a0948	7897318500130	Requeijão Cremoso Light	Davaca	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
e167dd5d-340d-4d9a-9e3d-3ce298a3c1ee	7898949346517	Queijo coalho light	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
ebed8050-ba92-443d-ac75-7e620d07fbbc	7891962072302	Choco tube	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
ae16c032-50f5-48ff-9533-affb229eda24	7894904955800	Mandioca Supreme	Seara	Alimentos veganos	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
e3403c02-fa05-4dc1-b8fe-8f7a16545c9e	7898945133579	Requeijão cremoso	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
d47d982a-c32a-44e1-b034-9b100c0e1d9d	7896003739398	original	pit stop	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
f91cad12-254a-4869-a63d-f74830ec46d1	7897395099695	cerveja puro malte	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
b2c1ef82-3e8f-4b21-a499-f54bf50fced0	7896003737516	Wafer chocolate	Marilan	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
8bc232e3-8612-44d9-bddf-22b5dc6b3500	7896306625169	Trento massivo banofee	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
b764a956-7220-47f9-b886-d38778ff9e4c	7897076023391	Leite condensado	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
29d9ae94-9cf0-4b5e-9dbc-1b737d683757	7896256603422	Leite UHT Desnatado	Tirol	Leites	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
b3b7aa59-4a30-41d9-a2b0-a31b6a66e1e9	7898095630034	Sorda	Perilima	Alimento zero lactose	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
3d3a1070-cb39-4852-a2d5-9e489fe29fcf	7897559900263	Batata palha extra fina	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
3e2fcc94-cd0c-4995-aa02-25fde5a1ab7a	7894900184600	schweppes	Schweppes	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
120007b0-6c62-4c5b-b737-7bb9d3727ccd	7898061708521	Iogurte	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
13afa9eb-3b92-4a0a-a62c-5d5262913d9d	7622210528216	Chocolate Recheado Ouro Branco	Lacta	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
ee692643-0d0d-4caa-b0ba-3add48854d01	7896228100577	Capeletti de frango	massaleve	Alimentos veganos	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
ee03bc0c-915a-48dd-a597-0a484d60ef65	7896045101665	Café gourmet sul de minas	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
b2e19691-1f4a-47c9-914a-c9a221560a51	7898687314809	Chocolate Branco Caramelizado com Nibs de Cacau	Dengo	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
21236c6c-6691-4f6e-aa95-04474997d355	7892840822019	Gatorade Berry blue	Outros	Bebidas	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
818e4106-9e3e-426a-8537-5c5eef3001e1	7896045505319	cerveja amstel puro malte lt 269ml	Amstel	Bebidas	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
906766d8-15e4-4a36-858e-d91a6b2bdb3b	7891095911677	Farofa caseirissima	Cebola	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
086fdbc1-e95a-4df9-9799-a812e0ce1dd6	7896005807521	Café com leite original	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
3c6e6ef3-74e7-4026-bf4e-174b9b6c2238	7898403780055	Manteiga	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
d27cdf4b-4c49-44fe-b711-b7ce8fa3242c	7896051167167	Requeijão Cremoso	Itambé	Requeijao cremoso	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
9f12ea49-7db4-4eb9-8b07-29c429af5bc6	7891143013193	Requeijão Cremoso Tradicional	Polenghi	Requeijao cremoso	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
8683b12b-c19a-48d2-9f79-d1bb168c5e92	7896045112654	Café com leite balance	\N	Geral	open_food_facts	2026-06-03 13:57:58.559	2026-06-03 13:57:58.539
814cf3ab-d867-4a7b-892e-c778c99f0940	7891048061787	Bolo Cremoso Aipim	Dr. Oetker	Cooking helpers	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
1c103836-6156-4386-a9b7-b2604e6cd7d6	7896079510372	Leite em Pó Desnatado Instantâneo	Elegê	Leites	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
0e3af5c2-261e-41e5-8d23-645e3c6f4fee	5901588026527	Milk Chocolate Tiramisu Flavour	E.wedel	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
a65d6dbe-d38b-4bf6-9a99-692b9d9329a6	7896005030578	Biscoito maisena tradicional	\N	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
0ef5858a-b185-4c60-8ce6-3b57e9b292d7	7899941203297	Whey 100pure	Probióticos	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
ce15d9d9-9dc9-4162-81ef-ebaebfb87e56	7896022086435	Tortilha de trufa	\N	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
3fcb32cc-f537-46b4-8ec6-1c4cfd738eed	7896275982614	Iogurte zero de coco	\N	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
151861eb-7127-4c7f-92fd-bba287b17861	7896022205249	Biscoito cracker integral	Renata	Salgadinhos	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
c817c2fa-0342-47ca-a515-a5c36b081143	7898924887240	Pé de Moça	Piranguinho	Alimentos veganos	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
78bfa3d9-46ff-4342-9632-e08a9c95ce2f	7896038306190	Macarrão de arroz	Urbano	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
a54d7e84-3f4f-4089-bbfd-640a6c126fa4	7892840822934	Fandangos	\N	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
b45043e9-ca9b-42f9-b3c3-4873e04f1445	7898942775895	Suco uva oq+	\N	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
d1406afc-fda6-4862-92bc-6059d42b9372	7896045112616	Queijo	Novo horizonte	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
a8e29dac-c886-4620-ab42-d94b01b99829	7896292350144	Mostarda budweiser	\N	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
9d09a707-9ab4-487d-be24-b423641f8f16	7896292300460	Ketchup	Predilecta	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
c28521e4-62e5-4563-8fda-854f659c7557	7896004009056	Panettone chocomax	\N	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
0076ffc4-6db6-4729-8c15-c42db77550cc	7892222310257	Café Pelé extra forte	Café Pelé	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
3a59cafb-e52a-4ef6-8f70-0183cab9e7cd	7898708732766	Whey Protein	Black Skull	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
2dab0a74-bf32-4c96-9ea4-7fb831c0b338	7898125166007	Diamond chocomalte	\N	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
4555efeb-252d-4029-ad2b-d7941d0eab29	7896552906869	Coco ralado desidratado e adoçado	\N	Alimentos veganos	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
61c78eb8-b947-4d39-bdb4-d4584f6d11b7	7896629640504	Vitamina de frutas	\N	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
aeff9ef3-4518-4f68-a7a3-0e269d1097b2	7895000522439	Molho de tomate qualitá	\N	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
f1d4d7f6-dae9-4e8d-b355-d011c8187384	7898194163440	Queijo mussarela fatiado	Cruzília	Queijos	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
a0b5982c-cfff-4384-9f87-68f9c69680a9	7897005100094	Milho para pipoca	Kinino	Salgadinhos	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
5f8ccb1e-b6c6-496f-a55c-f05d20503065	7898950172365	Sequilhos	\N	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
5767d5b8-9874-4a77-acaa-5fbc8caa37f1	7898055421566	Granola Com Passas E Mel	Naturale	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
7b61c566-2823-4f56-842c-53d6155dc2b8	0619205040867	suplemento Whey Protein sabor Leite sem Lactose Chef Whey 907 g	Chef Whey	Suplementos Alimentares	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
109c4481-dac8-486b-8804-cd0af0283c3c	7896536500021	Pêssego especial	\N	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
babb8bb2-1a3e-4554-95e8-00b2daeed3db	7896292340985	Milho Em Conserva	Sofruta	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
55ed3871-a7be-4285-9485-1a81e3d03abe	7898181475143	Açai	Polpa norte	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
fd9177b4-3399-488b-ab42-237c8010e782	7891103222573	Batata palha tradicional	\N	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
2714ddb7-737f-4b7f-b357-2552ae81bda0	7896022204204	bolo de fubá Renata	\N	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
d3a23ba5-6117-4eab-b4ee-e6227c58f472	7896005212110	bolinho de chuva dona benta	\N	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
0a32d340-90a9-4bdd-80ec-9da20aa89dd6	7896839173274	Rosquinhas 7 grãos coco e cacau	\N	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
a06c7b73-1ec5-4dc8-abe6-015bc2255b18	7896045114290	Milho De Pipoca	Sinhá	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
49962cac-d8bb-443e-b8db-cff82dbc60ac	7896256041866	NaturalLife Granola Castanhas Nobres	Kodilar	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
6a22edcf-2aca-4bd3-9a7a-cb90051644bb	7899638362245	Hambúrguer Angus	Sadia Bassi	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
ace6d27d-e9cf-47b0-a849-32a11c9ab70c	7899659901249	Ketchup tradicional	\N	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
8dc5cd04-016e-4f68-b7cf-70e8d28e6816	7896064205702	Chocolate flavored chips	\N	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
3e6dc358-1901-496f-9a33-0db5e256d55d	7898006950114	Picolé De Limão	Oggi	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
aecaf471-e2c2-4385-a784-c3b9c6df513c	7891331018122	Mingau de aveia e arroz	\N	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
94d3a357-5642-4d1a-b6c5-03c40dfa91c9	7896051168386	Iogurte natural milk desnatado	\N	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
f9a1043f-3c00-4cc0-9736-d924f1a8119b	7898931140383	Corn flakes natural	\N	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
fc3defe3-f1ed-482d-a9fc-cb9feaeefca5	7896089060140	Café gourmet LOR	\N	Café	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
e7d66f5c-2c53-49b6-b3f1-c4957870ae7a	7896327516156	Gelatina	Apti	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
a37e1c7d-c00c-4981-a1e5-c87afcc7d7f9	7896002301664	Pão de forma integral sem casca	Plusvita	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
0a3a1d5d-b83a-4322-8d37-bb4d35dc1e38	7896986279478	La nut avelã	\N	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
a2ce2a08-f021-4086-99ee-919a54302dfb	7898665432884	Isofort Beauty Neutro Vitafor 450g	\N	Dietary supplements	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
405803c4-69d5-4132-a15d-de2204c8eb62	7898994904816	Nobrand morango, maçã, laranja e framboesa	\N	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
3552581d-fc8d-4b09-8354-53439001547a	7891164007188	Mortadela tipo Bologna Fatiada	Aurora	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
cd74622b-5d5b-45c9-94cc-7b3f1f0b8f8a	7898045700336	goiabada val	Val	Alimentos veganos	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
07501be3-4ce1-4713-bafc-73b100f039d1	7896094916944	Adoçante sucralose	\N	Sweeteners	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
0d930570-3880-4487-a77d-3312d173462c	7894904296248	HAMBÚRGUER CARNE VEGETAL 60G INCRIVEL	\N	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
976c3923-1451-4120-9a83-831fe41994ec	7898205925449	Iogurte Natural Desnatado Verde Campo	Verde Campo	Sobremesas lácteas	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
da661c4b-1b9d-4dec-a7a0-51ca6275070f	7898247312009	Mel flores do campo	\N	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
e8c4412b-512b-417d-83c3-f6b4e4e55cb7	7891150097940	Ketchup supreme	Hellmann's	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
f0c2b55f-d6aa-4f75-8290-b475006dd72a	7908235000112	Goiabada	\N	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
53e9ac27-2c25-4db0-8889-80d329d9563d	7893753001492	Mel	Korin	Pastas e cremes	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
1a1d4c24-fab2-461e-9e0f-ee6a965f7bb2	7896280402640	Granola	\N	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
0e89d9da-2e12-4e89-8c11-db3762dab966	00064651	Queijo Parmesão	Tirolez	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
f982734c-0df5-4bdf-83ad-65fd5778b5db	7896263500141	Roller refrigerante	\N	Refrigerantes	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
9f13e7d9-e47e-4c66-a37c-b6cc16ac8a55	7896295383071	Petisco de tilápia	\N	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
b2f3d2de-258e-4dd4-b19d-fa81a7417daf	7898403782677	Queijo dd Coalho	Betânia	Queijos	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
f0193e79-148e-4cc5-8871-8f4a1cf18c24	7891330016426	Chocolate tropical 1891	Neugebauer Co.	Salgadinhos	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
c75e8561-cd81-4419-b59a-a8117a171e62	0041415103238	Linguine	Publix Premium	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
37ba1672-9c4c-4aa7-a20a-bb5cff7dedb8	7898235671095	Massa Tagliarini Caseiro	Koene	Alimentos veganos	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
5145e76a-5090-4614-9961-6e95904c0cc9	2575404642685	Bananada Natural com Cupuaçu	\N	Alimentos veganos	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
89aaca6b-1728-4001-a35a-6c21d3c7e59c	7898719880975	Onion Crispy Protein	Shark Pro	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
818f9766-22b8-4c4e-a412-e913ff37a848	7896180786802	Doce de abacaxi e maçã cremoso	Aurea	Alimentos veganos	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
90b68c4e-6402-4940-9a45-8d36fe908b81	7894900660555	Néctar de goiaba de baixa caloria	Del Valle	Bebidas	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
dd713ee1-174f-41dd-9fc3-855e0bcf6b72	7898936501196	Rosquinha Santa Clara	\N	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
74ee791b-102b-4859-810c-e9353c2de783	7898949730514	Omegafor plus	Vitafor	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
e98eaceb-7fdb-43d8-a417-6798fbd27fa2	7898701303222	Salgadinho sabor Cebola e Salsa Casa de Mãe 200 g	Aassociaçao Unigrupo de Supermercados	Salgadinhos	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
ed615989-8a3b-446f-8d56-7886dc9066a1	7898996114008	Pão 10 Grãos 65% Integral	Aipi	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
fc7fa6ae-0351-4aec-920b-a1c5fa20f9dd	7891000409640	Choco Trio Prestígio	Nestlé	Salgadinhos	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
d3632bd8-5d6a-4f91-b6ca-59991acfcc86	7898055420408	Brigadeiro Aveia E Chocolate	Naturale	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
1f5583a1-5065-4fed-81da-4c460db4b173	7898154171713	Suco de Uva Integral	Vinhedos do Vale do São Francisco	Suco de Uva Integral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
bdf14aec-0805-4ec7-8607-beaefc49c8cb	7896256605471	Manteiga com sal	Tirol	Pastas e cremes	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
32cafd27-490b-4058-b32c-5facc89267c0	7891164006860	Mortadela de frango	Aurora	Meats and their products	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
4ab55f7e-ab90-4caa-8d50-5ef651348b27	7894904015108	Filé de Peito de frango (Sem osso e Sem pele)	Seara	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
4b6f078f-e873-4975-ac5d-cb57f49c1209	7898187730697	Ovos tipo jumbo vermelhos	Carminatti	Eggs and their products	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
252eddfc-1321-4379-9536-c8c2d0caaf2a	7898187830069	Açúcar Demerara Santaisabel	Santaisabel	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
248b34df-f447-4ce7-9916-faecde65f06f	7908625604135	Empanada De Carne	Swift	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
c47456ac-9faf-41f2-9373-45c6bb3cf826	7898215152330	Leite em pó integral	Piracanjuba	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
7c15a047-2d67-4e65-b930-fb664a6c0054	7896260012203	Feijão preto	Itasa	Alimentos veganos	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
340b2f2a-ec77-4b3d-bd36-563f65580139	7896181712312	Granola Tradicional Premium	DaColonia	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
6f2ccc5b-572d-47aa-84dd-b77a18056bb8	7896493140223	Arroz Rei do Sul Longo Fino Tipo 1	\N	Alimentos veganos	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
bdd0a617-c882-487d-ba81-54edaeb93f3b	7700002970662	Pão De Queijo Tradicional	Verdemar	Alimentos veganos	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
f6a95cdc-a8bf-4aa5-9f86-1b1040f2046f	7896058217889	Salpet	Aymoré	Salgadinhos	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
3f451526-57ec-478c-9292-c003f9a84a78	8445290472496	NESCAFÉ TRADICIÓN	NESCAFÉ	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
538903f6-68e3-4755-864d-a2b1ddc73d30	5600409000059	Açaí Polpa Premium	Summit Food Portugal	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
f72252ac-825f-4b53-bda0-96982fe9b154	7898651510312	Granola extra premium zero	\N	Alimentos veganos	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
f4c91ab7-c529-4932-afc6-b57b6a27dc84	7891150099371	HELLMANNS MAIONESE	\N	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
b5227e97-215c-432b-8492-c96021d7127a	7896005401804	Suco de Caju de garrafa	da Fruta	Suco concentrado	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
2f585edb-8ef1-43e7-aacf-6e2c1d3dbec7	7898005653528	Leite desnatado	Cooper Rita	Bebidas	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
affd4cc0-3683-4adc-a283-57b2142ad5dc	7898063761739	Suco concentrado de goiaba	Bela ischia	Geral	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
c2f4e28d-c9c4-4ba1-bcfe-bcd8c7e843b0	7896102802269	Mostarda	Júnior	Geral	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
23609d3d-22fe-4088-8d88-43241a71c183	7898675840020	Ovos extra vermelhos	Carminatti	Eggs and their products	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
70a2006f-91d4-4ec5-a961-44561701b6ff	7898684481849	desinchá laranja canela	\N	Geral	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
0671d18b-8de0-49cc-9f16-c8093b0a6e67	2506657090084	Requeijão cremoso	Catupiry	Requeijao cremoso	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
682d225e-570e-4270-88d2-28f2a60520ae	7896401600016	Leite UHT Integral	Ibituruna	Leites	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
dbadcbe9-4c25-4f74-90cd-9cd61623139a	7897123884029	Água Mineral Natural Prara	\N	Bebidas	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
5ed622de-8404-4933-89ec-2d5dd659a67f	7898258952621	Mel Orgânico	Baldoni	Mel orgânico	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
a573c354-bc8f-4a76-a19b-32d5d327d52f	7896252205163	Grão-de-bico	Beija Flor	Alimentos veganos	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
829bdfc5-b64b-4ce3-a4c3-bbb72d91e333	7898005516175	Água mineral natural Ster Bom	Ster Bom	Bebidas	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
82f0b6bd-db05-483e-9756-f60f9453f04f	5063089483022	Cooked And Peeled Madagascan Tiger Prawns	Asda	Geral	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
e110c998-b770-4ac2-b176-eaca22cb406f	7898019061425	Ovos tipo extra vermelhos	Granja Marutani	Eggs and their products	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
79df5a24-e381-4fd0-8c65-2afd3cf0e43b	7899916917174	Suco Laranja E Maçã	Natural One	Geral	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
8181cde3-e226-451d-86fe-2f3c18d9fd43	0793573955586	Pipoca doce torrada	Caldani	Salgadinhos	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
6a9a332e-8b41-4eda-a40d-80ce5aa11d2e	7898583330521	THERMO CUTTER SLIM	Fulllife Nutrition	Geral	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
c0073d49-45b6-4543-83c3-6c6054fff0a7	7898414311071	Doce cremoso sabor doce de leite	Frireggio	Pastas e cremes	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
2c2dd702-62b0-4e0c-8711-b0bf2b044b88	0811962011481	Fruit Spread Blueberry	Aunt Berta	Geral	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
2c3b3c78-f285-4eb5-ac4d-83c1ef370abe	7896328200917	Terere Natural 500g Barao	Barao	Geral	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
bffbfe29-3c36-4878-8378-49a7d918f60e	7898939009187	Manteiga Ghee com Sal Rosa Natural Dom Afonso	Dom Afonso	Pastas e cremes	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
6de8760f-00a9-4528-805b-ad2a8c509283	7896451909381	Gelatines Beijo	Docile	Geral	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
2d0bc12f-109f-45de-bc63-67cca2cd2b97	7897076021403	Leite condensado semidesnatado	Campos do Jordão	Dairies	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
fd1baa22-e22b-44e9-8f21-ed9abc1fe38c	7898994073031	Farelo de Aveia Sem Glúten 200g - Monama	Monama	Alimentos veganos	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
a5d9830b-64cd-48e1-9108-6f9ab1fb6b63	7896063230064	Granola Tradicional Grãos E Sementes Vitao 250g	\N	Alimentos veganos	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
bee32526-704c-43a2-8b54-844e67882b61	7898954933474	Farinha Multiuso sem Glúten e Lactose Schar 500g	Schär	Alimentos veganos	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
2a9d61a7-faed-446c-9cbb-29f6a94729cd	7898205923902	Iogurte Desnatado Zero Lactose	Verde Campo	Sobremesas lácteas	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
a5b4c9ac-4989-4589-bb47-ce94b6f0300f	5890500030011	Óleo de milho	Sinhá	Oleos de milho	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
323df32b-6a0e-4447-a52c-85a2d4febd48	7898961943183	Pasta de amendoim integral crocante	Master Force	Alimentos veganos	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
b3a7644a-ae79-4782-b9d0-40091362826a	7896030521362	Requeijão Bisnaga Tirolêz 1,5Kg	\N	Geral	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
12c0ebfa-be7d-474d-966c-9ae7a94006ba	7898908069075	Batata palha	Beyv's	Alimentos veganos	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
82065b5e-cbe5-4d45-bec4-5e52c1ae903f	7896735115552	Arroz integral longo fino	SaborSul	Alimentos veganos	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
66a8cc64-2ccf-4d0e-8f48-0196af606b85	7896048284433	Creme de Balsâmico	Castelo	Geral	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
1908c145-922a-4b28-b4ba-c1b9c04a2893	7898560670718	Pão De Queijo Congelado	Seu Ninico	Geral	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
2eb185a7-41af-4f6c-bd93-075a57bfb4ea	7622210644534	club social mix de queijo	\N	Geral	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
68af1b99-0957-4f3a-849b-5939dc0a79c4	7891079011812	Miojo Nosso sabor sabor carne	Nissin	Geral	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
bcbfbe55-c777-49ae-a6b7-ace4b49944ec	7899567209864	Feijão preto cozido e temperado	Bordon	Geral	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
277d253a-583d-4e77-a576-fa3c7c58714c	7898661012783	Whey Protein 100% Iso Dark Choco Puravida 450g	Pura Vida	Dietary supplements	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
7ed16cd4-402b-4dea-8ff1-7358faa98f49	7899767024236	Whey Isolado e Hidrolisado Muke Morango 450g - Mais Mu	Mu	Dietary supplements	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
45724724-36df-4c15-9394-48b11d5426b1	7898937898288	Whey Protein Isolado 90% Fresh Nutrition 660g	Fresh Nutrition	Dietary supplements	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
e3fe5b89-b4f0-45f4-8f7f-4feb51660921	7898963783084	Light Iso Baunilha Canibal Inc 900g	Canibal Inc	Dietary supplements	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
1ee09a01-df67-4778-aaf1-935dd9af4db2	7898919865246	Isofort Neutro 92% Proteina Vitafor 900g	Vitafor	Dietary supplements	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
f0ba1c61-c18c-4588-9972-44f2607d053f	7898665434765	Isofort Beauty Neutro Vitafor 450g	Vitafor	Dietary supplements	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
a44a3b4e-4c32-4aca-a374-227eb94b3ac7	7898665433751	Whey Fort 3W Neutro Vitafor 900g	Vitafor	Dietary supplements	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
d023272e-d4d7-4c27-b6f5-a6eabbddc687	7896311709519	Nutri whey protein	Integralmedica	Geral	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
04365397-ca3a-4b0a-bfd1-d97beefffed6	7802130003394	Quilmes Cerveza Argentina Clásica	Quilmes	Bebidas alcohólicas	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
1cd711d9-72e9-4107-9812-8a1eae59ae74	7891000395608	Garotão Crocante	Garoto	Geral	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
bf74b897-c9a9-4700-8a55-b09fac32e43a	7891103221576	Atum Sólido Ao Natural	Carrefour	Geral	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
b93757ac-a79b-41e9-8967-785659da43ca	7898247263745	Doce de abóbora	Mbonn	Alimentos veganos	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
b7fe9ee1-1a27-46ad-8907-f26e59a7294b	7898910891015	Ovos tipo extra branco	Coave	Eggs and their products	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
814c1939-c1ab-42bf-a548-310055ea6138	7898571521627	Cottagy (queijo tipo cottage)	Yorgus	Dairies	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
dee3eeb5-7fe0-4a58-bf33-6d76a329db4c	7898963998167	Su Bello Puro Sabor Morango	Su Bello	Bebidas	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
d06b33bb-f2b8-47fb-a6c7-0054e06f58a9	7897001050751	Purity Soja Pêssego	Cocamar	Bebidas com açúcar com fruta	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
583be21b-62fc-423a-a330-adc08f1fb203	7896111426517	Biscoito doce chocolate e coco	Ninfa	Salgadinhos	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
5e31db03-d297-4c1a-9ec3-40d983a4daa6	7622210533289	Snack salgado de trigo e batata sabor queijo parmesão	Mondelez	Salgadinhos	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
30868213-0985-429e-b2b9-15cf844ddd9b	7898557431292	Sorbet de açaí com guaraná sabor morango	Gebon	Congelados	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
b7fc5ac7-095d-47e1-b665-d59e96c1452b	7896699200431	Café piquiri	Jandaia	Alimentos veganos	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
020af515-1c6c-4b99-a763-33f3845d2afd	7891000248836	Kit Kat Dark	Kit Kat	Geral	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
1b02dc11-348a-4cf7-9eb2-cfd86aa6d36d	7898905565044	Água mineral natural	L'aqua	Água Mineral Natural	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
09d861a0-4a58-4815-8069-362f9cc1408c	7896625211944	Iogurte Grego Torta de Limão	Vigor	Geral	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
daab0fc3-ed22-40a0-b584-12f02186d7a1	7896002368162	Pão de Castanhad	Bimbo	Geral	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
a60e1478-023e-4e31-ab24-d0f14ed90c39	7898017330868	Linguiça tipo calabresa	Friella	Meats and their products	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
275462e0-8594-4142-872a-46f3e735902a	7897173098827	Pão de mel	Casa Suiça	Pão de mel	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
6496b0fc-29d3-40a9-a563-260c034be841	7897173011420	Panetone de frutas	Casa Suiça	Panetone	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
33af0612-a97f-4444-935e-115a48a54ff2	0606529230838	Pão de Queijo	Piranguinho	Pão de Queijo	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
51b3eab6-325c-4795-a46f-ec1a1d586ef2	8480017291912	Farinha De Milho	Dia	Geral	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
98537916-b46f-4eb3-80ec-2afb79dfb2ed	7898481779538	Hipercalórico	Red	Hipercalórico	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
9742e628-4c8c-4004-ba1c-bd92c721b714	7891149108640	Cerv hoegaarden	\N	Geral	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
48b791ab-9971-4331-ad90-7444e6769c33	7898003281167	Amor de Minas	Portão de Cambuí	Pastas e cremes	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
3ee7b912-9996-4656-bf6f-dce74220ee42	7898914221900	Água de Coco	Coco Super	Geral	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
63c18159-1a8b-4a6c-8883-21d68454d99b	7896367100186	Bombons trufados de chocolate ao leite	DeCacau Gramado	Salgadinhos	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
6a09b340-ae5b-47ee-904d-6a6ea042bfcc	7896275984120	Sobremesa láctea sabor chocolate com calda de caramelo	Frimesa	Sobremesas lácteas	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
6f084380-f92d-44aa-804a-303e751f0cb6	7898967617064	Ovos tipo jumbo branco	Sieme	Eggs and their products	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
53113536-6623-4c43-9efd-06d8f38c357a	7896022207854	Biscoito Rosquinhas Galo sabor Leite 300g	Galo	Salgadinhos	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
bfb658c5-db65-40da-9e8b-ef9274a44757	7896385800617	Refrigerante de Guaraná	Sarandi	Refrigerante	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
940dc9da-289c-4dfb-9b48-1348fdaf98d0	7613037057416	Svelty con Leche Natural con Colágeno	Nestlé	Leches	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
dbaed28e-cbf3-45cb-9305-4f831fa12440	7891097104381	Yogurte Jabuticaba	Batavo	Geral	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
7764ba7f-d849-485a-bc47-57545f4eab34	7898215155201	Leite Desnatado	LeiteBom	Geral	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
664f3820-5900-43db-8eea-b8d1bc47e6e7	7898599214914	Protein Bar Whey Grego Coffe Cream	Nutrata	Geral	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
1b7c2195-a607-476b-bea6-1d9dd24396b9	7898080642660	Queijo Ralado	Italac	Queijos	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
a786b45a-446b-404b-b543-d5c48388c282	7898912979087	Croissant	Croissant e Cia	Alimentos veganos	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
ee8da0db-0850-41d2-93a4-8d2cd1e11b06	7898014852813	Leite fermentado desnatado com preparado de fruta sabor baunilha	Unibaby	Bebidas	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
a05494b7-bac5-4c81-9f1e-1f612d91efa5	7896232800883	Batata palha frita salgada	Geriba	Alimentos veganos	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
e82e2e22-a5c4-4ce8-bd5e-718f09764568	7896079431110	Arroz Branco Cru	Namorado	Alimentos veganos	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
145a57d5-f229-4863-acd2-0b837c6ba951	7898380410365	Snacks Sabor Ervas Finas	Good Soy	Geral	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
c882fb45-1928-44ea-880d-43835b2b678b	7898701303277	Chocolate em pó solúvel	Casademãe	Chocolate em pó	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
c9e30237-d5c1-4913-9689-c0e254c50de3	7898215158837	Pro Force 23g Proteínas	Piracanjuba	Bebidas	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
be342f4d-f9cc-4976-899b-29270cc7ea25	7891164004774	Linguiça Fininha	Aurora Premium	Geral	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
ec257316-4448-4cc2-9d3b-80f00bdea3ff	7898530840479	Dadinho Receita Original 600 g	Dadinho	Doce de Amendoim	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
d172de52-815a-44a5-a6b2-b198e103a900	7896050201701	Protein Booster	Oak Berry	Geral	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
511118a4-2876-4c8d-a614-e3e0c5d8e698	7896036098981	Molho de Tomate	Cica	Geral	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
d1f31050-9b12-40c4-94c2-3408854c6d41	7898957749201	Uva Verde Sem Semente Cappellaro 500 g	Cappellaro	Uvas	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
8c6e8697-3388-4a9d-9e12-f5f27cecd9ff	7908733200083	Suplemento alimentar em pó	Re-Hidraben	Dietary supplements	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
8f97a9a1-1f81-4221-a25c-4b444b3825c6	7898917469200	Sorvete de Pistache com Cobertura de Pistache	Pardal	Geral	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
0aa995cf-d18a-4c79-a026-1e9a130546d4	7897967907113	Ovo grande	Kerovos	Geral	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
3cbd422b-79fc-452a-a666-7a9eb9192f00	7896412851216	Farinha De Trigo Tradicional	Veneranda	Alimentos veganos	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
fcfd3688-3a98-4ba5-99f1-f462bb0dbd41	5900189010911	Pistachio Premium Chocolate	Goplana	Geral	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
544c8138-493e-4974-a5e8-d510a3067992	7896181706274	Paçoquinha	Da Colonia	Geral	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
693e4deb-0cbd-4712-be80-67bb53a57261	7898286200060	Café maratá 250g	\N	Geral	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
24d11b54-1ead-41b2-83aa-4b910c6f611b	7896818500275	Morango ice	Karina tereré	Saudável	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
b4d13143-65b4-4825-8c9f-125ef467c875	7896523227573	Loratadina 10mg CPD 12 GN Cimed	\N	Geral	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
b1156b37-80f9-4315-9f1e-dc324bfaf0d2	7896058595321	Dori yogurte	doce	Geral	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
209ca1c4-03aa-4815-88ca-47b33945a432	7896482100016	Feijão Carioca Carunchão 1 kg	Carunchão	Feijão	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
ddd47631-d0db-4f0f-bf54-8aa6a8e8df2c	7897261351001	Salgadinho de trigo frito	\N	Salgadinhos	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
27d893e0-a6d2-4576-acc5-1f777329281a	7897163401118	Arroz caramelizado	Fransili	Alimentos veganos	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
8b9cf507-9c86-4b3d-984b-82f841d2d23e	7895000474431	Óleo de coco sem sabor	Taeq	Alimentos veganos	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
1d6d8eed-df62-4dbe-b3de-59d1be7ef59a	7896775100662	Pé de moça	Guimarães	Alimentos veganos	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
bc97549f-f91e-4b9a-8711-14caeda26ba1	7896022205225	Biscoito doce sabor leite	Renata	Salgadinhos	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
ea41df10-cb3e-4637-b7a8-d37e26d7a253	7896530722009	Ovo de páscoa sabor chocolate ao leite	dumdum	Salgadinhos	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
3110b6fe-2237-4144-a87b-1a4f3e724262	7898967617002	Ovos tipo grande vermelho	Sieme Ovos	Eggs and their products	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
d50f133b-8ba3-4f6f-b408-3d1a8060e5a6	7898605253777	Colorado rib ln 355	\N	Geral	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
064738cc-e19a-427c-adb3-5bd7f0ce4653	7896003738780	Tortinhas	Marilan	Geral	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
2c27df63-af41-4a63-8a73-0288c81ef6ec	7896546100051	Arroz Branco	Seu Arroz	Alimentos veganos	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
0a633357-25f0-4b61-9349-f9c389171846	7896256604962	Leite Condensado	Tirol	Geral	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
2df89b88-2bb8-43b7-a4f3-40a1d103d9bd	7896275970987	Iogurte desnatado com preparado de mamão com laranja	Frimesa	Bebidas	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
7e0d8c76-7f81-49d4-874f-e2ac2ad490d9	7898955997024	Doce de amendoim caseiro	Doces São José	Alimentos veganos	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
b9ac1242-2f78-4591-927f-c875afd0de59	7896791904510	trevo iogurte 800g ameda	\N	Geral	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
913b326a-3acc-48b6-8d00-3a2fe62a3148	8445291770027	NaturNes Carne, Fideos y Verduras PICADO	Nestlé	Geral	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
16abf522-b369-4be6-8133-6ae270e125ad	7898215152170	Seleção bate chantilly	Piracanjuba	Creme de leite	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
64291d93-b5d9-41e3-ad8b-c3a1d4199a6f	7896311778041	Protein Crisp Whey Protein	Integralmédica	Geral	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
e375685b-4526-444c-9217-ce6f63bb9ce7	7898194600648	Ovos grande branco	Katayama Alimentos	Eggs and their products	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
fe3841dd-0a59-48bd-add8-dc345684383b	7896015910020	Farinha de mandioca torrada	Pinduca	Alimentos veganos	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
7aa7967b-745b-4be5-ad33-be199c042294	7898568901043	Chia Branca Grãos	Vitalin	Alimentos veganos	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
0367f32b-af2c-40e1-81cc-1baca9ea56dd	7898961803418	Semente de Linhaça Dourada	Áster	Geral	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
8cc72258-56ae-44b5-a83c-8167f9399cf2	7896546160024	Biscoito De Arroz Com Milho	Rampinelli	Geral	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
02d4a9eb-200c-4483-8cf0-cbd4d12399d7	7898657831848	Amanteigado sabor côco	Capricche	Salgadinhos	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
4f168d20-63f9-4afd-a395-1e6537c09d5d	7896504301179	Doce de leite	Santa Clara	Pastas e cremes	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
828cbb0f-5b77-43bd-a59b-c81ca22990f0	7898007290035	Feijão comum preto	Feijão da Serra	Alimentos veganos	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
75646f5f-acd5-4c07-ba76-7423a3772e3a	7899686702000	Queijo ralado	Rohden	Queijos	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
f01f8547-2d86-49e9-b3c1-92b3091195d7	7891089436407	Ameixa sem caroço	Muffato	Alimentos veganos	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
b17d8f3f-e411-4001-adaa-86705f955d50	7891515587796	Camarão Grande Descascado Congelado	Sadia	Congelados	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
915ea2c7-6bc7-4be5-87ff-74f630f2f84d	7896837101361	Granola Light Tradicional	Biosoft	Alimentos veganos	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
530785f4-bf40-4f22-bb2b-46fffa93175e	7896532700968	Massa Integral	Petyan	Alimentos veganos	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
53df87d3-0292-460b-9345-804e6df02386	7896005279182	Dona Benta bolo fuba com Eva doce	Dona Benta	Geral	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
a83bb0d8-7148-4f5d-9aa0-0be6ee97bcf1	7896222305152	Pimenta do Reino	Koryma	Alimentos veganos	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
1e9dc6e5-c088-49b5-bb10-aa47d837c191	7894904577897	Empanado à base de carne de frango sabor queijo e orégano	Seara	Congelados	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
f54b60f5-2b63-4f89-a123-7381912a4a8a	7897395000790	Cacildis ln	\N	Geral	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
f917b98e-88eb-4ce1-859f-344d690919b8	7898904874291	Pão Hambúrguer	PANUTRI	Geral	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
6bca7e80-a2d2-4c7f-8662-6291023d4ba9	7898227280618	Leite Godam Integral	Godam	Leites	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
22615433-b03b-4f06-929d-2e577d016fb6	2221672810256	Frango ao sugo com queijo, arroz branco e batata assada	Liv Up	Meals	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
de4d8892-fa1d-4348-8939-d1cba99f5afa	0596013301420	Molho shoyu	Pindorama	Molho de soja	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
cfbe98d9-e38d-45f6-888d-9e97eb8a46a6	7891000368725	Farinha Lactea	Nestlé	Geral	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
301b47dd-e60f-4908-8f24-bc6a43fa6ad2	7898994632443	Iogurte Natural	Nuvio	Geral	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
105331fa-eb45-4cbe-a53f-e68277df3730	7897269926355	Mix de Pimentas	Companhia das Ervas	Alimentos veganos	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
f37e2ab8-24b8-4f06-8722-4b288dd5e68d	7891095911295	Grão De Bico	Yoki	Geral	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
c3cd88e3-be12-42a3-8dcf-39b8fde3d492	7896004007618	Cer mat sucrilhos original	Kellogg's	Geral	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
2f547aed-6b3f-409c-a403-3c766c2a753c	7896839173137	DaMagrinha Biscoito Banana e Cacau	\N	Geral	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
c347c371-d07b-44b5-bdc8-57733b777510	7898952831123	Pão de queijo tradicional	Delicatex	Congelados	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
07a9f395-7113-4ebd-a420-0d5331c868a4	7891103221880	Passata De Tomate	Carrefour	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
3a18e666-dd67-4bff-b80c-3ccc442eb6de	0759098606013	Almond & Dark Chocolate	Desserts On Us Lacey's	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
425e8d65-a310-484f-b9b4-4b13d01519a7	7897436003896	Doce cremoso sabor doce de leite	italy	Pastas e cremes	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
0cddb9c1-a10c-4a5e-a170-4a95284846be	8445291584891	VAINILLA LATTE	NESCAFÉ	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
8c236020-01bb-4d77-88bd-6d30bad97850	7807910034834	Leche EVAPORADA	Cuisine & Co.	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
a29dc70e-3451-46a0-bb80-b80dab1afa62	7802200183018	SALSA MAGICA	Ambrofoli	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
e4123ffc-fc75-42cf-bec7-866c9e3769fd	7898680360209	Farofa crocante com torresmo	Zapoli	Alimentos veganos	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
15fcb39e-c844-4e1a-9e8a-967c6e8e3f4c	7898367984377	Unfiltered	Eisenbahn	Bebidas	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
9440b934-3f29-4e62-87b3-925a85980939	7898027890222	Manteiga com sal	Anila	Pastas e cremes	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
e6a391a6-0b4d-46d2-9ec5-7259d2edb903	7613031790135	Fitness Original	Nestlé	Alimentos veganos	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
c80da0d0-f3e0-45b7-aad6-247732210a2e	7802920010786	Yoghurt Batido ENDULZADO NATURALMENTE	COLUN	Sobremesas lácteas	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
e76290d7-fdd9-4de7-8b27-53719eb1eaa2	7804673910788	Wild Soul Bar Barra de Cereal Maní	Juanita Ringeling	Salgadinhos	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
d9c10e9f-095b-4f93-ad38-d09aa6a760ce	7804621471019	ATÚN LOMITOS en Agua	Robinson Crusoe	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
a0d01f72-d04a-43eb-9d92-673087a0b5c0	7804673911723	SOUL CON MANÍ Y CACAO	WILD SOUL	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
1a95e120-84ef-4526-8b22-99dc8d29b137	7892300030060	óleo de soja sinha	\N	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
e71fabe3-72c0-48c6-9e02-872660b34c4e	7891035618543	SBP EUCALIPTO 360	\N	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
595b7fa7-d548-492f-a26b-ff9f6094fb42	7891035617959	SBP MULTI LARA	\N	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
9d593a14-276a-4f57-8e8b-5fa933123c7d	7891035990571	Multiuso PF Limão	\N	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
f3c284e3-e703-4331-b48f-686f330cb807	7891203058140	Maisena Sabor Chocolate	Panco	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
ff315b86-35cb-485f-a667-b6a6c5ad2bb5	7898919916870	Tempero para pipoca sabor pizza	Beija Flor	Alimentos veganos	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
372a68ef-869e-4d66-8367-a565294dec42	7896004010625	Batata Sabor Marguerita	Pringles	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
266a0f26-b364-4a4e-b701-12c26615b8ac	13969660	Creme de Leite Leve UHT Homogeneizado	Betânia	Dairies	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
d74d89a3-2378-4634-b122-b544b922e09a	7896468700087	Água Mineral Natural	Fonte da Ilha	Bebidas	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
c9e65635-a165-4ee4-bb95-49e106e645e4	7896259415350	Leite Em Pó Integral	Camponesa	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
92e142fc-741d-44e8-974a-2d3ad02954b2	7802910301207	YOGU YOGU	YOGU YOGU	Sobremesas lácteas	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
f770f438-cb21-4bae-93c9-f216415ffb05	7896090082063	Farinha de Trigo Tradicional Finna	\N	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
60c7fe81-8e7a-4e0e-800a-3225f49edb53	7896735115354	Arroz branco	SaborSul	Alimentos veganos	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
2c08a299-c7df-4312-9823-0d573727333d	7898953148916	suco prats caju i	\N	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
42b43a2f-26c0-478a-bbe0-89482f69f4be	90474507	Red Bull Zero	Red Bull	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
88f49b1b-0620-4ea6-bd9d-41092d23d9c5	7891991303347	Spaten 269	\N	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
5ccc1792-50b4-4b29-bc9a-e436237609fb	7801610473023	Coca-Cola Zero Azúcar	Coca-Cola	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
ce0deddc-1c70-4566-bc1c-4234bd55997b	5060309495629	:Diablo	DUBAI CHOCOLATE	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
9fb0da10-7b8a-4647-8461-1febe4ae187d	7802000018152	BARRAS COLACIÓN SIN AZÚCARES AÑADIDOS con Chispas con Cacao	QUAKER	Salgadinhos	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
c116e5c4-7f76-47b9-b92d-b300524e3c4d	7896665822315	Batata Chips Ondulada Original	Líder do Sul	Alimentos veganos	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
3fa760b6-f363-4d97-a359-e8c20af7cf32	7891203061324	Pão de forma Artesanale Cacau e mel	Panco	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
84e1743c-5710-455f-a97b-451a74532b67	7896096041651	carmelita óleo composto de soja e oliva 10%	\N	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
b41cf844-05a5-4799-9b7a-1e21a2522961	7804621471187	Atún Lomitos	Robinson Crusoe	Atún	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
d228a4f5-047d-4773-8ce6-de3098eac393	7798304841650	Bombomzin Sabor Baunilha	Garoto	Congelados	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
84b85b83-8168-49ab-81ad-f68e26aaca8c	2494574049905	QUEQUE LOW CARB	JUMBO Artesanal	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
05312b54-5d33-499b-9931-aeb0034c10e6	7898927536053	Massa tagliarini caseira	Koene Ouro	Alimentos veganos	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
90d132c2-7813-4fcf-b327-15251cec05a5	7804673912805	Protein mini Sabor Chocolate	Wild	Salgadinhos	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
05738f2d-3b0a-4e72-b6f4-424bbdc869eb	7622202323614	Oreo Selena Gomes	Oreo	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
23146a4a-faf5-4b40-bb45-680820dbfc6a	7804676870195	PROTEIN BAR	UNDER FIVE	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
22ee74d8-2370-44cd-adfd-3f44157ec47e	7896858617742	Pasta Matte Shark Barber	Shark Barber	Pomadas de cabelo	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
8a4cfd14-a466-4c8c-8d96-13f979ba0a0c	7804630011169	MINI RICEPOP	rika ARTESANO FOODS	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
f07a07a9-395b-45d4-adbd-cbf00116f462	7891097105944	Manteiga Sem Sal	Galbani	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
6a8f779b-0ad2-41c9-b3c9-f7c8c246d843	7891025124702	Iogurte polpa Danone Quaker morango e aveia	Danone	Sobremesas lácteas	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
c3432792-935a-4f9b-be11-6ae7280e7ab0	7802910005976	PROTEIN EXTRA PROTEINA	LONCO LECHE	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
404b03cf-1246-4a30-af35-40cdb4c297fd	7896005805015	Cápsula 3 Corações Vibrante	3 Hearts	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
d0ced0dd-4d0c-4469-97f1-3fa1367fcfa2	7613036955126	STARBUCKS® LATTE MACCHIATO	NESCAFÉ Dolce Gusto	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
9a26bcef-19d4-41d1-b038-281eb5876918	7804639110023	POWER-honey Blueberry	Natural Patagonia	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
4fa4af38-23b9-48a1-a470-2b50660e37fd	7802900004408	protein+	Soprole	Lácteos	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
d79104e9-b33f-45b7-9681-b8d7b9402e56	7898944774278	WHEY PRO	MAX TITANIUM	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
be140db0-3656-45fa-9273-c465ce0852fe	7898600721714	hamburguer picanha	brasa	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
75e067d5-44fa-4ab0-b625-1f3796e7439e	7898247262816	Pé de moça	Nbonn	Alimentos veganos	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
9ecabda8-a2e1-4502-babf-eadf82bfe86c	7898247262717	Doce de amendoim tipo caseiro	Nbonn	Alimentos veganos	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
c844c37a-cefc-4942-8e92-9475ce22b26e	7891164110642	tirinhas frangoaurora	aurora	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
39250fe2-46fe-4d91-879d-0fd201cf6cef	7896213001292	Treloso morango	\N	Biscoito recheado	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
c5767082-3f8f-4411-8d98-36c5ef57b418	7891193006886	bolinho sevenboy morango	\N	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
d12a8193-53b2-4446-80b4-09f8f26a46dc	7891097106842	Iogurte Probio2 Ameixa	Batavo	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
22156e43-e894-430c-b7e7-f0f3ed30f09a	7802000005848	GALLETÓN CASERO - ALMENDRAS	QUAKER	Salgadinhos	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
7f4b6071-a107-4441-8b19-849fcc0ef249	4066600060741	Paulaner weiss	\N	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
3e5a4c38-789f-491e-a8f7-fc72a47c1d1f	7613287542342	COCO	NATURE'S HEART®	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
bef9d08b-9696-463e-82b9-0114c0227e8c	7801420001539	Basmati	Tucapel	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
cb87f3ae-9ad0-4643-9449-4c4cdea7bd34	7802800709625	Livean PUREFRUT pera	Livean	Alimentos a base de frutas	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
0b5e27b8-566a-4025-b240-daceee88c5be	7896000598325	Leite De aveia	Nuts	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
90d21de9-6565-4b9e-99d3-f51483ea8f4d	7801916033235	LOMO KASSLER	La Preferida	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
036675b3-c1a1-4d6e-adb4-0eb32c2d4463	7804659650523	NOT ICECREAM	NotCo	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
c638cb14-d981-40ec-8c4e-ff9348757e21	7801528000175	JUREL	Lider	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
4929c912-3240-402c-8aeb-66cc252d3218	7803473005960	MANKEKE	Marinela	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
94efde44-be7d-4a5c-b9fb-f84119cadf2d	7802900001704	protein Yoghurt Batido Sabor Maracuyá	Soprole	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
7e385c77-2557-4af8-99f9-77a40b7521c5	7891000370933	Sobremesa Láctea Cremosa Sabor Chocolate	Chan Delle	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
d64aed70-a462-4306-a335-ab6cb40ee6e0	7802100003270	Heineken 0.0	Heineken	Bebidas alcohólicas	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
a026eb16-5790-43ec-b134-0ba18bf2f64e	7891058005467	targifor c	\N	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
cf2531a8-79e4-4e72-ae0a-d35af21d3da4	0799192147692	100% whey protein isolate	BAAL CIENTIFICA	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
da96a941-f2be-4214-9e9b-d6d6e12cba60	7896224803090	Achocolatado Chocolatto	3 Corações	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
17feae39-2245-4804-96d6-45405cd2a505	7896691104218	Iogurte Pedaços Abacaxi & Coco Carolina 100g	\N	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
541fe82e-7c9b-4721-a752-6a69dea7ccc4	0799192196003	PROTEIN COFFEE	MARLEY COFFEE	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
cfa4a784-8cea-4219-b3a3-f72521b34729	7802095181243	Sabor Queso Jalapeño	Pancho Villa	Geral	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
2a4a7e4b-41f3-41e7-9725-a51fe23c4cf7	7896691100692	Iogurte parcialmente desnatado com preparado de mel	Carolina	Sobremesas lácteas	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
b1158d64-df81-48c7-8a58-99da6feae83c	7896015960414	Canjiquinha	Pinduca Alimentos	Alimentos veganos	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
69238230-9746-4ad5-adf7-a2a78593e3c8	0893534205207	LEITE INTEGRAL UHT	Porto Alegre	Leites	open_food_facts	2026-06-03 13:59:21.093	2026-06-03 13:59:21.073
c5e8c030-dd78-4374-ba29-cfe7be7d4940	7898059340405	Pão integral	Rei do Pão	Alimentos veganos	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
44db2c3e-646e-4f91-ab89-50e0f62fc27c	7803500000555	ANITA Sin gluten	ANITA	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
81282596-1312-4666-bf87-8986e3643ec0	7898960957037	Queijo ralado fino	Correa e Cunha Alimentos	Queijos	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
771537a3-3a15-47bd-a443-8b3adb98431f	7898080665416	Energético Baly	Baly	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
72ace500-cb55-4ff8-a56e-1fc316657c8c	7804000001981	Enlinea GRANOLA	Enlinea	Alimentos veganos	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
94a4e23b-168e-4513-8341-97a17c1235c8	7801620009595	GRANADA	mas	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
a4058e73-0823-4f5c-af27-649b18c9d30f	7804609254009	Protein snack	Your goal	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
55f611fb-0821-408e-becf-e4c4d22962d8	8445291702189	CHOCAPIC	Nestlé	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
f33101e5-c1ac-4239-8243-f9e28fee6a27	7801907001762	Hamburguesa	San Jorge	Carnes	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
923bbeac-3051-4cdb-9880-48755845bfd3	7891000419311	TRENCITO chocobrownie	Nestlé	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
c8ee2455-fa94-4960-9a8b-b10bcf37171e	7803403004025	Takis FUEGO	Takis	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
0d37e411-c239-4375-bdfe-acc28df0847a	7802910009158	FULLPRO	Lonco Leche	Lácteos	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
f1e281a9-e8dc-4135-914b-9745887203c6	78013322	Flan sabor Vainilla	COLUN	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
218803ab-eb3e-4c4e-b8ff-c63b55496972	7898994769019	Macarrão instantâneo sabor galinha caipira	maruchan	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
ed512d7a-0ec1-4534-b887-e658f79bf88e	7891048084526	Gelatina sabor fini morango e nata Dr. Oetker	Dr. Oetker	Gelatina	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
13dd3497-5015-4c03-9ef3-4c6c2e3e3e6a	7804660620829	Ramitas de garbanzos Sabor Queso	PURI	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
7fe2a46e-ed0a-4b96-968a-c099b3175cef	7898024450337	Manteiga Comum Com Sal	Três Marias	Pastas e cremes	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
9b18032d-dfc2-47ff-996c-6729cfe629cf	7802910009141	FULL PRO	LONCO LECHE	Lácteos	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
10e8c6d2-5e6b-426b-b7bb-ce6cb2af2589	7898236720211	Amido de milho	Monopol	Alimentos veganos	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
353dc315-6880-43fc-9f56-0d36580fe869	7804673913963	WILD PROTEIN SHAKE & GO	WILD	Bebidas	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
17d4724b-2e05-4c04-998c-747d463f8383	7804630011374	ROOTS	tika	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
2646064d-d1c8-425c-922d-a14d4b6b6d01	8445291836341	PIÑA COLADA	Nestlé Chandelle	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
c9d70115-8b4b-49a6-87a0-d28593ab98a6	7898295300584	Refrigerante de guaraná	Taubaiana	Bebidas	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
86a56340-e11e-458d-a596-0444d13db383	7898217001872	Queijo Processado sabor Requeijão	Supremo	Requeijao cremoso	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
762c55fd-7c11-4f7c-812d-830b7c931475	7896945402374	Catchup Tambaú Premium Clássico 380g	Tambaú	Alimentos veganos	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
29e7696b-7149-47b3-b417-88b81a188461	7896839145127	Aveia Flocos Finos	Da Magrinha	Alimentos veganos	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
7d291f9d-16e2-4b9f-8a7e-112811a8c5fc	7898063767007	Bela Ischia uva integral	\N	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
8390f533-3243-42bc-a6d4-25d9b4c0ed09	7897013809071	Manteiga Tradicional	Rádio	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
53256604-727b-4388-ad93-cb518b747a87	7804660620980	Puri Choco Pops con Cacao	Puri	Cereales	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
e2942f36-65ad-43ca-a27d-d697b4632614	7804660620676	PURI POP POPCORN CARAMELO	PURI POP	Salgadinhos	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
bbd9cf76-6563-4848-accd-5f4656fa3b5e	7896037916123	Geleia lu mocoto c/canela 60 g	\N	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
8a13a0ce-1e3b-4d5b-84b5-d512ccb3726e	7807910032557	Miel de Abejas	Cuisine & Co	Dulces untables	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
767fbab0-faeb-4fba-b025-6fcf98472025	7896046600112	Bicarbonato de sódio chinezinho	Chinezinho	Condimentos	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
35a14456-c27f-46d2-ae33-0c8cd3d47843	7898496681666	Alecrim Supra	Supra	Condimentos	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
f2f2f79b-c3f9-4114-8d8a-8b65b918d14b	7898227281417	Requeijão Godam Zero lactose	Godam	Requeijao cremoso	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
6812ca25-8bd6-4c1d-b12c-4e47322c6096	1565560015448	Ketchup pramesa 300g	Pramesa	Alimentos veganos	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
1c72ab41-5fdb-48c0-8d26-aff10dbcfe9e	7896046600181	Manjericão chinezinho	Chinezinho	Alimentos veganos	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
17715508-a29d-4c04-a2db-35bd6dbca0b6	7898079294009	Tempero baiano italianinho	Italianinho	Alimentos veganos	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
909c1df0-eb19-4af2-9a65-33e3f52a7cb9	7898079290025	Pimenta do reino em pó italianinho	Italianinho	Alimentos veganos	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
f04a8a9d-1466-46aa-87be-9509591cddaa	7896046600013	Cravo da Índia em grãos	Chinezinho	Alimentos veganos	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
f9c9a1ab-a210-4be9-857c-62441a15e987	7896046600075	T Orégano Chinezinho	Chinezinho	Alimentos veganos	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
b9e97c6b-9c55-4bd7-93b0-3c2bbc602ce4	7896046600167	Coentro moído chinezinho	Chinezinho	Alimentos veganos	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
f5c31328-df62-42d1-9264-7a1031d94984	7898416523892	Coentro em folhas	Kisabor	Alimentos veganos	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
ee30b732-2b56-4e31-ba0e-7491b6b1de39	7891091061765	Salgado	Pipos	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
aac00e51-0496-49f5-99af-26aec52ee8f6	7802820191004	Néctar de Multi-Frutilla	del Valle	Bebidas	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
4b72d64e-43d9-4c22-94c8-f96286310c40	7803468004176	Sándwich Miga Palmito Pimentón	Castaño	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
bc9377b7-3a1e-4c11-82bf-f3f251297c50	0799192196157	PROTEIN COFFEE BARS	Bob Marley Coffee	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
b3e3d56d-499c-4b49-a286-5bea27aacd71	7899970403828	Hershey's Ovomaltine Black 75 g	Hershey's	Alimentos veganos	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
ec1ea79d-7d54-40da-b60e-ddfda9f4e0b2	78011830	PROPOLGEA Miel	GEA.	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
e2fd05cc-236a-4f85-91d1-88e7888903d8	0400001143162	ATÚN LOMITOS EN AGUA	lider	Atunes en conserva	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
340e2225-4531-46e5-8003-7ac9e1e86dfe	0400050666957	ACEITE OLIVADO	Lider	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
a4107ef1-c660-4b4b-8370-bcc5e2cefc0b	7898904736841	Leite UHT Integral Orgânico Timbaúba	Timbaúba	Leites	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
e3617e00-3a62-47e9-9c7d-0decf39c6b13	7802410350118	SALSA ALFREDO a la crema	gourmet	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
6760e265-6b11-49f3-a2c2-7d7dbfd3c2ca	7896062800145	água mineral Nestlé pureza vital com gás	\N	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
2187ffde-e20c-4e66-9b0f-8ae93191916a	7898938492249	Leite Longa Vida Semidesnatado QUALITÁ	Qualitá	Leites	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
6e133c35-9d2d-44bb-b14d-fd135747c8c5	7804660620836	PURISNACKS Ramitas de garbanzo	PURISNACKS	Salgadinhos	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
eaf1f719-85ef-4620-adc0-1dc4d8cb7d19	4000539045080	Chocolate Com Flor De Sal	Lindt	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
148f36b6-37fb-4b51-afe6-4dbeb3cac464	7801620006600	+mas CITRUS Agua con Jugo de Fruta Natural GASIFICADA	+mas	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
8501e1ea-218f-4840-bb13-1e19627604b9	0898605356185	Óleo de coco	Copra	Alimentos veganos	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
491ecc17-55fa-425f-a3bb-d1bff04b4337	7898969797535	Suco 100	Tetra Pak	Bebida	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
815fc8a3-eedf-4680-8d07-111a36307e15	7896045111305	Cápsula 3 corações orgânico	\N	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
85d170a1-a7e8-4517-95b7-b6f32c37e387	7898162172023	Docinho de Leite	Doçura da Fazenda	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
9236c291-4d9a-4fe6-920b-182a3455a5ed	7896252205095	Milho para pipoca	Beija Flor	Salgadinhos	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
63ab9c21-189d-47b0-a119-9b0e196978e7	7750477720125	QUINOA COOKIES	NUTRI CO	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
0694efa3-b094-4946-b748-afabf011e4f2	7898949924197	Feijão Premium	Vasconcelos	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
a3f1c047-b979-4cb2-982d-388f001e97b3	0842210007062	PROTEIN EXTRA PROTEINA	LONCO LECHE	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
04bdd97f-e0ae-4350-9007-0b5b10212245	7809611711083	Lomito Fiesta	Super Cerdo	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
916bbd9f-864d-4d50-b622-16bbcafd4f83	7804673910252	PROTEIN Sabor Caramelo	Wild Protein	Salgadinhos	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
7281e6aa-c13f-4409-b9fb-6c706f8baf54	7896048705075	Leite em Pó Integral Leitesol	Leitesol	Leites	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
00c729cc-b21b-4326-91f0-466186a43121	7898603210277	Molho de pimenta	Lanchero Alimentos	Condimentos	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
e69516a6-3018-4e69-bc16-1dfe499adef2	7896056101234	Molho Shoyu Tradicional	Arrifana	Condimentos	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
5c515af6-5793-4e2f-999f-1dad58fc7550	7802900004040	TROZOS Frutos del Bosque	Soprole	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
c523acb8-6445-4875-b5eb-bc161fa2666d	7898994655114	Brócolis	Brocolis Bernardi	Alimentos veganos	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
b7459074-dab4-4dde-b5cb-a4caba6306de	7898994655121	Couve-flor	Brocolis Bernardi	Alimentos veganos	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
963feacd-a15f-4e92-8c34-7605ff5bf09a	7896022205522	Macarrao Integral	Galo	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
178a9887-e1bf-412d-9c8e-f285d2183f96	7896050201749	HYDRO PROTEIN	MOVING	Dietary supplements	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
05af2e05-d3d2-4f7c-9eb2-04e3e5d00fe3	7898945882163	Açúcar cristal branco	DoceSucar	Sweeteners	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
97459403-0644-419b-a74c-d55067da483a	7896004011325	Sucrilhos	Kellyy's	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
6e9d0b56-aeca-416d-9a4c-5ea21f6ea87b	7891515489106	Lombo Temperado Suíno Fácil	Sadia	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
0aecefbe-b92b-4500-b4be-507102586cc5	7802920010762	Yoghurt Batido Endulzado Naturalmente Sabor Frambuesa	Colun	Lácteos	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
9a4a7f64-08ca-4a41-90fa-d08f81150533	7801620009342	Pepsi 0% Azúcar	Pepsi	Bebidas	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
685417e8-5529-47f5-8621-971782071c49	7896354100113	Leite Integral	Marajoara	Leites	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
828d0785-8732-4d6c-9967-3d7a8a823264	7809611721167	LOMO DE SALMÓN AL NATURAL	La Crianza	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
046c44c7-ac5d-4b14-aa78-963fb5426b2a	7804651860531	CHOCOLATE	manare.	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
a5841cc8-c9fe-4034-a86f-e15ed34ad251	8445291716841	TRITON SABOR VAINILLA	MCKAY	Salgadinhos	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
10ee69d4-cc02-4d06-b1c2-290c4208c5fc	7803908006227	mango piña naranja	GUALLARAUCO	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
b7a13bd3-522f-4134-8b1e-7f024bad3189	7892840823047	ruffles churrasco	\N	Geral	open_food_facts	2026-06-03 13:59:24.035	2026-06-03 13:59:24.014
33170ade-d6e3-4377-8a74-3d349313cff3	7622210533326	Snack Cebola e Salsa	Club Social	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
434137d3-e4ee-4dd6-b235-bdf965b614b0	7896077602086	Requeijão crioulo light	\N	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
40cd993c-536f-41bc-88ea-40461ec9d241	7896423438581	Cookie m&m’s	m&m’s	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
a80e5293-ec1f-4bf3-b2f6-1dca940e8d8c	7804630011503	Snack Artesanal de Papas Nativas de Colores con Sal de Mar	Tika	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
e63cfddf-794f-4e84-98f3-0a49186caf2d	7802920004969	Sin Lactosa	COLUN	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
9026cfa5-10d5-4fdc-8bea-1d1bc489cce7	7804617470293	Equilibrada	Surlat	Leites	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
97813d99-ed57-4e45-a8c6-2ec2f3ee519e	7896369614872	Champignon Inteiro e Conserva	Mariza Foods	Alimentos veganos	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
53314536-3bf3-4cb6-83f4-b0711bb9b50d	7896039010218	ebicen cebola	\N	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
a120d45e-2718-4d5e-9676-13d3caa575d0	7804632980302	Descremado Natural Yogurt Sin lactosa	Artisan	Sobremesas lácteas	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
27910452-d429-43a6-b72b-c85088c81daf	0021000070268	LIGHT MAYO	Kraft	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
73888e9b-cb39-43bd-8858-8987737c81c3	7898080642974	Mist láctea italac tp	\N	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
e8005642-e6fb-4c32-a52b-982ee0a72d87	7802926001894	Frutos del Bosque	San Francisco	Congelados	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
eaea5b71-e4b5-4bf8-a750-180b8a078a9e	7896664700294	Mistura para Canjiquinha Cural	Incamilho	Cooking helpers	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
805947dc-2414-4877-b603-d41242960e5a	7802200129887	Kipy Gomitas	Ambrosoli	Salgadinhos	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
7b1f24d8-ccc2-4b73-b870-4edd1a165c43	7802810011909	NARANJA MANZANA	Watts	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
e3911296-5e43-48d1-92b9-d58f5f49370e	7802810011572	Watts 100% Fruta Manzana	Watts	Bebidas	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
cf10e11c-f0f2-42a7-a5db-07fd8b296677	7803525001810	Salmas Camote y Zanahoria	Sanissimo	Salgadinhos	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
3e03919b-82e1-420e-b922-c3ed0e6f89d2	7896232801866	Amendoim torrado sem pele	Geriba	Alimentos veganos	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
424fd1d6-be79-4602-b6ed-e9ac467a89e1	7898701305226	Milho para pipoca	Casademãe	Salgadinhos	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
8cafbde2-06d9-4899-9575-a19c7a50deb6	7898912704108	orfeu descafeinado	\N	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
95d6f9fb-858e-4e63-b746-52660f0f80f8	7898056082605	Sorvete sabor chocolate, creme e nata com cobertura sabor chocolate meio amargo	Cremoso	Congelados	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
a5a880bd-4539-4be6-bead-e76c66419ea8	7613032475581	SUPER 3 MANI!	Nestlé	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
e0b93cfd-bd0b-401c-8914-eea6c29e7cb8	7891203050427	Bisc. Salgado Panco Cream Soda Sabor queijo 400g	\N	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
33832091-62ac-46eb-b54e-55cade565677	7896256042900	Snack de arroz Natural life sabor original 84g	\N	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
7688fad6-04c9-4178-b15c-eea694134beb	7802910008113	Break CHOCOLATE AVELLANAS	LONCO LECHE	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
e3783fec-a20c-4a0e-b8c3-7d1653f4c269	7804665210100	Bless 5	Bless	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
705cfd1f-30e3-4ebe-ad63-d973a51d3aca	0793969002528	Cookids GALLETAS INFANTILES SALUDABLES	KUNA foods	Salgadinhos	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
4141804c-5bc8-4fd4-b2e9-e135d26b6847	7892840822781	Baconzitos	\N	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
3803bb9e-e501-4719-b278-975adfe42ee0	4001450118051	Rollitos de barquillos chocolate negro	Gottena	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
0d833a1a-feb8-4bf2-ab90-2e9194f66ea5	7613037839715	Compota durasno	\N	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
d3cb273c-e05a-415c-ab23-2edf283e26c9	7801620007317	PEPSI	Pepsi	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
50b4850b-e62f-48b3-af40-d2a8b1b68231	7898511802212	Chocolate com pedaço	O Sorvetão	Congelados	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
1c29cc04-0da3-443b-a574-87003f9beccd	7802910008427	SIN LACTOSA TROZOS PAPAYAS	LONCO LECHE	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
d36a252d-1db7-4509-b8eb-49d82d1fb5df	4896193202156	Queijo minas frescal light	Quatá	Queijos	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
710e373f-ebe5-47bd-9a23-f8d59f02faf8	7896036099643	Óleo Composto de milho Liza bolos e doces	\N	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
f2c802d0-1f59-428f-8746-3b7678bbf9e0	7802215121050	COSTA SALTED CARAMEL	COSTA	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
441b919c-f627-40b4-a26f-ebd6a119850b	7891203061621	Bisnaguinhas Enfeitiçadas	Panco	Alimentos veganos	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
21b13084-2dac-496f-8916-85d224e650d3	7899941203310	Whey Protein	Probiotica	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
25bf3fa5-c4a5-437d-b0d4-6bba29f4b743	7891203061317	pão integral Panco	\N	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
988314c8-1d86-4369-bc00-e834432c40c7	7898330152000	Aveia (Oats) - Flocos Finos	AllNutri	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
dcac19fc-7a85-41fd-b5d3-174f777b8e3e	7891097106040	Manteiga presidente tablete zero lactose 200g	\N	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
04b67446-cf23-439d-91f9-fbf3c8ab6df9	9557062361194	mistér potato sour crem	\N	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
9b833a59-9139-4a37-ad1a-d86b9f5815b0	7896569405638	Requeijão líder 180g	\N	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
dc0af5f9-32f0-4c4b-9c47-54dbf192f155	7891164007157	Banha pote aurora 450g	\N	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
99c392fc-c42c-49a6-80b7-6cce6081ce27	7898286190590	Ketchup Marata	\N	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
31e7936c-bf7a-46cd-a416-8bd6ac60b9d1	7804609252739	PROTEIN bite	your good	Salgadinhos	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
67efcd29-4224-4890-9e2d-20e73c15090e	7897318200023	Peta	Forno Mágico	Salgadinhos	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
786ca018-7497-4d3c-863a-eb44b24c12a0	7896261402829	Bara de castanha nuts Cranberry	\N	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
a27c98f9-fb0f-4729-99c0-15c8d8c73711	7802000019104	Lay's tamaño L corte Americano	Lay's	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
4f2949ef-b807-4e4b-b54f-4879dfbf56b9	0991495154104	Colorífico	Kitano	Tempero	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
9f91f4a7-2fdf-453a-8f27-5640ef6e1b2a	7802200135413	BOOM Gomitas Acidas	Amorositos	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
8fb0e78f-eae3-4358-b340-a0842ed323f2	7898948041772	Alfajor	Doces Boa Vista	Alimentos veganos	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
ea0ad793-4aa3-4081-bb28-a3b9fe860520	7896999099117	Bisnaguinha	Thabrulai	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
8856de0d-6eca-4a20-b4c7-2c77480886b6	7804658020990	ORGÁNICO PURA MANZANA ARÁNDANO BETARRAGA	AMA. TIME	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
7727e0ca-666a-481f-92fd-6f1f34632b28	7891079014257	Croc Choco	Nissin	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
e78adbfb-b617-4661-a985-fdd85a9abdbb	7898380412789	Salgadinho Sabor Requeijão Com Milho e Quinoa	Belive	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
58faf54a-01a3-43eb-bae1-5393e15fd740	7898957354733	Barra de Amendoim, Castanha, Semente e Côco	Pintai	Salgadinhos	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
a02c13b2-3f41-414f-8fdf-e42acab6225c	7804630010971	CRUNCHY GRANOLA QUINOA	tika	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
7158d9af-3610-47d3-8d64-cbfe126cb955	7891527044881	Mortadela com Touchinho	Copacol	Meals	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
a1db12c8-b322-4f6d-8077-483793769f3b	7802410371014	CREMA DE ESPÁRRAGOS	gourmet	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
798492d3-2a78-4a60-b62b-6f387a58bea0	7802920801681	Mi YOGHURT BATIDO SABOR VAINILLA	COLUN	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
0bdbaa1f-31bf-45cb-8d8d-a41914d19277	7898215151425	Manteiga Com Sal Sem Lactose	Piracanjuba	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
c16bd19a-bb1c-44ff-a77e-fc5031b84160	7802215615085	CRACKELET	Costa	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
65ec198a-6359-4c45-812e-647f9a1ce855	7891098042316	Chá branco leão, sabor lichia	\N	Bebidas	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
221ec4a0-cd9d-42ef-8e0d-611658f123b1	8809059296004	Rollito de Arroz	HOSAN CO.	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
2618f799-5205-4d1c-af8b-0ea2ea984a06	7898953148879	Suco de laranja	Prats	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
0cc25372-116b-4d89-b8c0-29a78f68ba6e	7898591453274	GUSANOS ÁCIDOS	Fini	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
7fabb363-c3fa-423a-aebf-8cb1fb9b40aa	7891962078205	Chocottone Fini	Bauducco	Salgadinhos	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
00359ba0-2241-4d6a-96b3-b2a316ba4853	7896122304316	Whey 15g Proteínas	Porto Alegre	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
ee9b0a05-0a49-40d1-ade5-93c61737c31c	0725765444912	BROWNIE MANÍ	just protein. ISOLATE	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
0a5dd90e-e06d-4dd7-b1d5-3b4c6ec551ed	8852084507027	ATÚN Lomitos en	SAN REMO	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
c2a2f15b-f36d-40c6-aacd-3159dbedf1f4	7896348300895	Café Solúvel Melitta Tradicional	Melitta	Alimentos veganos	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
af6c11bb-f99e-4351-bfe2-bfb32b382ead	8445291796478	MUSEO	McKay	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
cd8655cb-d7dd-4478-b614-5d4c7b83372d	7896715607046	Albumina Proteína da Clara do Ovo	Naturovos	Dietary supplements	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
885d4094-4a65-4ea9-a0af-5815fec1848f	7898937330030	Pão Lanche Fatiado	Coperpão	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
80ab23a7-626d-4db4-aaa1-d7f4f12057cd	7803468005333	MULTIGRANO PROTEINA	Castaño	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
4eb3c744-483d-46bb-b4fa-4afc32b5581b	7801610002179	Sprite ICE	Sprite	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
5b02c2fb-4b61-454c-90eb-4969f0ef2cd9	7801250000306	Choritos en Aceite	Angelmo	Geral	open_food_facts	2026-06-03 13:59:27.246	2026-06-03 13:59:27.224
dd24a00e-8aac-435a-99e5-fe0a24af2e24	7802820670998	POWERADE UVA	Powerade	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
175d2b78-5d59-4b28-9fd3-1636a84468d8	7803403004131	Salmás Clásicas	Sanissimo	Salgadinhos	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
e2e3cebd-5133-4d17-8ca9-cc33aabf40a6	7896422001151	Salgadinho de trigo sabor bacon	\N	Salgadinhos	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
3b0c903d-957f-4a5c-9d39-915dc993a2b8	7802500000411	GNOCCHI DE PAPA	TALLIANI	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
b6a5dd94-b437-4356-947a-33b5853f956d	8437007389586	Nachos Tortilla Chips	Mission	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
a625e64d-dc62-4760-9acb-2db1fa6d8ebf	7908237700843	Tony's potato crisps	Tony's potato crisps	Alimentos veganos	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
eed905b2-3a55-4c52-9f93-9e7321e7b31c	7802100005076	GOLDEN LAGER	ROYAL GUARD	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
4a935c1b-ce25-46dc-ac76-5e2b707c7a9e	7808709504323	SIN LACTOSA	Lider	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
d06bd3e4-0d2b-4f19-b0d5-b0f88d017760	7802130000775	Stella Artois	Stella Artois	Bebidas alcohólicas	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
bb10f920-8319-42df-8d45-16d05f1d8853	7802100005113	CERVEZA PATAGONIA	PATAGONIA	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
77baddc6-dfc0-4b6b-9807-34206cd3ec64	7803520001969	Galletón BERRIES Galleta con avena y cranberry	ecovida	Salgadinhos	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
5ae028d8-1a9c-4843-8818-22427fe99983	7803500001125	QUEQUE RELLENO MANJAR	NUTRISA	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
b29c3087-f936-4b90-8702-59817f9c7ae0	7801235002417	LOMOS de JUREL	SAN JOSÉ	Seafood	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
8734808e-9ca3-4692-a5b4-177a45fb4e88	7804647175892	Passata di Pomodoro Rústica	Tottus	Puré de tomate	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
1e7169ad-5be6-4ae0-9f3f-e7504cec0ce3	08115117	PROBIX	FUXION	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
1af2cad0-ffdc-4ffc-ae87-abbceba5e417	7804651860135	JARABE DE AGAVE	Manare	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
22a3f219-e1cf-4de5-a87e-50041c2beed7	7803403004551	PAN BLANCO FAMILIAR	SUPER XL	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
7bc41840-0e4b-4270-bcfa-fb208770468f	7802225640602	RIGOCHOC BLANCO & NEGRO	ARCOR	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
3e128267-50bb-4de1-9c2c-6b303400c84d	7804660620515	PURI POP POPCORN	PURI POP	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
f13a7b0b-7be2-4a85-8a7a-d7710b022247	7896986290121	Wafer recheado sabor limão	Cacau Show	Salgadinhos	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
58850de6-5cd9-456f-b9c8-4a3a5ac211f1	7896050201503	Protein Booster	Moving	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
84df5edb-1d82-41af-9c15-44cb1718baf6	7803403003295	Queque SABOR LIMÓN	Mia de mi Alma	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
2fc25829-e401-46fe-9669-9558c25433e4	7759475002899	TALLARINES 77	Nuestra Cocina	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
b1a9e6bc-6914-471d-9c2c-10f9befc94b1	0040000651420	Twix	Twix	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
ad986276-d095-4b19-8794-04bf99de5763	7801620009441	Kem TU SABOR TROPICAL	Kem	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
475e36fb-6bc4-4726-9129-3d78ad9708e1	7804672825489	Atún Lomitos	TOTTUS	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
72abb6bf-d193-49ac-ba7f-54385f6761c1	7802800535576	Kryzpo Sabor Queso	Kryzpo	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
c7235944-e7e9-4721-82a6-3917f38c6f23	7801620360153	Canada Dry Ginger Ale	Canada Dry	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
c60a0b58-6ab9-4f93-9909-8b6fe7a45095	7894900509601	Powerade Sour	Coca Cola	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
a4386f49-1260-4a61-9b4a-11ba9ed782b1	7802800576739	Livean Sabor a Berries	Livean	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
46e3a79b-76a8-4a83-8da4-d9f39cf9109c	7891025125181	iogurte morango	Yopro	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
02df6845-a109-4a8d-9b52-85589fe297a7	7898300632075	Mel	Floresta Verde	Pastas e cremes	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
29b33c65-55e2-43b3-a81a-c695ee5980d5	7807910034919	PALMITOS ENTEROS	Cuisine & Co.	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
e310e80d-a066-4d7f-947c-6e6a93826583	7802000014574	CHIS POP	Evercrisp	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
6888d990-ad23-47e8-9e6d-ff69f3edd94b	78013285	Jalea A Frutilla	Colun	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
6b4b6aed-3409-4e71-9727-bc2f64faea71	7802920010670	Yoghurt Batido Sabor Chirimoya Sin Azúcar Añadida	Colun Light	Lácteos	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
2c19e1fe-8b07-48d4-a545-504bc670ecff	7898971472352	Psyllium Husk em Fibras	Empório Madoxx	Dietary supplements	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
6c796536-5bfd-4832-ad1f-317f8d8447a3	0659525893422	KIRIPOP	KIRIPOP	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
676e8293-0c8e-458b-ad95-631fd44d5f5a	7803468005340	CALABAZA PROTEÍNA	Castaño	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
f799801f-dbbd-43bf-a9d5-d351a3df0c3f	7801913000124	CHARQUI DE VACUNO	Las Cardas	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
1d21d3cb-3184-4108-9881-16d4b44f01ab	0070177197247	Chá Verde	TWININGS	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
b94ce2ae-7e05-4c70-a1cd-44c5f26d69d4	7802215508554	Donuts COCO CRUNCH	Costa	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
9c09d9c5-41ff-4456-af8e-724af6e69aa1	7896080843025	Macarrão parafuso	Liane	Macarrao	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
39fdd43c-c0d9-479c-be48-b950b639e0d1	7896294901764	Manteiga de Primeira Qualidade com Sal	Paulista	Pastas e cremes	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
48a612ca-2662-40f4-80f4-1986bcf5a21b	2860900300017	Schweppes lata	\N	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
2131e19d-ec62-46d2-a233-72cd13c34973	7896259412588	Leite em Pó Integral Instantâneo Camponesa	camponesa	Whole powder milk	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
16059133-9ebe-472f-924b-cda5916cda58	7800004399536	TAPSIN Caliente DIA	Maver	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
735a868c-bbe2-415f-8d10-36b2b44205c3	7801420000617	Natura Aceite de Oliva Extra Virgen	BANQUETE	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
38967117-49b7-43a6-b686-8ac6e542ec60	7804635931547	galletitas de arroz	Lider	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
6d538afa-a4b1-4bcc-a269-7ed543106851	7897277704082	Queijo Minas Frescal	Atilatte	Queijos	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
9cd3c696-9f83-47c6-904e-9fbd08839d88	7897173051761	Panettone com frutas cristalizadas e uvas-passas	Marilan	Salgadinhos	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
c7a334e3-ed6e-4859-8226-00f8b3f4cc3c	7801620006211	MANGO MARACUYA	Watts	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
6d8e9d3a-7ce3-4288-9c8d-70bbd2c7e8ca	7896862003289	Iogurte Frutape	\N	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
f40aa482-3356-4d06-8470-2ceed425961e	7802200270572	MANZANA PERA ESPINACA	Vivo	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
11e2140f-8ad8-42b5-846c-26d86bd8e2d6	7896383300096	Vinagre branco	\N	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
da364aca-a01b-44a0-b3bd-8608d8688db7	7804651620265	Sabor Maple Syrup	AluSweet	Sirope	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
91f79d55-fb0c-4149-8bdc-0d24ea1c99c0	7898156061241	Pão de forma integral 40%	TriMais	Alimentos veganos	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
b64fc834-7a4e-4fac-b699-1f5e823d27f9	7802200129115	MARSH MALLOWS	Ambrofoli	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
f585ec92-2966-4bb7-9bfd-78ffd0e675cc	7804643820543	LOVE LEMON LIMONADA	LOVE LEMON	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
d30009e5-7398-4203-ad87-69f3e0d8d102	7802408000421	Orange	Frun	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
77e51246-9b54-40c0-b71b-7ad2eda57892	7802420510403	Esmeralda	Esmeralda	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
ae664b6c-5a20-41ce-a7d9-0bd2d971d825	7896665822001	Alfajor recheado com doce de leite coberto com chocolate	Líder do Sul	Salgadinhos	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
f6a1bf45-5b74-4ea9-afd2-e59dc642397a	7898955711347	Manteiga comum sem sal	Lacticínio Alto Alegre	Pastas e cremes	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
4042fec4-a9e9-4f34-8534-be78ba6bcd2d	7801610671016	Fanta zero azúcar	Fanta	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
592327b3-9555-4279-b3b4-350866e39ab4	2000000153529	Pea Protein - Proteína de Ervilha (Suplemento Alimentar em Pó)	Growth Supplements	Dietary supplements	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
49736bb6-df4e-4865-abb6-0bd7c0f87f83	2000000153530	Rice Protein - Proteína de Arroz (Suplemento Alimentar em Pó)	Growth Supplements	Dietary supplements	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
3928ea93-d840-40d1-ae20-1560f71b4bf9	8445291296732	CHOCAPIC	Nestlé	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
8a6caa3b-7f63-4c7f-914e-930208660b3d	7891164006129	Salame aurora	Aurora	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
2342ce73-e51d-46ff-9c1e-5f4a77126092	7898977073010	Proteína de Soja Isolada	Bellnutry	Dietary supplements	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
0214f24f-8e15-428c-bbb6-2d6255ca7a11	7798344080170	BABY CARROTS	LA HUERTA	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
f0042f66-e02f-4732-9f0d-7d4e5797ba4e	7898943849229	Molho de pimenta cremoso defumado	Mendez	Condimentos	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
56fc55f8-026a-40f1-9bf9-dd095f625956	0074468951174	Sorvete de flocos	Tropical Sorvetes	Congelados	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
54f48567-6b45-427c-8ae0-649657fabbb6	7804647491466	Cacao Dulce	Lider	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
0c68af17-2783-47ed-b499-4bf41b3dadad	7898598189954	Amendoim Torrado com Casca	Benassi	Alimentos veganos	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
0f09eac9-fd83-4095-a473-8b5e1bcfdbeb	7802408002951	TABLETON	Fruna	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
1e860550-5763-491d-9e01-49b0a7ecb604	2014060101858	Almendras Enteras	Choceur	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
99406177-94a9-4752-be62-80bef43e9e3c	7802200400054	Mango	Vivo	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
fdca4893-9958-4fb5-837a-09d4d12d71a7	7891000406441	Panettone Recheio Trufado Chocolate Meio Amargo Nestlé	Nestlé	Salgadinhos	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
081e2d33-5be6-4f51-980c-f0cafa0c9cb0	0742832866378	Crunchy Peanut Butter	American Classic	Alimentos veganos	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
03b0aea8-de4e-4650-b072-ababb112c5cb	7898418140905	Pepino em conserva	Divina mesa	Alimentos veganos	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
165e2cbc-b1cb-425f-84fb-7e90b96e8c33	4006894177404	PFEFFERNÜSSE	Lambertz	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
8355464f-2fd5-47b2-89c2-f23e82311965	7898971038008	Queijo minas fescal	Miki	Queijo serpa	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
0189422d-72e5-4bd3-a253-7b11b2b04316	7802000018251	Todito Dulce Choco CS Gatolate	Todito	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
c9f90ac9-91be-4aff-9764-c1ba832dd37b	0737186382773	KOMBUCHA Tesoro Milenario Mix de Berries	Dr. Kom bu	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
55b21de2-651c-4a10-a463-2f131ab69ffb	7896005806753	CRUZEIRO café de grano	CRUZEIRO	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
0f29b20b-9304-48fa-9e8f-eb35779a89ab	7897535410229	Mel Flores Silvestres	Santa Bárbara	Pastas e cremes	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
6ebef1ff-9c92-4f71-8a4e-e21e8face1a2	7895000528868	Ameixa seca sem caroço	Qualitá	Ameixas secas	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
0d6d4652-fede-4e96-93da-08c3cb402dc8	7895000525621	Uva passa escura sem semente	\N	Uvas passas	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
903e966d-3034-4f49-8e9e-56b72029bea3	7895000465279	Ameixa seca com caroço	Qualitá	Ameixas secas	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
7ff6c15a-7ec8-4ccb-847a-e0e8392843a3	7896791904183	Beb. Lac Pulsi Morango 480g	\N	Geral	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
963cee69-9553-44f1-b75d-17e4ea64c9b2	7898205925739	Requeijão Cremoso Reduzido em Gorduras Totais	verde campo	Requeijao cremoso	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
36f1c451-acc7-4072-a8d1-26a914b016cb	7804665370262	KÖMBÜCHA Arándano	KÖMBÜCHA	Bebidas	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
1ee01e87-00fa-4aee-b27a-628350c3e76e	7613036048040	Nestum Cereal Infantil Avena - Arroz	Nestlé	Cereales	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
e497f153-c82d-4c09-9a69-dc7322046174	7898649352597	Frontera chilli	\N	Geral	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
17b98115-a21d-4559-a9dd-bbaed21df568	7898097891099	Suco misto de maçã e manga orgânico	Organovita	Bebidas	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
42afc828-9d2f-4eca-9665-e91c67f4b80a	7802910009066	LECHE SEMI DESCREMADA SABOR FRUTILLA	LONCO LECHE	Geral	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
59862f01-ed75-4e48-92c4-12de51cc6145	7898677577740	Cúrcuma Indiana	WeNutri	Alimentos veganos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
878a739a-74d4-4593-89ea-8488f297c1d1	7898994253471	Farinha de Mandioca Torrada	Mani	Alimentos veganos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
6d45a4cd-0237-42a7-b90a-119b14cdd644	7898416521119	Farinha de Mandioca Torrada	KiSabor	Alimentos veganos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
4fa29473-b349-43e4-82f7-316684fc0933	7897105200038	Tuchaua Guaraná	Coca-Cola	Refrigerante	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
8f517ef6-a92b-4421-a2c3-4143936dc98a	7891000403129	Nescau	Nestlé	Achocolatados	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
375befb5-200d-4fbe-9ca8-1a1fa3b7d5ff	7896066301327	Pão de Forma - Do forno Castanha, Girassol e Quinoa - 61,7% Integral	Wickbold	Alimentos veganos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
9e060879-bd8f-445f-8b4e-a7a7ca38aad7	7895000327935	Macarrão de Sêmola com Ovos Espaguete Qualitá Pacote	Qualitá	Alimentos veganos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
34888add-eb01-474b-999c-9a84572fe75d	7896412800795	Massa de sêmola tortiglione	Orquídea	Massas	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
3b960b30-90c8-45d1-96bc-8f8cc49ee6a6	7896021821181	Massa com ovos penne	Nordeste	Massas	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
2da4d75c-706e-41ba-ae25-0ad1271ee53f	7896204359876	Lentilha	CBS	Alimentos veganos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
e7e65cfc-7c6e-40bf-9785-26256e845e12	7897265602703	Composto de Erva-Mate	Schneider	Bebidas	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
ed148a11-4a6c-437d-b482-19fd1f25f341	7898033580100	Feijão Preto	Brehm	Alimentos veganos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
c012bced-f1e9-4fb5-8e49-6323c0ad666c	7898775170119	Panetone Cioccolato	Bacio Di Latte	Geral	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
f9aba4a7-4809-4e43-bf17-f16ccdd7fb6d	0400050283727	ALMENDRAS NATURALES	Lider	Geral	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
70346611-ac34-419a-a582-88c0062cb81c	0950000218708	Chocolate Protein Crunch Meio Amargo	Vitao	Salgadinhos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
dd888cc1-0a5a-4fa9-b34e-606557098ac6	0950000222619	True Protein Bar Chocolate Meio Amargo True Source	True Source	Salgadinhos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
d70bc117-dcf7-4b0e-8884-bc323a199c9b	0950000189179	Barra de Chocolate Nougat 70% Cacau Super Vegan	Super Vegan	Salgadinhos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
8fa30d3e-a517-466c-bc04-d05fa76eca71	7898971754144	Chocolate Meio Amargo Gengibre Liofilizado 65% Cacau Warabu	Warabu	Salgadinhos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
2d08b15b-7009-4353-a255-37744291f6d3	7898971754502	Chocolate 60% Jambu E Pimenta Assisi Warabu 40g	Warabu	Salgadinhos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
a19de5a1-64de-4f1c-b076-72a761ae3db6	7898971754120	Chocolate Meio Amargo Açaí Liofilizado Comunidade Urucará 61% Cacau Warabu 70g	Warabu	Salgadinhos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
59d49292-8931-42a3-bbf1-1480c11a6337	7898971754519	Chocolate 60% Com Pedaços De Cupuaçu Warabu 40g	Warabu	Salgadinhos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
a1c06697-bb10-4f89-bc63-e8312cc21d57	0950000173625	Best Whey Bar Brownie Chocolate 32g - Atlhetica	Atlhetica	Dietary supplements	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
2e7d6200-bdc9-4349-bb0f-065973404d45	0950000232800	Panetone com Frutas Sem Adição de Açúcares Mundo Verde	Mundo Verde	Salgadinhos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
f94a025d-c9f8-4359-9098-253ed7945200	7898931157015	Sorvete sabor iogurte e uva	kimania	Congelados	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
8c44f261-e9d6-4d94-b932-be354d461412	7802100005960	Stones Berries	Stones	Geral	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
dc174df1-a959-4fa7-be5f-ce4238aba57f	7801610220108	Coca-Cola Zero Azúcar	Coca-Cola	Bebidas	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
ea5de60a-57fd-4a87-9322-b331201c79e2	0799192229930	GRANOLA	CASCARA FOODS	Geral	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
f29c6ba5-6733-4e38-95c8-fa1403335d6e	7804673840535	PROTEIN	Your	Geral	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
0ac5199a-9bfb-4b0d-91c5-e6d2b9b25922	7898934847012	Bolacha caseira	Mar & Mar	Salgadinhos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
204b32ad-1b1c-4c6e-81a6-827f592b3865	7896089089936	Lor	Soluvel	Alimentos veganos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
c53d9070-278b-4c8f-9fe9-ff2a63a10c64	7898769040060	Mel de Flores Silvestres	Apícola Shizen	Geral	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
9a1010a0-427d-4898-a130-42ae44c1cd82	7898098591080	Sorvete sabor leitinho mesclado com cobertura sabor chocolate	Sabory	Congelados	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
e4646135-23c1-43f4-b728-b17bff3115bb	7802800709663	PÜRFRUT manzana&mango	Livean	Geral	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
5491ea11-bd3f-44ee-8674-805fa4626cd7	7898295032140	amendoim Rockitos 24 g	Balsamo	Amendoim sem pele assado e salgado	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
18d961ed-2bd9-4a24-87bb-8ab8e3a35f73	7898295038104	Balsamo crocanty amendoim crocante sabor churrasco 24 g	Balsamo	Salgado	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
5c2e2be2-34c3-4e36-b740-74de29607033	7896731301157	Vinhos Suco de Uva tinto 1 L	Quinta do Nino	Sucos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
33ba688a-5789-4a86-88a4-d0dbbadf0ed8	7896278178908	Presunto cozido sem capa de gordura fatiado	Seara	Carnes	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
8a2eddb2-57ed-4417-bd7e-2213dc3c70d4	7803495001780	Pan de PASCUA	Lider	Geral	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
5dfc0276-3714-4bb7-bd52-ae526799d801	7801534002330	SARDINAS EN TOMATE	Deyco	Geral	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
e931496d-de48-48bc-856d-09d34f65c08d	7898416521072	Farinha de mandioca seca fina	Kisabor	Farinha de mandioca	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
fa14d3cb-b694-4ee9-a923-7a83e707a180	0400007497665	GARBANZOS	Lider	Geral	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
e3781b42-dd63-4943-998a-896db2dfd334	0618231386031	Queijo mussarela fatiado	Rohden	Queijos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
0722a2e8-6eb3-4ae8-98b2-0d6a790b3080	7896005404072	Suco Maguary laranja 1L	Maguary	Laranja	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
d7936004-e72a-4a63-9360-9d7d9d66e527	7897213319967	Biscoito doce palitos de chocolate	Piccinini	Salgadinhos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
58b8de3f-5211-46a4-a2e6-f63daf7d2382	7897213319622	Biscoito rosca de calda	Piccinini	Salgadinhos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
131ae0a6-23fd-451f-b6bd-0db86b754e0e	7896111424599	Biscoito doce maisena	Ninfa	Salgadinhos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
233b15b3-5c78-4f9f-a9c1-76d59fae9622	7898634810170	Doce cremoso sabor doce de leite	Lampione	Pastas e cremes	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
8b8b77c2-ee88-4be8-8009-4e79057cdec0	7804669210052	BELGIAN Waffles	Belgian Bite	Geral	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
97ddbd40-eb46-47b6-ba17-20d0cf33e8b3	7802200122055	Old England Toffee	Ambrofoli	Geral	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
4f2e045a-3be8-49f5-8382-3e696d43db25	7804613391004	MANTECOSO	Lider	Geral	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
a4e638b9-770e-4aa1-8b8b-927f43d758a4	7895000537488	Panetone frutas	Pão de Açúcar	Panetones	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
a16df1e1-4345-4e45-8cb5-b57a367eeea8	7896015910600	Farofa de milho	Pinduca	Alimentos veganos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
b9bfebbf-8878-46a6-9f3f-dd615b72bd2a	7896232800517	Milho pipoca importado	Geriba	Salgadinhos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
91af55ec-e66d-490b-b820-4480875eb0d2	7895000529162	Damasco seco	\N	Damasco	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
75c66ce8-7828-4bf9-b468-e2d4aaf9a345	7896451928894	Maxmallows Paçoca	Docile	Geral	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
5cf43b8f-bbe5-4e50-b6dd-bf6fc2364ea5	7802200400047	Vivo Durazno	Vivo	Geral	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
e06c844e-7f28-4142-897f-220d5989055d	2464350004220	Pão de queijo mini	Zaffari	Alimentos veganos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
7d4fbead-1b54-4189-87f8-9f04ac433d35	2101150002925	Biscoito 3 queijos	Zaffari	Alimentos veganos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
0c8e818e-67c5-47ff-a642-7eaab70450e9	2525110001719	Pão de tapioca e queijo	Zaffari	Alimentos veganos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
050c4fec-7f89-4055-84c0-a6ba2572b8eb	7896278145382	Panettone com gotas sabor chocolate ao leite	Muffato	Salgadinhos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
e2c9e414-7c0a-4954-a8d8-15c79c86ddf9	7896438150300	Panettone com gotas sabor chocolate ao leite	Festtone	Salgadinhos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
3fb65d21-aeaf-49e7-b1b2-767144758ec1	0751320341617	Suco de laranja	Essere	Suco de fruta	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
0eb5bdee-43fd-4e1f-aad0-84a0cb43c0a6	7898701300313	Broinha de milho	casademãe	Salgadinhos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
9930be5a-9bb5-47dd-b4d0-e19c106777a1	7898701300283	Sequilhos laranja	casademãe	Salgadinhos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
5e46e851-9336-4a3c-80c9-8db9565c10e2	17894904271679	Margarina uso profissional	\N	Alimentos veganos	open_food_facts	2026-06-03 13:59:38.63	2026-06-03 13:59:38.617
598f3eb1-695f-4996-9f49-5542fd2eb1e6	4906309678901	Vinagre de vinho tinto	Único	Vinagre de vinho tinto	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
9f72ad0b-35b2-4646-87d0-dbfd5c69b22e	7896089328240	Vinagre de Álcool	Único	Vinagre de álcool	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
ef2a8560-8b1f-4c15-ad1a-2cad809448e0	7896306625534	Mossimo Coco	Trento	Salgadinhos	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
40d02ccc-d496-4f1a-8364-dc8aab17bffa	7898206356907	Panettone W/ Chocolate Drops	Panettone	Chocotone	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
99318f50-1dbd-41e1-836a-c8505d39d04c	7801875057020	Good Rest	Supremo	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
ec142abd-c317-41ec-82f3-3d721ccfca48	7891000437612	Wafers recheado coberto com chocolate ao leite	\N	Salgadinhos	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
a2ecd141-4418-4d3a-aa24-df30eabcad83	7896998701288	Pão De Forma Integral 59%	NEWBREAD	Alimentos veganos	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
755f9f9e-cbc8-46b2-95ab-daecdbceeb17	7896986257919	Chocolate ao Leite Harry Potter	CacauShow	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
b225cc7d-818a-4de3-84bf-56e2a6b15673	7790040424166	Maná sabor Vainilla	Mana	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
fa244240-d8f0-4efa-ac8d-73353bb47220	7891091061987	Salgadinho Pippos Anime 60g Bacon	São Braz	Salgadinho	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
1a0d8bd3-0471-4f06-aa71-0ce40a0d8e28	7804621471781	ATÚN LOMITOS	Robinson Crusoe	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
d51ace3c-6e92-47f8-83f6-82450bcb2086	7898934982331	Chocolate 85% cacau	Only4	Salgadinhos	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
6257c8be-f41a-407f-be1e-6052f28b7186	7896278145337	Panettone com frutas cristalizadas e uvas passas	Mufatto	Salgadinhos	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
5be160a8-f8a9-4a38-a523-46c7e4decb85	7896066304946	Panettone de frutas	Wickbold	Panetone	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
8a764c03-cad1-4488-a5d0-e73b9d4f9f9a	7898024450146	Queijo Minas Padrão	Três Marias	Queijos	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
04db4fae-627d-467d-b1c2-3090405858ad	7896989400275	Manteiga De Primeira Qualidade Com Sal	Queijos Vitória	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
f9e0eedb-8431-4fd9-b2aa-c2e7b2817824	7898716960052	Caldo de carne	Vero Brodo	Caldo de carne	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
a8d81a13-4633-4d75-92ba-e9ffd50d9964	7898906381063	Requeijão Cremoso	Sensação de Minas	Requeijao cremoso	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
99d612fb-802a-4f07-b20d-89eb9cea07b2	7896791905241	Iogurte natural	BH	Sobremesas lácteas	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
49a97066-6eab-47b6-9bba-9640900a1ea7	7896051168591	Iogurte Grego Tradicional	Itambé	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
b02dfca0-f08a-40db-bccc-0294c9620443	7891515625535	Meu Menu Frango Cremoso E Arroz Com Brócolis	Perdigão	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
40761e08-dcbe-4297-bc9e-355e16e1203a	7802200129870	amberries	abrofoti	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
89cd9ecc-83f1-4b21-93a0-96494a25bf54	7898937864917	Molho Sabor Chipotle	Billy & Jack	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
835b357d-ca0d-45f5-99fe-163e38662923	0781159840685	CAPPUCCINO VAINILLA	MARLEY COFFEE	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
3d0be1fb-515a-4647-9980-93aa8f7eb664	7895000509805	Mix De Castanhas E Passas	Qualitá	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
c6c0bdff-1236-4a37-aae1-0b712e5a878e	7896283001727	Cookies Ameixa Coco	Jasmine	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
d165ccb6-5588-4186-9586-874b754c6662	7804627651156	Blika Rings Cebolla	Blika	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
eb17d55c-3ec1-46d2-bb8d-30e51c5b60c0	7898665432143	Omegafor Plus	Vitafor	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
060e311d-a2a0-477a-a4fa-f94ed70ffd82	7802000021237	Lay's corte Americano tamaño S	Lay's	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
ccb180f6-0fe8-4281-9c15-4943d11af8e7	7804658021232	PURA MANZANA PLATANO MANGO	AMA. TIME	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
63d15aaa-dd61-4e9c-98ad-2c79ceeae0a3	7891058000103	Dorflex Uno 1g CPD 20	\N	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
7b4a4104-d8c4-4bca-83bc-6f8628906f7d	7896006212690	Naxotec 550mg CPD 10	\N	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
181f414d-4d89-4387-8b61-ea15bff09ca4	7891058002589	Allegra Pediátrico 60ml cop	\N	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
5eddf72f-a621-46fc-9956-d4898fc2c4f3	7896336015572	Paçoquita	Santa Helena	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
06395e17-09be-406b-8f68-e72e897ae1f8	7896714219318	Histamin 100ml	\N	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
28e12222-5fd3-4fcf-8a97-bfbe60be5478	7896714219301	Histamin 2mg CPD 20	\N	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
c6e785c2-af98-4be2-8b98-a3a2588e21b2	7896436102554	Elev Zero Açúcar M	Fruit Bebidas	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
99efc940-16e6-42e7-8632-ceed3e7523ae	7808709504828	Queso Gouda	surlat	Alimentos fermentados	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
f77a51f1-6714-4d75-a16b-f7a694dfe075	5404017407916	Protein Pancake	QNT	Salgadinhos	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
d1be42cf-4b0d-4b50-ad0b-57f96cc6a907	7898117962082	Batata palha tradicional	Rei de ouro	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
bd61656e-ec86-46ce-a081-168e002117f7	7730976822575	Puré de Tomates	Pontevedra	Alimentos de origen vegetal	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
808b6c01-8c3f-4b1b-92fa-4a996115a762	7891025118763	Aptanutri profutura 1-3 anos 800g	\N	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
3f4269f5-c369-4ec4-b7c1-5bac721a83b1	8801055709212	NESCAFE FINA SELECCIÓN	NESCAFE	Bebidas	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
774a7bd3-ef04-49de-b61a-b9b0b3a9837e	7891000255544	Nestonutri 1-3 anos 800g (nova embalagem)	\N	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
805b115d-fa66-4883-81d8-ef69bdd67782	7898961176611	Energy drink	Big boss	Bebidas	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
72f7755b-7772-4573-945a-1649c074b394	7899914200667	ENERGY DRINK	V!BE MELANCIA	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
ee40c3c7-6f55-40db-80b3-424a5802fa81	7898948730638	SALG BATATA CHIPZ ORIGINAL 140G YEZ	\N	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
05f7d12b-bebd-47eb-9667-cebad050f99e	7896499901163	TIRA TEIMA POCKET CHURRASCO 20G LOBITS	\N	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
02819ea5-0d5d-4e54-9896-9cc1b070939d	7896499901170	TIRA TEIMA POCKET GALETO 20G LOBITS	\N	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
bed96ff7-dd13-4e7f-85ff-c574348101bd	7897115110303	SALG SNACK COSTELINHA 40G AMENDUPA	\N	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
15b45ddb-bbbe-4092-b14c-d8cd532fd13e	1899069902900	TIRA TEIMA JUNIOR BACON 38G LOBITS	\N	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
d8b3c908-f405-44f8-873e-64164b673f97	7897115110280	SALG SNACK CEBOLA 40G AMENDUPA	\N	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
8ab2f9ce-2c5f-42d8-a076-21dfde666188	7896263503203	GUARANÁ	TISS GUARANÁ	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
990bf40b-0a08-4233-a9bb-c71c32e2b8bc	7898948730645	SALG BATATA CHIPZ CREME/CEBOLA 140G YEZ	\N	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
473ce626-ecc2-4e14-8604-f8db28618342	7897115110334	SALG SNACK QUEIJO 40G AMENDUPA	\N	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
ac2e176d-556a-4738-b993-bfb409fea8c7	7897115110273	SALG SNACK CALABRESA 40G AMENDUPA	\N	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
3b12cf7c-22a7-4872-b6c5-686d5b7538e9	7896499901187	TIRA TEIMA POCKET PIMENTA 20G LOBITS	\N	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
abe91e72-cd59-434f-a014-b613f6c66c52	7897115110297	SALG SNACK CHURRASCO 40G AMENDUPA	\N	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
a9eee88f-d2a7-44d8-8e07-36f08fc9772a	7892840225810	BATATA STAX ORIGINAL 163G ELMA CHIPS	PEPSI	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
b78cf896-d4fd-475b-8fef-43f38be05efb	7898633332499	SALG TRIGO BACON 50G DELICCE	\N	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
d5e51926-4271-4ede-b10c-0eebb29100d6	7898972607074	SALG BATATA CREME E CEBOLA 100G YEZ	\N	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
28d3fe7d-6c49-4f45-a23b-f363c65a0cce	7898972607098	BATATA QUEIJO CHEDDAR 100G YEZ	\N	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
3b3251da-7bc0-4b4c-8e44-e5778aa425ff	7898948730546	SALG BATATA CHIPZ COST GAUCHA 140G YEZ	\N	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
5dc05874-539f-420a-afa2-4cf228c3b21b	0011210115606	TABASCO Molho de Pimenta Vermelha Original	TABASCO	Molhos picantes	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
6ec1d2b2-abd7-4deb-bf53-22fd731ded6c	0016000487956	Chex rice	General Mills	Alimentos veganos	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
c21aff7e-d91f-41d8-bd12-a03e125d1e97	00112846	Feijão Preto Combrasil	COMBRASIL	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
de3b2073-bce7-4ab5-b78e-9b13c8d44c87	0028400435031	Puff cheese flavored snacks	Cheetos	Salgadinhos	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
a06c105c-7430-45b2-b363-fe17cfae1a9d	0082184089996	Whiskey 1 Litre	Jack Daniel's	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
9b7258e8-ad4f-4e7b-956a-696b3f5ce2cb	04603177	Margarina	Delicia Supreme	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
81de4748-53bb-43b0-9ebd-d7339f3d8e38	0605388888150	Chips	Great Value	Salgadinho de Batata	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
2b123486-15bf-44db-b120-e9bdf9ca3b32	0886790018872	Benefiber	Novartis	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
cc1365f6-ebde-4bfe-9ec6-2e42ac228961	0895634000218	Vegan Vitamin B12 Sublingual Deva Vegan Tablets, 90 CT	Deva	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
ed802e1e-c351-42d4-bf58-9a18b6d2cd72	2000000038827	Moelleux de veau	Balkis	Queijos	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
8699a7e3-d46b-4898-8be9-6990e8aa9e75	2006600003333	pão francês	Bramil	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
40ba91c6-3d44-4403-bb46-8f53f3f095df	3229781871556	Ritter - barra de cereais - brownie	Ritter	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
dac61fd3-db21-4ddd-8b18-ff3ed38f9fbb	3760091729460	Mangue du Pérou	Ethiquable	Bebidas	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
7c82d074-4b33-475b-9ad6-d314810a5b23	3700029205116	Maayane tarama	Maayane	Pastas e cremes	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
7564f455-7b68-4fc6-bc4a-cd3cf641873d	3760092212657	Biothentic Riz Long 1 / 2 Complet 1Kg	Biothentic	Alimentos veganos	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
43400582-3d18-4b68-b3b1-b175cc893923	3770002316368	Boisson à L'eau De Coco Et Jus De Fruits De La Passion	Vaivai	Bebidas	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
869403d1-83a0-45db-b3cd-02856f5d8b50	4005500073727	Formula Nan 400g HA Gold	Nestlé	Geral	open_food_facts	2026-06-03 13:59:55.596	2026-06-03 13:59:55.577
c5ccf14d-8080-4092-97a6-a09938b3a303	7891098000170	Leão Fuze Hortelã	Leão Fuze	Geral	open_food_facts	2026-06-03 13:48:49.14	2026-06-03 13:48:49.124
b67cc4b1-5d05-4c29-81e6-c74fe93abc0b	7898930142654	Molho De Tomate Tradicional Salsaretti Sachê 300g	SALSARETTI	Geral	open_food_facts	2026-06-03 13:50:29.222	2026-06-03 13:50:29.176
dd6f236e-8acf-4b7e-9542-f7bafe9b7f92	7803468005005	Pan Integral Familiar	Castaño	Geral	open_food_facts	2026-06-03 13:52:20.136	2026-06-03 13:52:20.122
301364bd-83bf-4f42-89e3-c04bf154da97	7891991011723	Cerveja Lager Budweiser	\N	Geral	open_food_facts	2026-06-03 13:52:36.397	2026-06-03 13:52:36.378
426ac6d8-ceb6-4159-be21-5b38f1907c86	7895000515943	Farelo de aveia	Taeq	Geral	open_food_facts	2026-06-03 13:56:37.884	2026-06-03 13:56:37.867
9daa0853-4995-4e80-b0a8-99bea7b927e2	7899786900016	Pão Integral Vegano 7 Grãos	Nutri-Vida	Geral	open_food_facts	2026-06-03 13:56:45.037	2026-06-03 13:56:45.021
46c74d9a-4ae6-4ebd-aba3-54b3629a2082	7891103183263	Requeijão cremoso tradicional	Carrefour	Geral	open_food_facts	2026-06-03 13:58:06.542	2026-06-03 13:58:06.525
c325a3e8-bbde-4a44-8643-22d1cf221f80	7896328210091	chá misto sabor maracujá	Barão de Cotegipe	Geral	open_food_facts	2026-06-03 13:58:10.253	2026-06-03 13:58:10.238
e9c91215-ebec-41bc-a5ba-9e158c816424	7891156063017	Yodel Uva verde	\N	Geral	open_food_facts	2026-06-03 13:59:17.836	2026-06-03 13:59:17.822
f2e134a1-4d1f-4073-9514-135080f0c383	2000000153471	Uva, in natura	\N	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
bfdc816f-187e-4b56-80c6-2a394d063b3f	7891158106842	Glucerna SR	Abbott	Geral	open_food_facts	2026-06-03 13:59:35.653	2026-06-03 13:59:35.633
\.


--
-- Data for Name: Unit; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Unit" (id, name, abbreviation, type, "allowsDecimals", active, "sortOrder", "createdAt", "updatedAt") FROM stdin;
ae1b64bf-ecfb-4335-b239-779c4ebeb92f	Kilogram	kg	weight	t	t	10	2026-05-30 01:04:58.661	2026-06-03 13:48:06.133
3b83b1d4-36c2-476f-b8b6-330e6f0a829b	Gram	g	weight	t	t	20	2026-05-30 01:04:58.682	2026-06-03 13:48:06.189
5bdcd80d-af08-4352-ad15-b9b388f0fdff	Liter	L	volume	t	t	30	2026-05-30 01:04:58.688	2026-06-03 13:48:06.195
dce7edac-aa09-41da-81a7-311a49afe083	Milliliter	ml	volume	t	t	40	2026-05-30 01:04:58.698	2026-06-03 13:48:06.203
6df6b524-2cb1-4239-a7b8-3f6b46906cac	Unit	unit	count	f	t	50	2026-05-30 01:04:58.705	2026-06-03 13:48:06.208
94669f5f-fe48-438c-8db3-176ade75f807	Dozen	dozen	count	f	t	60	2026-05-30 01:04:58.713	2026-06-03 13:48:06.214
a9d6f273-756b-4114-aea6-9e823e2c68c3	Box	box	package	f	t	70	2026-05-30 01:04:58.719	2026-06-03 13:48:06.219
26c8b40d-ce31-413e-a00b-e7ca8fe8ecda	Package	package	package	f	t	80	2026-05-30 01:04:58.726	2026-06-03 13:48:06.224
a34657a0-dc06-4107-a3ca-a8aa8f985f9c	Bundle	bundle	package	f	t	90	2026-05-30 01:04:58.733	2026-06-03 13:48:06.23
ad84d06d-db80-41af-91a6-cbe60b320fe2	Tray	tray	package	f	t	100	2026-05-30 01:04:58.74	2026-06-03 13:48:06.236
7778da26-5a54-47e2-84e2-596a9183a68e	Can	can	package	f	t	110	2026-05-30 01:04:58.746	2026-06-03 13:48:06.241
d7d0a03c-95dd-4a4b-a90e-b786fb86508a	Bottle	bottle	package	f	t	120	2026-05-30 01:04:58.754	2026-06-03 13:48:06.246
\.


--
-- PostgreSQL database dump complete
--

\unrestrict EyfIH7CCWr4fIL1td48LZjoVs52Ob7EqjECHzK4R4GQZXMpGTCaUxybv50lHDtx

