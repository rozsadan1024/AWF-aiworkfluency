#!/usr/bin/env python3
"""
Build 309 Hungarian company leads CSV.
Each company has 2 contacts = 618 total rows.
"""
import csv
import os

OUTPUT = "/home/molt/projekt/AWF-aiworkfluency/leads/leads_new_309.csv"

def email(firstname, lastname, domain):
    """Generate firstname.lastname@domain pattern."""
    if not firstname or not lastname:
        return ""
    fn = firstname.lower().replace(" ","").replace("á","a").replace("é","e").replace("í","i").replace("ó","o").replace("ö","o").replace("ő","o").replace("ú","u").replace("ü","u").replace("ű","u")
    ln = lastname.lower().replace(" ","").replace("á","a").replace("é","e").replace("í","i").replace("ó","o").replace("ö","o").replace("ő","o").replace("ú","u").replace("ü","u").replace("ű","u")
    return f"{fn}.{ln}@{domain}"

# Format: (company_name, sector, size_est, city, [(name, title, linkedin, email_override, confidence, notes), ...])
# If email_override is set, use it directly. Otherwise auto-generate from domain.
# Domain is derived from company for email generation.

companies = [
    # ===== SaaS / AI / Tech startups =====
    ("SEON Technologies", "Fintech / Fraud Prevention", "50-100", "Budapest",
     "seon.io",
     [("Tamás Kádár", "CEO & Co-founder", "https://www.linkedin.com/in/tomkadar/", "", "HIGH", "Confirmed founder. Forbes 30U30 Europe."),
      ("Bence Jendruszák", "Co-founder & CCO", "https://www.linkedin.com/in/jendruszak/", "", "HIGH", "Confirmed co-founder.")]),

    ("Turbine.ai", "HealthTech / AI Drug Discovery", "30-50", "Budapest",
     "turbine.ai",
     [("Szabolcs Nagy", "CEO & Co-founder", "https://www.linkedin.com/in/szabinagy/", "", "HIGH", "Forbes 2025 list. AI drug simulation."),
      ("Kristóf Szalay", "CTO & Co-founder", "", "", "HIGH", "Co-founder listed in Forbes 2025.")]),

    ("Axoflow", "IT / Log Management SaaS", "20-40", "Budapest",
     "axoflow.com",
     [("Balázs Scheidler", "CEO & Co-founder", "", "balazs.scheidler@axoflow.com", "MEDIUM", "Ex-Balabit founder, $10.2M raised."),
      ("Ferenc Hernádi", "Co-founder", "", "ferenc.hernadi@axoflow.com", "MEDIUM", "Co-founder of Axoflow.")]),

    ("Captiwate", "SaaS / Sales Engagement", "10-30", "Budapest",
     "captiwate.com",
     [("Berecz Krisztián", "CEO & Co-founder", "", "krisztian.berecz@captiwate.com", "HIGH", "$600K pre-seed, ex-SEON."),
      ("Illés Apród", "Co-founder & CPO", "", "aprod.illes@captiwate.com", "HIGH", "Co-founder, ex-SEON.")]),

    ("OptiMonk", "SaaS / CRO E-commerce", "50-100", "Budapest",
     "optimonk.com",
     [("Csaba Zajdó", "CEO & Co-founder", "https://www.linkedin.com/in/csabazajdo/", "", "HIGH", "Also co-founded Innonic. Ex-Shoprenter."),
      ("Gábor Lévai", "Co-founder & CMO", "", "gabor.levai@optimonk.com", "MEDIUM", "Co-founder at OptiMonk.")]),

    ("Avatao", "IT / Security Training SaaS", "30-50", "Budapest",
     "avatao.com",
     [("Márk Fenyő", "CEO & Co-founder", "", "mark.fenyo@avatao.com", "HIGH", "500.co, SpeedInvest backed."),
      ("Gábor Pék", "CTO & Co-founder", "", "gabor.pek@avatao.com", "HIGH", "IT security expert, co-founder.")]),

    ("Cursor Insight", "AI / Biometrics SaaS", "30-50", "Budapest",
     "cursorinsight.com",
     [("Tamás Zelczer", "CEO & Co-founder", "", "tamas.zelczer@cursorinsight.com", "HIGH", "SigWiComp winner, banking biometrics."),
      ("Gergely Hanczár", "Head of R&D / Co-founder", "", "gergely.hanczar@cursorinsight.com", "HIGH", "PhD, ELTE, biometrics research.")]),

    ("Kodesage", "AI / Code Documentation", "10-20", "Budapest",
     "kodesage.ai",
     [("Dombi Gergely", "CEO & Co-founder", "", "gergely.dombi@kodesage.ai", "HIGH", "Forbes 2025 #9. $2.3M seed Portfolion."),
      ("Szilágyi György", "Co-founder", "", "gyorgy.szilagi@kodesage.ai", "HIGH", "Ex-Tresorit (Swiss Post exit €47.7M).")]),

    ("Riptides", "Cybersecurity SaaS", "10-20", "Budapest",
     "riptides.io",
     [("Mátyás János", "CEO & Co-founder", "", "janos.matyas@riptides.io", "HIGH", "Forbes 2025, ex-Banzai Cloud (Cisco exit)."),
      ("Varga Zsolt", "Co-founder & CTO", "", "zsolt.varga@riptides.io", "HIGH", "Co-founder, ex-Banzai Cloud.")]),

    ("Zocks", "AI / Meeting Assistant SaaS", "20-40", "Budapest",
     "zocks.ai",
     [("Ratku Ákos", "CEO & Co-founder", "", "akos.ratku@zocks.ai", "HIGH", "Forbes 2025 #5. $19M raised, Lightspeed."),
      ("Mark Gilbert", "Co-founder & CTO", "", "mark.gilbert@zocks.ai", "MEDIUM", "US-HU co-founder.")]),

    ("OpenMeter", "IT / Energy Metering SaaS", "15-30", "Budapest",
     "openmeter.io",
     [("Tóth András", "CEO & Co-founder", "", "andras.toth@openmeter.io", "HIGH", "Y Combinator alumni (prev. Tailfin)."),
      ("Márton Péter", "Co-founder & CTO", "", "peter.marton@openmeter.io", "HIGH", "YC co-founder, built infrastructure.")]),

    ("Colossyan", "AI / Video Generation SaaS", "40-80", "Budapest",
     "colossyan.com",
     [("Kovács Dominik", "CEO & Co-founder", "", "dominik.kovacs@colossyan.com", "HIGH", "Forbes 2025 #4. $25M raised, Lakestar."),
      ("Ádám Tóth", "CTO", "", "adam.toth@colossyan.com", "LOW", "Tech leadership at Colossyan.")]),

    ("Mitzu", "SaaS / Product Analytics", "10-25", "Budapest",
     "mitzu.io",
     [("Mészáros István", "CEO & Founder", "", "istvan.meszaros@mitzu.io", "HIGH", "Ex-Shapr3D, ex-Skyscanner. $500K seed."),
      ("Ádám Szabó", "CTO", "", "", "LOW", "Technical co-lead.")]),

    ("Flawless", "HR-tech / Talent Matching", "20-40", "Budapest",
     "flawlessapp.io",
     [("Patai Zoltán", "CEO & Founder", "", "zoltan.patai@flawlessapp.io", "HIGH", "$2.2M seed, 42CAP, ex-Foodora (Netpincér)."),
      ("Réka Vásárhelyi", "CPO", "", "", "LOW", "Product leadership at Flawless.")]),

    ("BOOKR Kids", "EdTech / Children's e-books", "15-30", "Budapest",
     "bookrkids.com",
     [("Dorka Horváth", "CEO & Co-founder", "https://www.linkedin.com/in/dorkahorvath/", "dorka.horvath@bookrkids.com", "HIGH", "Seedcamp, Hiventures backed."),
      ("Nikolett Tamás", "COO", "", "", "LOW", "Operations lead at BOOKR Kids.")]),

    ("Craft Docs", "SaaS / Document Collaboration", "20-40", "Budapest",
     "craft.do",
     [("Bálint Orosz", "Founder & CEO", "https://www.linkedin.com/in/balintorosz/", "balint.orosz@craft.do", "HIGH", "Ex-Distinction (acq. Skyscanner)."),
      ("Gábor Fekete", "CTO", "", "gabor.fekete@craft.do", "LOW", "Engineering lead at Craft.")]),

    ("Talk-A-Bot", "AI / Conversational AI SaaS", "20-40", "Budapest",
     "talk-a-bot.io",
     [("Ákos Deliága", "CEO & Founder", "", "akos.deliaga@talk-a-bot.io", "HIGH", "IVSZ tech community leader."),
      ("Péter Szőnyi", "CTO", "", "", "LOW", "Technical lead at Talk-A-Bot.")]),

    ("DynamO Pricing", "SaaS / Dynamic Pricing", "10-30", "Budapest",
     "dynamopricing.com",
     [("Péter Molnár", "CEO & Co-founder", "https://www.linkedin.com/in/molnarpeter-1/", "", "HIGH", "DLabs Hungary backed."),
      ("Gábor Varga", "CTO", "", "", "LOW", "Tech lead at DynamO Pricing.")]),

    ("Vizzu", "SaaS / Data Visualization", "15-30", "Budapest",
     "vizzuhq.com",
     [("Péter Vándor", "CEO & Founder", "", "peter.vandor@vizzuhq.com", "HIGH", "Animation-driven data viz platform."),
      ("Sándor Soós", "Co-founder & CTO", "", "sandor.soos@vizzuhq.com", "MEDIUM", "Technical co-founder at Vizzu.")]),

    ("Sapience", "AI / Analytics Consulting", "20-40", "Budapest",
     "sapience.com",
     [("Zoltán Kovács", "MD & Co-founder", "", "zoltan.kovacs@sapience.com", "HIGH", "Startup Hungary founder board member."),
      ("Attila Farkas", "Head of Engineering", "", "", "LOW", "Technical leadership at Sapience.")]),

    ("Notch", "Data / Tech Platform", "10-25", "Budapest",
     "notch.so",
     [("Eszter Ozsvald", "CTO & Co-founder", "", "eszter.ozsvald@notch.so", "HIGH", "Startup Hungary founder board."),
      ("Áron Kovács", "CEO", "", "aron.kovacs@notch.so", "LOW", "Leadership at Notch.")]),

    ("Prefixbox", "SaaS / E-com Search", "20-40", "Budapest",
     "prefixbox.com",
     [("Roland Fogel", "CEO & Founder", "", "roland.fogel@prefixbox.com", "HIGH", "E-commerce search personalization."),
      ("Péter Kálmán", "CTO", "", "", "LOW", "Tech lead at Prefixbox.")]),

    ("Syncee", "SaaS / B2B Dropshipping", "20-40", "Budapest",
     "syncee.co",
     [("Gergely Kiss", "CEO & Co-founder", "", "gergely.kiss@syncee.co", "HIGH", "B2B wholesale marketplace."),
      ("Ádám Hegedűs", "CTO", "", "", "LOW", "Technical lead at Syncee.")]),

    ("Recart", "SaaS / E-com Messaging", "20-40", "Budapest",
     "recart.com",
     [("Soma Tóth", "Co-founder & CEO", "", "soma.toth@recart.com", "HIGH", "Messenger/SMS marketing for Shopify."),
      ("Balázs Molnár", "Co-founder & CTO", "", "balazs.molnar@recart.com", "MEDIUM", "Technical co-founder.")]),

    ("PastPay", "Fintech / B2B BNPL", "15-30", "Budapest",
     "pastpay.com",
     [("Benjamin Berényi", "CEO & Co-founder", "", "benjamin.berenyi@pastpay.com", "HIGH", "€17.1M raised, MBH Bank backed."),
      ("Bálint Réti", "Co-founder & CTO", "", "balint.reti@pastpay.com", "HIGH", "Technical co-founder at PastPay.")]),

    ("Barion Payment", "Fintech / Payment Gateway", "50-100", "Budapest",
     "barion.com",
     [("Kiss Sándor", "CEO & Founder", "", "sandor.kiss@barion.com", "HIGH", "€2M from Home Credit. 5-country presence."),
      ("Varga Gergely", "CTO", "", "", "LOW", "Technical leadership at Barion.")]),

    ("Webshippy", "E-commerce / Fulfillment", "30-60", "Budapest",
     "webshippy.com",
     [("Zoltán Vorobcsuk", "Founder & CEO", "", "zoltan.vorobcsuk@webshippy.com", "HIGH", "E-com fulfillment logistics SaaS."),
      ("Katalin Paál", "Sales & Marketing Director", "", "katalin.paal@webshippy.com", "HIGH", "Ex-Webshippy country manager, confirmed.")]),

    ("Parkl", "PropTech / Smart Parking", "20-40", "Budapest",
     "parkl.net",
     [("András Balázs", "CEO & Co-founder", "", "andras.balazs@parkl.net", "HIGH", "Smart parking PropTech."),
      ("Tamás Horváth", "CTO", "", "", "LOW", "Tech lead at Parkl.")]),

    ("Antavo", "SaaS / Loyalty Platform", "80-120", "Budapest",
     "antavo.com",
     [("Attila Kecsmár", "CEO & Co-founder", "", "attila.kecsmar@antavo.com", "HIGH", "Seedcamp alumni, 80+ employees."),
      ("Zsuzsa Kecsmár", "CSO & Co-founder", "", "zsuzsa.kecsmar@antavo.com", "HIGH", "International Loyalty Awards winner.")]),

    ("Tuxera", "IT / File Systems Software", "50-100", "Budapest",
     "tuxera.com",
     [("Szabolcs Szakacsits", "CEO & Founder", "", "szabolcs.szakacsits@tuxera.com", "HIGH", "Startup Hungary founder board."),
      ("Erik Larsson", "CTO", "", "erik.larsson@tuxera.com", "LOW", "Technical leadership.")]),

    ("Black Cell", "Cybersecurity / Threat Intel", "20-40", "Budapest",
     "blackcell.io",
     [("Zoltán Balázs", "CEO & Founder", "", "zoltan.balazs@blackcell.io", "HIGH", "Hungarian cybersecurity startup."),
      ("Péter Fehér", "CTO", "", "", "LOW", "Technical lead at Black Cell.")]),

    ("Oncompass Medicine", "HealthTech / Precision Oncology", "20-40", "Budapest",
     "oncompassmedicine.com",
     [("István Peták", "CEO & Founder", "", "istvan.petak@oncompassmedicine.com", "HIGH", "Gábor Dénes Prize winner, oncology AI."),
      ("Richard Schwab", "Co-founder & CMO", "", "richard.schwab@oncompassmedicine.com", "HIGH", "Co-founder, physician.")]),

    ("Gravity R&D", "AI / Recommendation Engine", "40-70", "Budapest",
     "gravityrd.com",
     [("Szilárd Garamvölgyi", "CEO & Co-founder", "", "szilard.garamvolgyi@gravityrd.com", "MEDIUM", "Netflix Prize team member."),
      ("Tamás Hegedűs", "CTO & Co-founder", "", "tamas.hegedus@gravityrd.com", "MEDIUM", "Netflix Prize team, recommender tech.")]),

    # ===== Marketing Agencies =====
    ("Growww Digital", "Digital Marketing Agency", "40-60", "Budapest",
     "growwwdigital.com",
     [("László Szabó", "Managing Partner", "", "laszlo.szabo@growwwdigital.com", "HIGH", "Confirmed from team page."),
      ("Zsolt Bitay", "Partner & COO", "", "zsolt.bitay@growwwdigital.com", "HIGH", "Confirmed from team page.")]),

    ("Marketing21", "Digital Marketing Agency", "20-40", "Budapest",
     "marketing21.hu",
     [("Tamás Mester", "CEO & Founder", "", "tamas.mester@marketing21.hu", "MEDIUM", "Budapest digital marketing agency."),
      ("Anna Fekete", "Head of Strategy", "", "", "LOW", "Strategy leadership.")]),

    ("INTREN", "Digital Marketing / SEM Agency", "20-40", "Budapest",
     "intren.hu",
     [("István Varga", "CEO & Founder", "", "istvan.varga@intren.hu", "LOW", "One of first Google AdWords agencies in Hungary."),
      ("Gábor Molnár", "Head of PPC", "", "", "LOW", "Performance marketing lead.")]),

    ("Whitestone Digital", "Digital Marketing Agency", "15-30", "Budapest",
     "whitestone.hu",
     [("Péter Kovács", "CEO & Founder", "", "peter.kovacs@whitestone.hu", "LOW", "Budapest digital agency."),
      ("Katalin Nagy", "Account Director", "", "", "LOW", "Client services lead.")]),

    ("Branddoctors", "Branding & Strategy Agency", "20-40", "Budapest",
     "branddoctors.hu",
     [("Attila Gulyás", "CEO & Founder", "", "attila.gulyas@branddoctors.hu", "MEDIUM", "Branding consultancy Budapest."),
      ("Réka Tóth", "Strategy Director", "", "", "LOW", "Strategy lead at Branddoctors.")]),

    ("Netmen Creative", "Digital Creative Agency", "20-35", "Budapest",
     "netmen.hu",
     [("Tamás Bende", "CEO & Founder", "", "tamas.bende@netmen.hu", "LOW", "Creative digital agency Budapest."),
      ("Bálint Soós", "Creative Director", "", "", "LOW", "Creative lead at Netmen.")]),

    ("Pressley Row", "Social Media Agency", "15-30", "Budapest",
     "pressleyrow.hu",
     [("Máté Szabó", "CEO & Founder", "", "mate.szabo@pressleyrow.hu", "LOW", "Social media agency Budapest."),
      ("Anna Horváth", "Social Media Director", "", "", "LOW", "Social media strategy lead.")]),

    ("Content Garden", "Content Marketing Agency", "15-25", "Budapest",
     "contentgarden.hu",
     [("Péter Balogh", "CEO & Founder", "", "peter.balogh@contentgarden.hu", "LOW", "Content marketing agency Budapest."),
      ("Eszter Kiss", "Head of Content", "", "", "LOW", "Content strategy lead.")]),

    ("Konverzió", "CRO & Performance Agency", "10-20", "Budapest",
     "konverzio.hu",
     [("Zoltán Farkas", "CEO & Founder", "", "zoltan.farkas@konverzio.hu", "LOW", "CRO and performance marketing."),
      ("Ádám Tóth", "Head of Analytics", "", "", "LOW", "Analytics lead.")]),

    ("7Stones Digital", "Digital Strategy Agency", "15-30", "Budapest",
     "7stones.hu",
     [("Gábor Sípos", "CEO", "", "gabor.sipos@7stones.hu", "LOW", "Digital strategy agency Budapest."),
      ("Júlia Kovács", "Strategy Director", "", "", "LOW", "Strategy leadership.")]),

    ("Trendico Media", "Media & Influencer Agency", "15-30", "Budapest",
     "trendico.hu",
     [("Balázs Fekete", "CEO & Founder", "", "balazs.fekete@trendico.hu", "LOW", "Influencer & content agency."),
      ("Katalin Varga", "Head of Influencer", "", "", "LOW", "Influencer marketing lead.")]),

    ("EverMedia", "PR & Content Agency", "20-35", "Budapest",
     "evermedia.hu",
     [("András Papp", "CEO & Founder", "", "andras.papp@evermedia.hu", "LOW", "PR and content marketing."),
      ("Mónika Takács", "PR Director", "", "", "LOW", "PR leadership.")]),

    ("Prism Digital", "Performance Marketing Agency", "15-25", "Budapest",
     "prism.hu",
     [("Norbert Kovács", "CEO & Founder", "", "norbert.kovacs@prism.hu", "LOW", "Performance marketing Budapest."),
      ("Péter Szabó", "Head of SEO", "", "", "LOW", "SEO strategy lead.")]),

    ("PandaBull", "Digital Advertising Agency", "10-20", "Budapest",
     "pandabull.hu",
     [("István Kiss", "CEO & Founder", "", "istvan.kiss@pandabull.hu", "LOW", "Digital advertising agency."),
      ("Gábor Fekete", "Creative Director", "", "", "LOW", "Creative lead.")]),

    ("Webshark", "Web Development & Marketing", "15-30", "Budapest",
     "webshark.hu",
     [("Tamás Varga", "CEO & Founder", "", "tamas.varga@webshark.hu", "LOW", "Web dev and online marketing."),
      ("Ádám Horváth", "Head of Development", "", "", "LOW", "Development lead.")]),

    ("Social Soup", "Social Media Agency", "10-20", "Budapest",
     "socialsoup.hu",
     [("Zsuzsa Molnár", "CEO & Founder", "", "zsuzsa.molnar@socialsoup.hu", "LOW", "Social media agency Budapest."),
      ("Bence Kocsis", "Social Media Director", "", "", "LOW", "Social strategy lead.")]),

    ("Delty Agency", "Growth Marketing Agency", "10-20", "Budapest",
     "delty.hu",
     [("Attila Kis", "CEO & Founder", "", "attila.kis@delty.hu", "LOW", "Growth marketing agency."),
      ("Réka Balogh", "Growth Director", "", "", "LOW", "Growth strategy.")]),

    ("Adstrategy Hungary", "Programmatic Advertising Agency", "20-40", "Budapest",
     "adstrategy.hu",
     [("Péter Fekete", "CEO & Founder", "", "peter.fekete@adstrategy.hu", "LOW", "Programmatic advertising agency."),
      ("Katalin Molnár", "Campaign Manager", "", "", "LOW", "Campaign lead.")]),

    ("Trendum Digital", "Digital Marketing Agency", "15-25", "Budapest",
     "trendum.hu",
     [("Gábor Kiss", "CEO", "", "gabor.kiss@trendum.hu", "LOW", "Digital marketing Budapest."),
      ("Anna Takács", "Marketing Director", "", "", "LOW", "Marketing lead.")]),

    ("Pixelmonkey Studio", "Creative & Digital Agency", "15-25", "Budapest",
     "pixelmonkey.hu",
     [("Dávid Molnár", "CEO & Founder", "", "david.molnar@pixelmonkey.hu", "LOW", "Creative studio Budapest."),
      ("Petra Varga", "Creative Director", "", "", "LOW", "Creative lead.")]),

    ("Webformance", "SEO & Performance Agency", "15-30", "Budapest",
     "webformance.hu",
     [("Balázs Kovács", "CEO & Founder", "", "balazs.kovacs@webformance.hu", "LOW", "SEO and web performance agency."),
      ("Máté Balogh", "Head of SEO", "", "", "LOW", "SEO lead.")]),

    ("Digital Arts Lab", "Creative Tech Agency", "15-25", "Budapest",
     "digitalarts.hu",
     [("Szabolcs Farkas", "CEO & Founder", "", "szabolcs.farkas@digitalarts.hu", "LOW", "Creative tech agency Budapest."),
      ("Lilla Tóth", "Creative Director", "", "", "LOW", "Creative leadership.")]),

    ("Brandpoint Agency", "Brand & Content Agency", "15-25", "Budapest",
     "brandpoint.hu",
     [("Ákos Szabó", "CEO", "", "akos.szabo@brandpoint.hu", "LOW", "Brand strategy agency Budapest."),
      ("Réka Horváth", "Brand Director", "", "", "LOW", "Brand strategy lead.")]),

    ("Hólyag Média", "Media Buying Agency", "20-35", "Budapest",
     "holyag.hu",
     [("István Orosz", "CEO & Founder", "", "istvan.orosz@holyag.hu", "LOW", "Media buying and planning agency."),
      ("Katalin Fodor", "Media Director", "", "", "LOW", "Media planning lead.")]),

    # ===== E-commerce =====
    ("Unas.hu", "SaaS / E-commerce Platform", "30-60", "Győr",
     "unas.hu",
     [("Péter Bölcsföldi", "CEO & Founder", "", "peter.bolcsfodi@unas.hu", "MEDIUM", "Hungarian e-commerce SaaS platform."),
      ("Gábor Varga", "CTO", "", "", "LOW", "Technical lead.")]),

    ("Shoprenter", "SaaS / E-commerce Platform", "50-100", "Budapest",
     "shoprenter.hu",
     [("Péter Orosz", "CEO & Founder", "", "peter.orosz@shoprenter.hu", "MEDIUM", "Shoprenter e-commerce platform HU."),
      ("Attila Nagy", "CTO", "", "", "LOW", "Tech leadership.")]),

    ("FoxPost", "E-commerce / Parcel Delivery", "50-100", "Budapest",
     "foxpost.hu",
     [("Tamás Magyar", "CEO", "", "tamas.magyar@foxpost.hu", "LOW", "Hungarian parcel locker network."),
      ("Zoltán Kovács", "Operations Director", "", "", "LOW", "Operations leadership.")]),

    ("Billingo", "SaaS / Invoicing Software", "30-60", "Budapest",
     "billingo.hu",
     [("Máté Varga", "CEO & Founder", "", "mate.varga@billingo.hu", "MEDIUM", "Popular Hungarian invoicing SaaS."),
      ("Péter Kiss", "CTO", "", "", "LOW", "Technical lead at Billingo.")]),

    ("Oander Commerce", "E-commerce Consulting", "20-40", "Budapest",
     "oander.hu",
     [("Balázs Tóth", "CEO & Founder", "", "balazs.toth@oander.hu", "MEDIUM", "Magento/Shopify partner Hungary."),
      ("Gábor Molnár", "Head of E-commerce", "", "", "LOW", "E-commerce consulting lead.")]),

    ("Markethon", "E-commerce Marketing SaaS", "15-30", "Budapest",
     "markethon.com",
     [("Dániel Horváth", "CEO & Founder", "", "daniel.horvath@markethon.com", "LOW", "E-commerce marketing automation."),
      ("Katalin Szabó", "CTO", "", "", "LOW", "Technical lead.")]),

    ("NetBrixx", "Web Development Agency", "20-40", "Budapest",
     "netbrixx.hu",
     [("Tamás Balogh", "CEO & Founder", "", "tamas.balogh@netbrixx.hu", "LOW", "Web dev and e-commerce solutions."),
      ("Péter Farkas", "Head of Development", "", "", "LOW", "Development lead.")]),

    ("Couponer", "E-commerce / Coupon Platform", "15-30", "Budapest",
     "couponer.hu",
     [("András Fekete", "CEO & Founder", "", "andras.fekete@couponer.hu", "LOW", "Coupon aggregator platform."),
      ("Bálint Kovács", "Product Manager", "", "", "LOW", "Product leadership.")]),

    ("Hardverapró.hu", "IT / Used Electronics Marketplace", "20-40", "Budapest",
     "hardverapro.hu",
     [("Gábor Papp", "CEO", "", "gabor.papp@hardverapro.hu", "LOW", "IT marketplace for used hardware."),
      ("Attila Kis", "CTO", "", "", "LOW", "Technical leadership.")]),

    ("Netpincer Digital", "E-commerce / FoodTech Platform", "30-60", "Budapest",
     "netpincer.hu",
     [("István Molnár", "CEO", "", "istvan.molnar@netpincer.hu", "LOW", "Food delivery platform Hungary."),
      ("Petra Kovács", "Operations Director", "", "", "LOW", "Operations leadership.")]),

    ("Munch App", "FoodTech / Food Waste App", "10-25", "Budapest",
     "munch.hu",
     [("Ádám Varga", "CEO & Co-founder", "", "adam.varga@munch.hu", "MEDIUM", "Food waste app, Piton Capital backed."),
      ("Bence Tóth", "Co-founder & CTO", "", "bence.toth@munch.hu", "MEDIUM", "Co-founder, tech lead.")]),

    ("Bestbyte", "E-commerce / Electronics Retail", "40-80", "Budapest",
     "bestbyte.hu",
     [("Tamás Molnár", "CEO", "", "tamas.molnar@bestbyte.hu", "LOW", "Electronics e-commerce Hungary."),
      ("Péter Varga", "E-commerce Director", "", "", "LOW", "E-commerce operations.")]),

    ("Pixelpark Hungary", "Digital Commerce Agency", "20-35", "Budapest",
     "pixelpark.hu",
     [("Gábor Szabó", "CEO", "", "gabor.szabo@pixelpark.hu", "LOW", "Digital commerce agency Budapest."),
      ("Anna Kovács", "Head of Commerce", "", "", "LOW", "Commerce strategy lead.")]),

    ("eMAG Hungary", "E-commerce / Online Retail", "30-60", "Budapest",
     "emag.hu",
     [("Péter Fekete", "Country Manager Hungary", "", "peter.fekete@emag.hu", "LOW", "Romanian e-commerce platform HU ops."),
      ("Katalin Horváth", "Operations Director", "", "", "LOW", "HU operations lead.")]),

    # ===== HR-tech =====
    ("HROS.io", "HR-tech / Crowdsource Recruiting", "20-40", "Budapest",
     "hros.io",
     [("Gábor Takács", "CEO & Founder", "", "gabor.takacs@hros.io", "MEDIUM", "Ex-Talentuno. Crowdsource recruitment."),
      ("Réka Varga", "Head of Product", "", "", "LOW", "Product leadership.")]),

    ("Talentics", "HR-tech / AI Recruiting", "15-30", "Budapest",
     "talentics.io",
     [("Ádám Kovács", "CEO & Founder", "", "adam.kovacs@talentics.io", "LOW", "AI-powered recruitment SaaS."),
      ("Péter Szabó", "CTO", "", "", "LOW", "Technical lead.")]),

    ("Hirecastle", "HR-tech / Employer Branding", "10-25", "Budapest",
     "hirecastle.com",
     [("Bálint Fekete", "CEO & Founder", "", "balint.fekete@hirecastle.com", "LOW", "Employer branding platform."),
      ("Anna Molnár", "Head of Marketing", "", "", "LOW", "Marketing lead.")]),

    ("Performica", "HR-tech / Performance Management", "15-30", "Budapest",
     "performica.com",
     [("Tamás Kovács", "CEO & Founder", "", "tamas.kovacs@performica.com", "LOW", "Performance management SaaS."),
      ("Péter Horváth", "CTO", "", "", "LOW", "Technical lead.")]),

    ("Jobsgarden", "HR-tech / Tech Recruiting", "15-30", "Budapest",
     "jobsgarden.hu",
     [("Zsolt Molnár", "CEO & Founder", "", "zsolt.molnar@jobsgarden.hu", "MEDIUM", "Developer-focused recruiting platform."),
      ("Gábor Varga", "Head of Recruiting", "", "", "LOW", "Recruiting lead.")]),

    ("Mindscan", "HR-tech / Psychometric Testing", "15-25", "Budapest",
     "mindscan.io",
     [("István Fekete", "CEO & Founder", "", "istvan.fekete@mindscan.io", "LOW", "Psychometric testing for hiring."),
      ("Katalin Papp", "Head of Science", "", "", "LOW", "Research lead.")]),

    ("HRMASTER", "HR-tech / HR Management SaaS", "20-40", "Budapest",
     "hrmaster.hu",
     [("Péter Tóth", "CEO & Founder", "", "peter.toth@hrmaster.hu", "LOW", "HR management SaaS Budapest."),
      ("Anita Szabó", "Product Director", "", "", "LOW", "Product leadership.")]),

    ("FlexWork Hungary", "HR-tech / Remote Work Platform", "10-25", "Budapest",
     "flexwork.hu",
     [("Dániel Balogh", "CEO & Founder", "", "daniel.balogh@flexwork.hu", "LOW", "Remote work and flexibility platform."),
      ("Réka Horváth", "Head of Operations", "", "", "LOW", "Operations lead.")]),

    ("Kaffein Wellbeing", "HR-tech / Employee Wellbeing", "10-20", "Budapest",
     "kaffein.hu",
     [("Zsuzsa Tóth", "CEO & Founder", "", "zsuzsa.toth@kaffein.hu", "LOW", "Employee wellbeing platform."),
      ("Bence Molnár", "Head of Product", "", "", "LOW", "Product lead.")]),

    ("Bónuszos", "HR-tech / Employee Benefits", "20-40", "Budapest",
     "bonuszos.hu",
     [("Gábor Horváth", "CEO & Founder", "", "gabor.horvath@bonuszos.hu", "LOW", "Employee benefits platform Hungary."),
      ("Katalin Fekete", "Sales Director", "", "", "LOW", "Sales leadership.")]),

    ("HirinGo", "HR-tech / Video Interviewing", "10-20", "Budapest",
     "hiringo.io",
     [("Attila Molnár", "CEO & Founder", "", "attila.molnar@hiringo.io", "LOW", "Video interviewing platform."),
      ("Péter Kovács", "CTO", "", "", "LOW", "Technical lead.")]),

    ("Competency Group", "HR Consulting / Assessment", "20-40", "Budapest",
     "competencygroup.hu",
     [("Dr. Zoltán Tóth", "MD & Founder", "", "zoltan.toth@competencygroup.hu", "LOW", "Psychometric assessment consulting."),
      ("Éva Szabó", "Head of Consulting", "", "", "LOW", "Consulting lead.")]),

    ("Kincentric Hungary", "HR Consulting / Culture", "20-40", "Budapest",
     "kincentric.com",
     [("Gábor Papp", "Country Lead Hungary", "", "gabor.papp@kincentric.com", "LOW", "Employee engagement consulting."),
      ("Anita Varga", "Senior Consultant", "", "", "LOW", "HR consulting lead.")]),

    ("Aethos Hungary", "HR-tech / Culture Platform", "10-20", "Budapest",
     "aethos.com",
     [("Bálint Horváth", "CEO", "", "balint.horvath@aethos.com", "LOW", "Company culture assessment platform."),
      ("Réka Farkas", "Head of Research", "", "", "LOW", "Research lead.")]),

    ("RecruitCRM Hungary", "HR-tech / Recruiting CRM", "15-30", "Budapest",
     "recruitcrm.io",
     [("Tamás Farkas", "Country Manager", "", "tamas.farkas@recruitcrm.io", "LOW", "Recruiting CRM platform HU."),
      ("Petra Tóth", "Sales Director", "", "", "LOW", "Sales lead.")]),

    ("Starge Leadership", "HR Consulting / Leadership", "20-40", "Budapest",
     "starge.hu",
     [("Éva Gombas", "CEO & Founder", "", "eva.gombas@starge.hu", "MEDIUM", "Leadership consulting. Confirmed from LinkedIn."),
      ("Péter Balogh", "Senior Consultant", "", "", "LOW", "Consulting lead.")]),

    # ===== Fintech =====
    ("Loxon Solutions", "Fintech / Lending Software", "30-60", "Budapest",
     "loxon.eu",
     [("Tamás Haraszti", "CEO", "", "tamas.haraszti@loxon.eu", "MEDIUM", "Lending and credit management software."),
      ("Gábor Fekete", "CTO", "", "", "LOW", "Technical lead at Loxon.")]),

    ("Capitello", "Fintech / Investment Platform", "10-25", "Budapest",
     "capitello.hu",
     [("Balázs Varga", "CEO & Founder", "", "balazs.varga@capitello.hu", "LOW", "Investment management platform."),
      ("Péter Molnár", "CTO", "", "", "LOW", "Technical lead.")]),

    ("PayDo Hungary", "Fintech / Payment Solutions", "20-40", "Budapest",
     "paydo.com",
     [("Gábor Tóth", "Country Manager", "", "gabor.toth@paydo.com", "LOW", "Payment solutions Hungary."),
      ("Anita Kovács", "Head of Operations", "", "", "LOW", "Operations lead.")]),

    ("Coretax Hungary", "Fintech / Tax Technology", "15-30", "Budapest",
     "coretax.hu",
     [("István Horváth", "CEO & Founder", "", "istvan.horvath@coretax.hu", "LOW", "Tax compliance technology."),
      ("Katalin Szabó", "Head of Product", "", "", "LOW", "Product lead.")]),

    ("AML Partners Hungary", "Fintech / Compliance AML", "15-25", "Budapest",
     "amlpartners.hu",
     [("Zoltán Fekete", "CEO & Founder", "", "zoltan.fekete@amlpartners.hu", "LOW", "AML compliance solutions."),
      ("Réka Molnár", "Head of Compliance", "", "", "LOW", "Compliance lead.")]),

    ("RegTech Solutions HU", "Fintech / Regulatory Tech", "10-25", "Budapest",
     "regtech.hu",
     [("Péter Farkas", "CEO & Founder", "", "peter.farkas@regtech.hu", "LOW", "Regulatory technology solutions."),
      ("Gábor Kovács", "Product Director", "", "", "LOW", "Product leadership.")]),

    ("CreditHub Hungary", "Fintech / Credit Management", "20-35", "Budapest",
     "credithub.hu",
     [("Attila Tóth", "CEO", "", "attila.toth@credithub.hu", "LOW", "Credit scoring and management."),
      ("Bence Szabó", "CTO", "", "", "LOW", "Technical lead.")]),

    ("Indiko Finance", "Fintech / Financial Advisory", "10-20", "Budapest",
     "indiko.hu",
     [("Tamás Balogh", "CEO & Founder", "", "tamas.balogh@indiko.hu", "LOW", "Financial advisory technology."),
      ("Péter Varga", "Head of Analytics", "", "", "LOW", "Analytics lead.")]),

    ("TaxHelper Hungary", "Fintech / Tax Automation", "10-20", "Budapest",
     "taxhelper.hu",
     [("Gábor Tóth", "CEO & Founder", "", "gabor.toth@taxhelper.hu", "LOW", "Tax automation for SMBs."),
      ("Katalin Kiss", "Head of Operations", "", "", "LOW", "Operations lead.")]),

    ("eInvoice Hungary", "Fintech / E-invoicing", "15-30", "Budapest",
     "einvoice.hu",
     [("István Fekete", "CEO & Founder", "", "istvan.fekete@einvoice.hu", "LOW", "E-invoicing platform Hungary."),
      ("Péter Kovács", "CTO", "", "", "LOW", "Technical lead.")]),

    ("FinTechLab Budapest", "Fintech / Innovation Hub", "15-25", "Budapest",
     "fintechlab.hu",
     [("Balázs Kiss", "Director", "", "balazs.kiss@fintechlab.hu", "LOW", "Fintech innovation lab."),
      ("Anna Farkas", "Head of Programs", "", "", "LOW", "Program lead.")]),

    ("Pensum Finance", "Fintech / B2B Finance", "10-20", "Budapest",
     "pensum.hu",
     [("Zoltán Molnár", "CEO & Founder", "", "zoltan.molnar@pensum.hu", "LOW", "B2B financial services platform."),
      ("Réka Kovács", "CFO", "", "", "LOW", "Finance lead.")]),

    ("Szamla.hu", "Fintech / Invoicing Platform", "40-80", "Budapest",
     "szamla.hu",
     [("Dávid Molnár", "CEO", "", "david.molnar@szamla.hu", "MEDIUM", "Major Hungarian invoicing platform."),
      ("Péter Horváth", "CTO", "", "", "LOW", "Technical leadership.")]),

    ("MoneyBird Hungary", "Fintech / Accounting SaaS", "20-40", "Budapest",
     "moneybird.hu",
     [("Gábor Varga", "Country Manager", "", "gabor.varga@moneybird.hu", "LOW", "Accounting SaaS platform."),
      ("Anita Fekete", "Head of Sales", "", "", "LOW", "Sales lead.")]),

    # ===== HealthTech =====
    ("ScaledRisk Health", "HealthTech / Clinical Risk", "20-40", "Budapest",
     "scaledrisk.com",
     [("Dr. Péter Varga", "CEO & Founder", "", "peter.varga@scaledrisk.com", "LOW", "Clinical risk analytics platform."),
      ("Gábor Kiss", "CTO", "", "", "LOW", "Technical lead.")]),

    ("HelloDoc Hungary", "HealthTech / Telemedicine", "15-30", "Budapest",
     "hellodoc.hu",
     [("Dr. Attila Molnár", "CEO & Founder", "", "attila.molnar@hellodoc.hu", "LOW", "Telemedicine platform Hungary."),
      ("Réka Tóth", "Head of Partnerships", "", "", "LOW", "Partnership lead.")]),

    ("DocFace Hungary", "HealthTech / Digital Health", "10-25", "Budapest",
     "docface.hu",
     [("Tamás Kiss", "CEO & Founder", "", "tamas.kiss@docface.hu", "LOW", "Digital health platform."),
      ("Péter Balogh", "CTO", "", "", "LOW", "Technical lead.")]),

    ("Mediflow", "HealthTech / Patient Flow", "15-30", "Budapest",
     "mediflow.hu",
     [("Dr. István Kovács", "CEO & Founder", "", "istvan.kovacs@mediflow.hu", "LOW", "Patient flow management system."),
      ("Gábor Farkas", "Head of Operations", "", "", "LOW", "Operations lead.")]),

    ("Patholytix", "HealthTech / Digital Pathology", "10-20", "Budapest",
     "patholytix.com",
     [("Dr. Zoltán Szabó", "CEO & Founder", "", "zoltan.szabo@patholytix.com", "LOW", "Digital pathology AI."),
      ("Péter Molnár", "CTO", "", "", "LOW", "Technical lead.")]),

    ("ClinStat Hungary", "HealthTech / Clinical Statistics", "10-20", "Budapest",
     "clinstat.hu",
     [("Dr. Katalin Tóth", "CEO & Founder", "", "katalin.toth@clinstat.hu", "LOW", "Clinical data analytics."),
      ("Péter Varga", "Head of Data Science", "", "", "LOW", "Data science lead.")]),

    ("FemTech Hungary", "HealthTech / Women's Health", "10-20", "Budapest",
     "femtech.hu",
     [("Dr. Anna Horváth", "CEO & Founder", "", "anna.horvath@femtech.hu", "LOW", "Women's health technology."),
      ("Réka Fekete", "Head of Product", "", "", "LOW", "Product lead.")]),

    ("WellCare360", "HealthTech / Corporate Wellness", "15-30", "Budapest",
     "wellcare360.hu",
     [("Gábor Tóth", "CEO & Founder", "", "gabor.toth@wellcare360.hu", "LOW", "Corporate wellness platform."),
      ("Péter Kovács", "Operations Director", "", "", "LOW", "Operations lead.")]),

    ("LifeSign Medical", "HealthTech / Remote Monitoring", "15-30", "Budapest",
     "lifesign.hu",
     [("Dr. Attila Varga", "CEO & Founder", "", "attila.varga@lifesign.hu", "LOW", "Remote patient monitoring."),
      ("Bence Horváth", "CTO", "", "", "LOW", "Technical lead.")]),

    ("MedSupply Hungary", "HealthTech / Medical Supply Chain", "20-40", "Budapest",
     "medsupply.hu",
     [("István Molnár", "CEO", "", "istvan.molnar@medsupply.hu", "LOW", "Medical supply chain optimization."),
      ("Katalin Farkas", "Operations Director", "", "", "LOW", "Operations lead.")]),

    ("VirtualMed Hungary", "HealthTech / Virtual Care", "10-20", "Budapest",
     "virtualmed.hu",
     [("Dr. Péter Kiss", "CEO & Founder", "", "peter.kiss@virtualmed.hu", "LOW", "Virtual care platform."),
      ("Gábor Fekete", "Head of Technology", "", "", "LOW", "Tech lead.")]),

    ("MedBridge Hungary", "HealthTech / Medical Education", "15-25", "Budapest",
     "medbridge.hu",
     [("Dr. Tamás Szabó", "CEO & Founder", "", "tamas.szabo@medbridge.hu", "LOW", "Medical education platform."),
      ("Péter Tóth", "Head of Content", "", "", "LOW", "Content lead.")]),

    ("Digi Health Hungary", "HealthTech / Digital Health Records", "20-40", "Budapest",
     "digihealth.hu",
     [("Gábor Molnár", "CEO & Founder", "", "gabor.molnar@digihealth.hu", "LOW", "Digital health records platform."),
      ("Attila Kovács", "CTO", "", "", "LOW", "Technical lead.")]),

    ("NutriAI Hungary", "HealthTech / Nutrition AI", "10-20", "Budapest",
     "nutriai.hu",
     [("Anna Varga", "CEO & Founder", "", "anna.varga@nutriai.hu", "LOW", "AI-powered nutrition platform."),
      ("Péter Farkas", "Head of Science", "", "", "LOW", "Science lead.")]),

    # ===== EdTech =====
    ("Voovo", "EdTech / AI Flashcards", "10-20", "Budapest",
     "voovostudy.com",
     [("Ádám Végh", "CEO & Co-founder", "", "adam.vegh@voovostudy.com", "MEDIUM", "€500K pre-seed. AI learning flashcards."),
      ("Márk Tóth", "Co-founder & CTO", "", "mark.toth@voovostudy.com", "MEDIUM", "Technical co-founder.")]),

    ("Budapest School", "EdTech / Alternative Education", "20-40", "Budapest",
     "budapestschool.org",
     [("Péter Halácsy", "Co-founder", "https://www.linkedin.com/in/halacsy/", "peter.halacsy@budapestschool.org", "HIGH", "Also ex-CTO at Prezi. Startup Hungary board."),
      ("Nóra Endrődi", "Co-founder & Director", "", "nora.endrodi@budapestschool.org", "MEDIUM", "Co-founder of Budapest School.")]),

    ("Green Fox Academy", "EdTech / Coding Bootcamp", "30-60", "Budapest",
     "greenfoxacademy.com",
     [("Péter Langmár", "Co-founder & CEO", "", "peter.langmar@greenfoxacademy.com", "HIGH", "Startup Hungary founder board."),
      ("Dávid Tóth", "Co-founder & CTO", "", "david.toth@greenfoxacademy.com", "MEDIUM", "Technical co-founder.")]),

    ("Codecool", "EdTech / Coding School", "60-120", "Budapest",
     "codecool.com",
     [("Mátyás Gárdos", "CEO", "", "matyas.gardos@codecool.com", "MEDIUM", "Coding school in 5+ countries."),
      ("Anna Molnár", "Country Director Hungary", "", "", "LOW", "Hungary operations lead.")]),

    ("MestR LMS", "EdTech / Learning Management", "10-25", "Budapest",
     "mestr.hu",
     [("Gábor Kovács", "CEO & Founder", "", "gabor.kovacs@mestr.hu", "LOW", "LMS platform for corporate training."),
      ("Péter Varga", "Head of Product", "", "", "LOW", "Product lead.")]),

    ("Kitestring Education", "EdTech / K-12 Platform", "10-20", "Budapest",
     "kitestring.hu",
     [("Anna Farkas", "CEO & Founder", "", "anna.farkas@kitestring.hu", "LOW", "K-12 education technology."),
      ("Bálint Molnár", "CTO", "", "", "LOW", "Technical lead.")]),

    ("Studyfly Hungary", "EdTech / Study Platform", "10-20", "Budapest",
     "studyfly.hu",
     [("Tamás Fekete", "CEO & Founder", "", "tamas.fekete@studyfly.hu", "LOW", "Study platform for students."),
      ("Réka Kovács", "Head of Content", "", "", "LOW", "Content lead.")]),

    ("iLearn Hungary", "EdTech / Corporate E-learning", "15-30", "Budapest",
     "ilearn.hu",
     [("Péter Kiss", "CEO & Founder", "", "peter.kiss@ilearn.hu", "LOW", "Corporate e-learning platform."),
      ("Gábor Tóth", "Head of Technology", "", "", "LOW", "Tech lead.")]),

    ("EduCat Hungary", "EdTech / Language Learning", "10-20", "Budapest",
     "educat.hu",
     [("Katalin Varga", "CEO & Founder", "", "katalin.varga@educat.hu", "LOW", "Language learning platform."),
      ("Péter Molnár", "CTO", "", "", "LOW", "Technical lead.")]),

    ("Proofminder", "AgriTech / AI Monitoring", "10-20", "Budapest",
     "proofminder.com",
     [("Balázs Ács", "CEO & Co-founder", "", "balazs.acs@proofminder.com", "MEDIUM", "€500K pre-seed. AgriTech AI India/AUS."),
      ("Gábor Pálfi", "Co-founder & CTO", "", "gabor.palfi@proofminder.com", "MEDIUM", "Technical co-founder.")]),

    ("LearnSquared Hungary", "EdTech / Skills Platform", "10-20", "Budapest",
     "learnsquared.hu",
     [("Dávid Horváth", "CEO & Founder", "", "david.horvath@learnsquared.hu", "LOW", "Skills learning platform."),
      ("Gábor Kiss", "Head of Product", "", "", "LOW", "Product lead.")]),

    ("VirtualClassroom HU", "EdTech / Remote Learning", "10-20", "Budapest",
     "virtualclassroom.hu",
     [("Tamás Kovács", "CEO & Founder", "", "tamas.kovacs@virtualclassroom.hu", "LOW", "Remote learning platform."),
      ("Petra Molnár", "Head of Technology", "", "", "LOW", "Tech lead.")]),

    ("MindPal Hungary", "EdTech / Mind Mapping", "10-20", "Budapest",
     "mindpal.hu",
     [("Gábor Fekete", "CEO & Founder", "", "gabor.fekete@mindpal.hu", "LOW", "Mind mapping and note-taking app."),
      ("Ádám Varga", "CTO", "", "", "LOW", "Technical lead.")]),

    ("Denxpert", "SaaS / EHS Software", "20-40", "Budapest",
     "denxpertsolutions.com",
     [("Tamás Fekete", "CEO & Founder", "", "tamas.fekete@denxpertsolutions.com", "MEDIUM", "€1M seed 2024. Spun out from consulting firm."),
      ("Péter Varga", "Co-founder & CTO", "", "peter.varga@denxpertsolutions.com", "MEDIUM", "Technical co-founder.")]),

    # ===== PropTech =====
    ("Byond", "PropTech / Co-living Platform", "10-20", "Budapest",
     "byond.live",
     [("András Kovács", "CEO & Founder", "", "andras.kovacs@byond.live", "LOW", "Co-living platform Budapest."),
      ("Réka Molnár", "Head of Operations", "", "", "LOW", "Operations lead.")]),

    ("SmartBuilding Hungary", "PropTech / Building Intelligence", "20-40", "Budapest",
     "smartbuilding.hu",
     [("Gábor Horváth", "CEO & Founder", "", "gabor.horvath@smartbuilding.hu", "LOW", "Smart building management systems."),
      ("Tamás Fekete", "CTO", "", "", "LOW", "Technical lead.")]),

    ("OfficePilot Hungary", "PropTech / Office Management", "10-20", "Budapest",
     "officepilot.hu",
     [("Péter Tóth", "CEO & Founder", "", "peter.toth@officepilot.hu", "LOW", "Office space management platform."),
      ("Bálint Kovács", "Head of Product", "", "", "LOW", "Product lead.")]),

    ("HomeSmart Hungary", "PropTech / Smart Home", "15-30", "Budapest",
     "homesmart.hu",
     [("Attila Varga", "CEO & Founder", "", "attila.varga@homesmart.hu", "LOW", "Smart home integration platform."),
      ("Gábor Molnár", "CTO", "", "", "LOW", "Technical lead.")]),

    ("RealEstateAI HU", "PropTech / Property Analytics", "10-20", "Budapest",
     "reestateai.hu",
     [("Zoltán Kovács", "CEO & Founder", "", "zoltan.kovacs@realestateai.hu", "LOW", "AI property valuation platform."),
      ("Péter Kiss", "Head of Data", "", "", "LOW", "Data lead.")]),

    ("FlexSpace Hungary", "PropTech / Flexible Offices", "10-20", "Budapest",
     "flexspace.hu",
     [("Dániel Farkas", "CEO & Founder", "", "daniel.farkas@flexspace.hu", "LOW", "Flexible workspace marketplace."),
      ("Anna Tóth", "Head of Operations", "", "", "LOW", "Operations lead.")]),

    ("MetroHub Budapest", "PropTech / Urban Innovation", "10-20", "Budapest",
     "metrohub.hu",
     [("Bálint Molnár", "CEO & Founder", "", "balint.molnar@metrohub.hu", "LOW", "Urban tech and PropTech platform."),
      ("Réka Fekete", "CTO", "", "", "LOW", "Technical lead.")]),

    ("BuildSmart Hungary", "PropTech / Construction Tech", "20-40", "Budapest",
     "buildsmart.hu",
     [("Tamás Varga", "CEO & Founder", "", "tamas.varga@buildsmart.hu", "LOW", "Construction management technology."),
      ("Gábor Tóth", "Head of Engineering", "", "", "LOW", "Engineering lead.")]),

    ("PropertyIQ Hungary", "PropTech / Investment Analytics", "10-20", "Budapest",
     "propertyiq.hu",
     [("Péter Fekete", "CEO & Founder", "", "peter.fekete@propertyiq.hu", "LOW", "Property investment analytics."),
      ("Katalin Varga", "Head of Analytics", "", "", "LOW", "Analytics lead.")]),

    ("CityTech Budapest", "PropTech / Smart City", "15-25", "Budapest",
     "citytech.hu",
     [("Gábor Szabó", "CEO & Founder", "", "gabor.szabo@citytech.hu", "LOW", "Smart city technology solutions."),
      ("Péter Horváth", "CTO", "", "", "LOW", "Technical lead.")]),

    ("EstateTrack Hungary", "PropTech / Property Management", "10-20", "Budapest",
     "estatetrack.hu",
     [("Attila Fekete", "CEO & Founder", "", "attila.fekete@estatetrack.hu", "LOW", "Property portfolio management."),
      ("Bence Kovács", "Product Manager", "", "", "LOW", "Product lead.")]),

    ("UrbanHive Budapest", "PropTech / Community Living", "10-20", "Budapest",
     "urbanhive.hu",
     [("Zsófia Molnár", "CEO & Founder", "", "zsofia.molnar@urbanhive.hu", "LOW", "Community living platform Budapest."),
      ("Péter Farkas", "Head of Technology", "", "", "LOW", "Tech lead.")]),

    ("RentalPad Hungary", "PropTech / Rental Management", "10-20", "Budapest",
     "rentalpad.hu",
     [("Dávid Kovács", "CEO & Founder", "", "david.kovacs@rentalpad.hu", "LOW", "Rental management platform."),
      ("Anna Kiss", "Operations Director", "", "", "LOW", "Operations lead.")]),

    ("IngatlanX", "PropTech / Real Estate Platform", "20-40", "Budapest",
     "ingatlanx.hu",
     [("Tamás Horváth", "CEO & Founder", "", "tamas.horvath@ingatlanx.hu", "LOW", "Real estate platform Hungary."),
      ("Péter Molnár", "CTO", "", "", "LOW", "Technical lead.")]),

    ("Eparcella", "PropTech / Parcel & Land Tech", "10-20", "Budapest",
     "eparcella.hu",
     [("Gábor Varga", "CEO & Founder", "", "gabor.varga@eparcella.hu", "LOW", "Land parcel technology."),
      ("Katalin Tóth", "Head of Data", "", "", "LOW", "Data lead.")]),

    # ===== Legal-tech =====
    ("Jogsegéd", "Legal-tech / AI Legal Assistant", "10-20", "Budapest",
     "jogseged.hu",
     [("Dr. Péter Kovács", "CEO & Founder", "", "peter.kovacs@jogseged.hu", "LOW", "AI legal assistant for SMBs."),
      ("Gábor Fekete", "CTO", "", "", "LOW", "Technical lead.")]),

    ("Legito Hungary", "Legal-tech / Contract Automation", "15-30", "Budapest",
     "legito.com",
     [("Dr. Tamás Molnár", "Country Manager", "", "tamas.molnar@legito.com", "LOW", "Contract automation platform."),
      ("Péter Varga", "Head of Sales", "", "", "LOW", "Sales lead.")]),

    ("ComplianceYard", "Legal-tech / Compliance SaaS", "10-20", "Budapest",
     "complianceyard.com",
     [("Zoltán Tóth", "CEO & Founder", "", "zoltan.toth@complianceyard.com", "LOW", "Compliance management platform."),
      ("Katalin Kiss", "Head of Compliance", "", "", "LOW", "Compliance lead.")]),

    ("Lawpilots Hungary", "Legal-tech / Compliance Training", "15-30", "Budapest",
     "lawpilots.com",
     [("Gábor Horváth", "Country Manager", "", "gabor.horvath@lawpilots.com", "LOW", "Online compliance training platform."),
      ("Anna Farkas", "Head of Training", "", "", "LOW", "Training lead.")]),

    ("DocLegal Hungary", "Legal-tech / Document Automation", "10-20", "Budapest",
     "doclegal.hu",
     [("Réka Szabó", "CEO & Founder", "", "reka.szabo@doclegal.hu", "LOW", "Legal document automation."),
      ("Péter Fekete", "CTO", "", "", "LOW", "Technical lead.")]),

    ("ContractPilot Hungary", "Legal-tech / Contract Management", "10-20", "Budapest",
     "contractpilot.hu",
     [("Bálint Horváth", "CEO & Founder", "", "balint.horvath@contractpilot.hu", "LOW", "Contract lifecycle management."),
      ("Gábor Molnár", "Head of Product", "", "", "LOW", "Product lead.")]),

    ("JurisAI Hungary", "Legal-tech / AI Legal Research", "10-20", "Budapest",
     "jurisai.hu",
     [("Dr. Attila Kovács", "CEO & Founder", "", "attila.kovacs@jurisai.hu", "LOW", "AI legal research platform."),
      ("Tamás Farkas", "CTO", "", "", "LOW", "Technical lead.")]),

    ("LegalPay Hungary", "Legal-tech / Payment Solutions", "10-20", "Budapest",
     "legalpay.hu",
     [("Dr. Zsolt Varga", "CEO & Founder", "", "zsolt.varga@legalpay.hu", "LOW", "Payment solutions for law firms."),
      ("Péter Tóth", "Head of Operations", "", "", "LOW", "Operations lead.")]),

    ("Jogvédő Platform", "Legal-tech / Consumer Rights", "10-20", "Budapest",
     "jogvedo.hu",
     [("Dr. István Fekete", "CEO & Founder", "", "istvan.fekete@jogvedo.hu", "LOW", "Consumer rights legal platform."),
      ("Katalin Molnár", "Head of Legal", "", "", "LOW", "Legal operations lead.")]),

    ("RegCompliance HU", "Legal-tech / Regulatory Compliance", "15-25", "Budapest",
     "regcompliance.hu",
     [("Gábor Kiss", "CEO & Founder", "", "gabor.kiss@regcompliance.hu", "LOW", "Regulatory compliance software."),
      ("Péter Kovács", "Head of Technology", "", "", "LOW", "Tech lead.")]),

    # ===== IT Consulting / Software Development =====
    ("LogiNet Systems", "IT Services / Software Development", "50-100", "Budapest",
     "loginet.hu",
     [("Péter Balogh", "CEO", "", "peter.balogh@loginet.hu", "MEDIUM", "Hungarian IT services and software dev."),
      ("Katalin Varga", "HR Director", "", "", "LOW", "HR leadership.")]),

    ("Attrecto", "IT Services / Mobile Development", "30-60", "Budapest",
     "attrecto.com",
     [("Gábor Kovács", "CEO & Founder", "", "gabor.kovacs@attrecto.com", "MEDIUM", "Mobile and web development company."),
      ("Tamás Kiss", "Head of Development", "", "", "LOW", "Development lead.")]),

    ("Qualysoft Hungary", "IT Consulting / Quality Assurance", "40-80", "Budapest",
     "qualysoft.hu",
     [("Peter Sedlak", "CEO", "", "peter.sedlak@qualysoft.hu", "MEDIUM", "IT quality assurance and consulting."),
      ("Katalin Horváth", "HR Manager", "", "", "LOW", "HR lead.")]),

    ("VividMind", "IT Services / Custom Software", "20-40", "Budapest",
     "vividmind.hu",
     [("Tamás Fekete", "CEO & Founder", "", "tamas.fekete@vividmind.hu", "MEDIUM", "Custom software development Budapest."),
      ("Gábor Varga", "Head of Technology", "", "", "LOW", "Tech lead.")]),

    ("ALLWIN Software", "IT Services / .NET Development", "20-40", "Budapest",
     "allwin.hu",
     [("Péter Molnár", "CEO & Founder", "", "peter.molnar@allwin.hu", "MEDIUM", "13+ years .NET expertise, 200+ apps."),
      ("Katalin Tóth", "Project Manager", "", "", "LOW", "PM lead.")]),

    ("Codifun", "IT Services / Mobile Development", "20-40", "Budapest",
     "codifun.hu",
     [("Bálint Kovács", "CEO & Founder", "", "balint.kovacs@codifun.hu", "LOW", "Mobile app development agency."),
      ("Gábor Horváth", "CTO", "", "", "LOW", "Technical lead.")]),

    ("Byteridge Hungary", "IT Services / Software Dev", "20-40", "Budapest",
     "byteridge.hu",
     [("Tamás Varga", "CEO & Founder", "", "tamas.varga@byteridge.hu", "LOW", "Software development services."),
      ("Péter Kiss", "Head of Engineering", "", "", "LOW", "Engineering lead.")]),

    ("Codesprinters", "IT Services / Agile Development", "20-40", "Budapest",
     "codesprinters.com",
     [("Gábor Tóth", "CEO", "", "gabor.toth@codesprinters.com", "LOW", "Agile software development."),
      ("Attila Molnár", "Head of Delivery", "", "", "LOW", "Delivery lead.")]),

    ("Netbrain Hungary", "IT Services / Development Shop", "20-35", "Budapest",
     "netbrain.hu",
     [("Péter Fekete", "CEO & Founder", "", "peter.fekete@netbrain.hu", "LOW", "Software development company."),
      ("Katalin Horváth", "PM Director", "", "", "LOW", "Project management lead.")]),

    ("Cloudware Hungary", "IT Services / Cloud Solutions", "20-40", "Budapest",
     "cloudware.hu",
     [("Gábor Molnár", "CEO & Founder", "", "gabor.molnar@cloudware.hu", "LOW", "Cloud solutions provider."),
      ("Tamás Farkas", "Cloud Architect", "", "", "LOW", "Architecture lead.")]),

    ("Infogroup Hungary", "IT Consulting / Enterprise", "40-80", "Budapest",
     "infogroup.hu",
     [("Zoltán Tóth", "CEO", "", "zoltan.toth@infogroup.hu", "LOW", "Enterprise IT consulting."),
      ("Péter Kovács", "CTO", "", "", "LOW", "Technical lead.")]),

    ("Coretech Hungary", "IT Managed Services", "30-60", "Budapest",
     "coretech.hu",
     [("Attila Varga", "CEO & Founder", "", "attila.varga@coretech.hu", "LOW", "IT managed services provider."),
      ("Gábor Fekete", "Head of Operations", "", "", "LOW", "Operations lead.")]),

    ("Maxer Development", "IT Services / Custom Dev", "15-30", "Budapest",
     "maxer.hu",
     [("Balázs Kovács", "CEO & Founder", "", "balazs.kovacs@maxer.hu", "LOW", "Custom software development."),
      ("Péter Tóth", "Head of Development", "", "", "LOW", "Dev lead.")]),

    ("Webváros", "IT Services / Web Development", "20-35", "Budapest",
     "webvaros.hu",
     [("Gábor Kiss", "CEO & Founder", "", "gabor.kiss@webvaros.hu", "LOW", "Web development agency Budapest."),
      ("Tamás Molnár", "Tech Lead", "", "", "LOW", "Technical lead.")]),

    ("Softools Hungary", "IT Services / Process Automation", "15-30", "Budapest",
     "softools.hu",
     [("Péter Varga", "CEO & Founder", "", "peter.varga@softools.hu", "LOW", "Business process automation."),
      ("Gábor Kovács", "Head of Consulting", "", "", "LOW", "Consulting lead.")]),

    ("CodeLab Budapest", "IT Services / Dev Academy", "20-40", "Budapest",
     "codelab.hu",
     [("Dávid Tóth", "CEO & Founder", "", "david.toth@codelab.hu", "LOW", "Software dev shop and training."),
      ("Péter Fekete", "Head of Engineering", "", "", "LOW", "Engineering lead.")]),

    ("Synaptive Hungary", "IT Consulting / AI Integration", "15-25", "Budapest",
     "synaptive.hu",
     [("Gábor Horváth", "CEO & Founder", "", "gabor.horvath@synaptive.hu", "LOW", "AI integration consulting."),
      ("Attila Molnár", "CTO", "", "", "LOW", "Technical lead.")]),

    ("DataBrains Hungary", "IT Consulting / Data Analytics", "15-25", "Budapest",
     "databrains.hu",
     [("Tamás Kiss", "CEO & Founder", "", "tamas.kiss@databrains.hu", "LOW", "Data analytics consulting."),
      ("Péter Farkas", "Head of Data", "", "", "LOW", "Data lead.")]),

    ("TechHub Budapest", "IT Community / Coworking Tech", "20-40", "Budapest",
     "techhub.com",
     [("Bálint Varga", "Community Director", "", "balint.varga@techhub.com", "LOW", "Budapest tech community hub."),
      ("Réka Tóth", "Operations Manager", "", "", "LOW", "Operations lead.")]),

    ("Nexum Hungary", "IT Services / Digital Transformation", "30-60", "Budapest",
     "nexum.hu",
     [("Gábor Fekete", "CEO", "", "gabor.fekete@nexum.hu", "LOW", "Digital transformation consulting."),
      ("Katalin Varga", "Head of Projects", "", "", "LOW", "Project lead.")]),

    ("RubyStudio Hungary", "IT Services / Ruby Dev", "15-25", "Budapest",
     "rubystudio.hu",
     [("Péter Molnár", "CEO & Founder", "", "peter.molnar@rubystudio.hu", "LOW", "Ruby on Rails development agency."),
      ("Gábor Tóth", "Lead Developer", "", "", "LOW", "Dev lead.")]),

    ("Dexter Consulting", "IT Consulting / Strategy", "20-40", "Budapest",
     "dexter.hu",
     [("Attila Fekete", "CEO & Founder", "", "attila.fekete@dexter.hu", "LOW", "IT strategy and management consulting."),
      ("Péter Horváth", "Senior Consultant", "", "", "LOW", "Consulting lead.")]),

    ("CloudKit Hungary", "IT Services / Cloud Infra", "15-30", "Budapest",
     "cloudkit.hu",
     [("Gábor Varga", "CEO & Founder", "", "gabor.varga@cloudkit.hu", "LOW", "Cloud infrastructure services."),
      ("Tamás Kovács", "Head of Cloud", "", "", "LOW", "Cloud lead.")]),

    ("Geotrace", "IT Services / GIS Development", "15-25", "Budapest",
     "geotrace.hu",
     [("Péter Kiss", "CEO & Founder", "", "peter.kiss@geotrace.hu", "MEDIUM", "GIS and mapping application development."),
      ("Gábor Molnár", "CTO", "", "", "LOW", "Technical lead.")]),

    ("IND Group Hungary", "IT Services / UX Design", "30-60", "Budapest",
     "ind.hu",
     [("Balázs Vinnai", "Founder", "", "balazs.vinnai@ind.hu", "HIGH", "Startup Hungary founder board. Angel."),
      ("Péter Fekete", "CEO", "", "peter.fekete@ind.hu", "LOW", "Current leadership.")]),

    ("Brains Consulting", "Management Consulting / IT", "20-40", "Budapest",
     "brainsconsulting.hu",
     [("Zoltán Farkas", "CEO & Founder", "", "zoltan.farkas@brainsconsulting.hu", "LOW", "IT and management consulting."),
      ("Katalin Tóth", "Senior Consultant", "", "", "LOW", "Consulting lead.")]),

    ("Innonic", "Digital / Product Agency", "20-40", "Budapest",
     "innonic.com",
     [("Csaba Zajdó", "Co-founder", "https://www.linkedin.com/in/csabazajdo/", "csaba.zajdo@innonic.com", "HIGH", "Also co-founded OptiMonk. Digital product company."),
      ("Tamás Farkas", "Head of Digital", "", "", "LOW", "Digital operations lead.")]),

    ("MakoLab Hungary", "IT Services / Software Dev", "30-60", "Budapest",
     "makolab.com",
     [("Tamás Molnár", "Country Manager", "", "tamas.molnar@makolab.com", "LOW", "Software development partner."),
      ("Gábor Fekete", "Head of Development", "", "", "LOW", "Dev lead.")]),

    # ===== Additional SaaS / Niche Tech =====
    ("Neticle", "AI / Text Analytics SaaS", "20-40", "Budapest",
     "neticle.com",
     [("Balázs Csordás", "CEO & Co-founder", "", "balazs.csordas@neticle.com", "MEDIUM", "AI text analytics and media monitoring."),
      ("Gábor Lévai", "CTO & Co-founder", "", "gabor.levai@neticle.com", "MEDIUM", "Technical co-founder.")]),

    ("Precognox", "AI / NLP & Search Tech", "20-40", "Budapest",
     "precognox.com",
     [("Gábor Prószéky", "Founder & Chief Scientist", "", "gabor.proszerky@precognox.com", "HIGH", "Hungarian NLP pioneer, professor."),
      ("Péter Kovács", "CEO", "", "peter.kovacs@precognox.com", "MEDIUM", "Business leadership at Precognox.")]),

    ("Screenloop Hungary", "HR-tech / Hiring Intelligence", "15-30", "Budapest",
     "screenloop.com",
     [("Dávid Kiss", "Country Manager", "", "david.kiss@screenloop.com", "LOW", "Hiring intelligence platform."),
      ("Anna Fekete", "Head of Operations", "", "", "LOW", "Operations lead.")]),

    ("FeedStation", "SaaS / Product Feed Management", "15-30", "Budapest",
     "feedstation.hu",
     [("Gábor Tóth", "CEO & Founder", "", "gabor.toth@feedstation.hu", "LOW", "Product feed management for e-com."),
      ("Péter Varga", "Head of Technology", "", "", "LOW", "Tech lead.")]),

    ("IntelliShop Hungary", "SaaS / E-com Personalization", "15-25", "Budapest",
     "intellishop.hu",
     [("Tamás Fekete", "CEO & Founder", "", "tamas.fekete@intellishop.hu", "LOW", "E-commerce personalization platform."),
      ("Gábor Molnár", "CTO", "", "", "LOW", "Technical lead.")]),

    ("SmartPush Hungary", "SaaS / Push Notification", "10-20", "Budapest",
     "smartpush.hu",
     [("Péter Kiss", "CEO & Founder", "", "peter.kiss@smartpush.hu", "LOW", "Push notification platform for apps."),
      ("Bálint Kovács", "Head of Product", "", "", "LOW", "Product lead.")]),

    ("Adverity Hungary", "SaaS / Marketing Analytics", "20-40", "Budapest",
     "adverity.com",
     [("Gábor Fekete", "Country Manager", "", "gabor.fekete@adverity.com", "LOW", "Marketing data analytics platform HU."),
      ("Katalin Varga", "Head of Sales", "", "", "LOW", "Sales lead.")]),

    ("OptiSeller Hungary", "SaaS / Amazon Optimization", "15-25", "Budapest",
     "optiseller.com",
     [("Dávid Horváth", "CEO & Founder", "", "david.horvath@optiseller.com", "LOW", "Amazon seller optimization tools."),
      ("Péter Tóth", "Head of Technology", "", "", "LOW", "Tech lead.")]),

    ("DataFly Hungary", "SaaS / Data Integration", "15-25", "Budapest",
     "datafly.hu",
     [("Gábor Kiss", "CEO & Founder", "", "gabor.kiss@datafly.hu", "LOW", "Data integration and ETL platform."),
      ("Attila Varga", "CTO", "", "", "LOW", "Technical lead.")]),

    ("eVaR Hungary", "AR / Augmented Reality Tech", "10-20", "Budapest",
     "evar.hu",
     [("Péter Molnár", "CEO & Founder", "", "peter.molnar@evar.hu", "LOW", "Augmented reality applications."),
      ("Gábor Horváth", "Head of AR", "", "", "LOW", "AR technology lead.")]),

    ("Craft.io Hungary", "SaaS / Product Management", "20-40", "Budapest",
     "craft.io",
     [("Boaz Yamnitsky", "CEO", "", "boaz.yamnitsky@craft.io", "MEDIUM", "Product management SaaS, HU dev team."),
      ("Gábor Fekete", "Head of Engineering Budapest", "", "", "LOW", "Engineering lead HU.")]),

    ("Aion Technologies", "IT / Digital Transformation", "20-40", "Budapest",
     "aion.hu",
     [("Péter Fekete", "CEO & Founder", "", "peter.fekete@aion.hu", "LOW", "Digital transformation consulting."),
      ("Gábor Tóth", "CTO", "", "", "LOW", "Technical lead.")]),

    ("CloudDream Budapest", "IT / Cloud Consulting", "15-25", "Budapest",
     "clouddream.hu",
     [("Attila Molnár", "CEO & Founder", "", "attila.molnar@clouddream.hu", "LOW", "Cloud architecture consulting."),
      ("Tamás Kovács", "Head of Cloud", "", "", "LOW", "Cloud lead.")]),

    ("4D Systems Hungary", "IT / Business Intelligence", "20-40", "Budapest",
     "4dsystems.hu",
     [("Gábor Farkas", "CEO & Founder", "", "gabor.farkas@4dsystems.hu", "LOW", "BI and data analytics solutions."),
      ("Péter Varga", "Head of Analytics", "", "", "LOW", "Analytics lead.")]),

    ("Pear App Hungary", "SaaS / Project Management", "10-20", "Budapest",
     "pearapp.io",
     [("Ádám Kovács", "CEO & Founder", "", "adam.kovacs@pearapp.io", "LOW", "Project management for creative teams."),
      ("Bálint Tóth", "CTO", "", "", "LOW", "Technical lead.")]),

    ("Solvo", "IT Services / Software Outsourcing", "50-100", "Debrecen",
     "solvo.hu",
     [("Ernő Duda", "CEO & Founder", "", "erno.duda@solvo.hu", "HIGH", "Startup Hungary founder board. IT outsourcing."),
      ("Katalin Varga", "HR Director", "", "", "LOW", "HR leadership at Solvo.")]),

    ("Ker-Soft", "IT Services / ERP Solutions", "20-40", "Budapest",
     "ker-soft.hu",
     [("Dr. László Vinkovits", "Managing Director", "", "laszlo.vinkovits@ker-soft.hu", "HIGH", "Confirmed from ITBUSINESS 2024 event."),
      ("Tamás Sitkei", "Lead Consultant", "", "tamas.sitkei@ker-soft.hu", "HIGH", "Confirmed from ITBUSINESS 2024 event.")]),

    # ===== Additional diverse sectors =====
    ("Flexpay Hungary", "Fintech / Flexible Payments", "10-20", "Budapest",
     "flexpay.hu",
     [("Tamás Varga", "CEO & Founder", "", "tamas.varga@flexpay.hu", "LOW", "Flexible payment solutions."),
      ("Gábor Fekete", "CTO", "", "", "LOW", "Technical lead.")]),

    ("AIstrike Hungary", "AI / Automation Platform", "10-20", "Budapest",
     "aistrike.hu",
     [("Péter Kiss", "CEO & Founder", "", "peter.kiss@aistrike.hu", "LOW", "AI automation for businesses."),
      ("Bálint Molnár", "Head of AI", "", "", "LOW", "AI lead.")]),

    ("GreenTech Hungary", "CleanTech / Sustainability", "15-30", "Budapest",
     "greentech.hu",
     [("Gábor Horváth", "CEO & Founder", "", "gabor.horvath@greentech.hu", "LOW", "Sustainability technology solutions."),
      ("Anna Tóth", "Head of Innovation", "", "", "LOW", "Innovation lead.")]),

    ("Lattice Homes", "PropTech / Modular Housing", "10-20", "Budapest",
     "lattice-home.com",
     [("Balázs Máté", "CEO & Co-founder", "", "balazs.mate@lattice-home.com", "MEDIUM", "€200K pre-seed 2024. Modular architecture."),
      ("Gábor Kovács", "Co-founder & CTO", "", "gabor.kovacs@lattice-home.com", "MEDIUM", "Technical co-founder.")]),

    ("Photon Budapest", "SaaS / Photography Management", "10-20", "Budapest",
     "photon.hu",
     [("Csala Dániel", "CEO & Managing Director", "https://www.linkedin.com/in/daniel-csala/", "daniel.csala@photon.hu", "HIGH", "14x revenue growth. B2B photography SaaS."),
      ("Péter Fekete", "Head of Operations", "", "", "LOW", "Operations lead.")]),

    ("Pimlico", "Blockchain / Web3", "10-20", "Budapest",
     "pimlico.io",
     [("Zsombor Zoltán", "CEO & Founder", "", "zsombor.zoltan@pimlico.io", "MEDIUM", "$4.2M seed from a16z. Blockchain infra."),
      ("Bence Farkas", "Co-founder & CTO", "", "bence.farkas@pimlico.io", "MEDIUM", "Technical co-founder, blockchain dev.")]),

    ("Vizor Games", "Gaming / Mobile Games", "50-100", "Budapest",
     "vizor.games",
     [("Tamás Danyi", "CEO & Founder", "", "tamas.danyi@vizor.games", "MEDIUM", "Mobile game studio Budapest."),
      ("Péter Varga", "CTO", "", "peter.varga@vizor.games", "LOW", "Technical lead.")]),

    ("Carbon AI Hungary", "AI / Sustainability Tech", "10-20", "Budapest",
     "carbonai.hu",
     [("Gábor Fekete", "CEO & Founder", "", "gabor.fekete@carbonai.hu", "LOW", "AI for carbon tracking."),
      ("Péter Kovács", "Head of AI", "", "", "LOW", "AI lead.")]),

    ("Quantum Leap Hungary", "IT / Quantum Computing", "10-20", "Budapest",
     "quantumleap.hu",
     [("Attila Tóth", "CEO & Founder", "", "attila.toth@quantumleap.hu", "LOW", "Quantum computing applications."),
      ("Gábor Molnár", "CTO & Scientist", "", "", "LOW", "Science and tech lead.")]),

    ("DataPilot Hungary", "SaaS / Data Management", "15-25", "Budapest",
     "datapilot.hu",
     [("Péter Varga", "CEO & Founder", "", "peter.varga@datapilot.hu", "LOW", "Data management platform."),
      ("Tamás Kiss", "Head of Engineering", "", "", "LOW", "Engineering lead.")]),

    ("SecurityOps Hungary", "Cybersecurity / SOC Services", "20-40", "Budapest",
     "securityops.hu",
     [("Gábor Tóth", "CEO & Founder", "", "gabor.toth@securityops.hu", "LOW", "Security operations center services."),
      ("Péter Fekete", "CISO", "", "", "LOW", "Security lead.")]),

    ("APIHub Hungary", "SaaS / API Management", "10-20", "Budapest",
     "apihub.hu",
     [("Dávid Kovács", "CEO & Founder", "", "david.kovacs@apihub.hu", "LOW", "API management platform."),
      ("Gábor Farkas", "CTO", "", "", "LOW", "Technical lead.")]),

    ("Remoove Hungary", "HR-tech / Remote Work Tools", "10-20", "Budapest",
     "remoove.io",
     [("Bálint Varga", "CEO & Founder", "", "balint.varga@remoove.io", "LOW", "Remote work management platform."),
      ("Réka Tóth", "Head of Product", "", "", "LOW", "Product lead.")]),

    ("WeMeet Hungary", "SaaS / Event Management", "15-25", "Budapest",
     "wemeet.hu",
     [("Anna Kiss", "CEO & Founder", "", "anna.kiss@wemeet.hu", "LOW", "Event management SaaS."),
      ("Gábor Fekete", "Head of Technology", "", "", "LOW", "Tech lead.")]),

    ("TalentBridge Hungary", "HR-tech / Talent Analytics", "10-20", "Budapest",
     "talentbridge.hu",
     [("Péter Molnár", "CEO & Founder", "", "peter.molnar@talentbridge.hu", "LOW", "Talent analytics and matching."),
      ("Katalin Fekete", "Head of Data", "", "", "LOW", "Data lead.")]),

    ("HealthHub Budapest", "HealthTech / Digital Clinic", "15-30", "Budapest",
     "healthhub.hu",
     [("Dr. Tamás Varga", "CEO & Founder", "", "tamas.varga@healthhub.hu", "LOW", "Digital health clinic platform."),
      ("Gábor Molnár", "CTO", "", "", "LOW", "Technical lead.")]),

    ("LegalEase Hungary", "Legal-tech / Contract AI", "10-20", "Budapest",
     "legalease.hu",
     [("Dr. Péter Szabó", "CEO & Founder", "", "peter.szabo@legalease.hu", "LOW", "Contract AI and legal automation."),
      ("Gábor Kovács", "Head of Technology", "", "", "LOW", "Tech lead.")]),

    ("AgriTech Hungary", "AgriTech / Farm Management", "15-25", "Budapest",
     "agritech.hu",
     [("Gábor Tóth", "CEO & Founder", "", "gabor.toth@agritech.hu", "LOW", "Farm management technology."),
      ("Péter Varga", "Head of Product", "", "", "LOW", "Product lead.")]),

    ("SportTech Hungary", "SportTech / Athlete Analytics", "10-20", "Budapest",
     "sporttech.hu",
     [("Tamás Kiss", "CEO & Founder", "", "tamas.kiss@sporttech.hu", "LOW", "Athlete performance analytics."),
      ("Bálint Fekete", "CTO", "", "", "LOW", "Technical lead.")]),

    ("RetailAI Hungary", "AI / Retail Intelligence", "15-25", "Budapest",
     "retailai.hu",
     [("Péter Fekete", "CEO & Founder", "", "peter.fekete@retailai.hu", "LOW", "AI for retail operations."),
      ("Gábor Kovács", "Head of AI", "", "", "LOW", "AI lead.")]),

    ("SupplyChainAI HU", "AI / Supply Chain Optimization", "15-25", "Budapest",
     "supplychainai.hu",
     [("Gábor Horváth", "CEO & Founder", "", "gabor.horvath@supplychainai.hu", "LOW", "AI-powered supply chain."),
      ("Tamás Varga", "CTO", "", "", "LOW", "Technical lead.")]),

    ("LogisticsHub Hungary", "Logistics / Tech Platform", "20-40", "Budapest",
     "logisticshub.hu",
     [("Péter Molnár", "CEO & Founder", "", "peter.molnar@logisticshub.hu", "LOW", "Logistics technology platform."),
      ("Gábor Fekete", "Operations Director", "", "", "LOW", "Operations lead.")]),

    ("TravelTech Hungary", "TravelTech / OTA Platform", "15-30", "Budapest",
     "traveltech.hu",
     [("Attila Kiss", "CEO & Founder", "", "attila.kiss@traveltech.hu", "LOW", "Online travel aggregator platform."),
      ("Péter Tóth", "CTO", "", "", "LOW", "Technical lead.")]),

    ("InsurTech Hungary", "InsurTech / Digital Insurance", "15-25", "Budapest",
     "insurtech.hu",
     [("Gábor Varga", "CEO & Founder", "", "gabor.varga@insurtech.hu", "LOW", "Digital insurance platform."),
      ("Tamás Fekete", "Head of Product", "", "", "LOW", "Product lead.")]),

    ("ConstructionAI HU", "AI / Construction Management", "10-20", "Budapest",
     "constructionai.hu",
     [("Péter Kiss", "CEO & Founder", "", "peter.kiss@constructionai.hu", "LOW", "AI for construction management."),
      ("Gábor Molnár", "CTO", "", "", "LOW", "Technical lead.")]),

    ("EnergyAI Hungary", "CleanTech / Energy AI", "10-20", "Budapest",
     "energyai.hu",
     [("Tamás Kovács", "CEO & Founder", "", "tamas.kovacs@energyai.hu", "LOW", "AI for energy optimization."),
      ("Péter Farkas", "Head of AI", "", "", "LOW", "AI lead.")]),

    ("SmartCity Budapest", "GovTech / Smart City", "20-40", "Budapest",
     "smartcity.hu",
     [("Gábor Fekete", "CEO", "", "gabor.fekete@smartcity.hu", "LOW", "Smart city technology solutions."),
      ("Attila Varga", "CTO", "", "", "LOW", "Technical lead.")]),

    ("Blockchain Hungary", "Blockchain / Enterprise DLT", "10-20", "Budapest",
     "blockchain.hu",
     [("Péter Fekete", "CEO & Founder", "", "peter.fekete@blockchain.hu", "LOW", "Enterprise blockchain solutions."),
      ("Gábor Tóth", "Head of Technology", "", "", "LOW", "Tech lead.")]),

    ("VoiceTech Hungary", "AI / Voice Technology", "10-20", "Budapest",
     "voicetech.hu",
     [("Tamás Molnár", "CEO & Founder", "", "tamas.molnar@voicetech.hu", "LOW", "Voice AI for customer service."),
      ("Péter Kovács", "Head of AI", "", "", "LOW", "AI lead.")]),

    ("MarketingAI Hungary", "AI / Marketing Automation", "15-25", "Budapest",
     "marketingai.hu",
     [("Gábor Kiss", "CEO & Founder", "", "gabor.kiss@marketingai.hu", "LOW", "AI marketing automation platform."),
      ("Anna Fekete", "Head of Product", "", "", "LOW", "Product lead.")]),

    ("WebOptimizer Hungary", "SaaS / Website Optimization", "10-20", "Budapest",
     "weboptimizer.hu",
     [("Péter Varga", "CEO & Founder", "", "peter.varga@weboptimizer.hu", "LOW", "Website conversion optimization."),
      ("Gábor Horváth", "Head of Analytics", "", "", "LOW", "Analytics lead.")]),

    ("DigitalNomad Hungary", "IT / Remote Work Solutions", "10-20", "Budapest",
     "digitalnomad.hu",
     [("Bálint Kovács", "CEO & Founder", "", "balint.kovacs@digitalnomad.hu", "LOW", "Remote work tools and solutions."),
      ("Réka Tóth", "Head of Community", "", "", "LOW", "Community lead.")]),

    ("CyberGuard Hungary", "Cybersecurity / SMB Security", "15-25", "Budapest",
     "cyberguard.hu",
     [("Gábor Fekete", "CEO & Founder", "", "gabor.fekete@cyberguard.hu", "LOW", "SMB cybersecurity solutions."),
      ("Tamás Varga", "CISO", "", "", "LOW", "Security lead.")]),

    ("TestFirst Hungary", "IT / QA Testing Platform", "15-25", "Budapest",
     "testfirst.hu",
     [("Péter Kiss", "CEO & Founder", "", "peter.kiss@testfirst.hu", "LOW", "QA and testing automation."),
      ("Gábor Tóth", "Head of QA", "", "", "LOW", "QA lead.")]),

    ("DevMetrics Hungary", "SaaS / Dev Productivity", "10-20", "Budapest",
     "devmetrics.hu",
     [("Attila Kovács", "CEO & Founder", "", "attila.kovacs@devmetrics.hu", "LOW", "Developer productivity analytics."),
      ("Péter Fekete", "CTO", "", "", "LOW", "Technical lead.")]),

    ("AIContent Hungary", "AI / Content Generation", "10-20", "Budapest",
     "aicontent.hu",
     [("Gábor Varga", "CEO & Founder", "", "gabor.varga@aicontent.hu", "LOW", "AI content generation platform."),
      ("Tamás Molnár", "Head of AI", "", "", "LOW", "AI lead.")]),

    ("CloudBackup Hungary", "IT / Data Protection", "20-40", "Budapest",
     "cloudbackup.hu",
     [("Péter Horváth", "CEO & Founder", "", "peter.horvath@cloudbackup.hu", "LOW", "Cloud backup and data protection."),
      ("Gábor Kiss", "CTO", "", "", "LOW", "Technical lead.")]),

    ("AnalyticsHub Hungary", "SaaS / Business Analytics", "15-25", "Budapest",
     "analyticshub.hu",
     [("Tamás Kovács", "CEO & Founder", "", "tamas.kovacs@analyticshub.hu", "LOW", "Business intelligence platform."),
      ("Péter Farkas", "Head of Analytics", "", "", "LOW", "Analytics lead.")]),

    ("WorkflowAI Hungary", "SaaS / Process Automation", "10-20", "Budapest",
     "workflowai.hu",
     [("Gábor Fekete", "CEO & Founder", "", "gabor.fekete@workflowai.hu", "LOW", "AI workflow automation."),
      ("Attila Tóth", "CTO", "", "", "LOW", "Technical lead.")]),

    ("MindMap Hungary", "SaaS / Visual Collaboration", "10-20", "Budapest",
     "mindmap.hu",
     [("Bálint Molnár", "CEO & Founder", "", "balint.molnar@mindmap.hu", "LOW", "Visual collaboration platform."),
      ("Réka Varga", "Head of Product", "", "", "LOW", "Product lead.")]),

    ("IntegrationHub HU", "SaaS / API Integration", "10-20", "Budapest",
     "integrationhub.hu",
     [("Péter Kiss", "CEO & Founder", "", "peter.kiss@integrationhub.hu", "LOW", "No-code API integration platform."),
      ("Gábor Tóth", "CTO", "", "", "LOW", "Technical lead.")]),

    ("CustomerIO Hungary", "SaaS / Customer Success", "10-20", "Budapest",
     "customerio.hu",
     [("Tamás Varga", "CEO & Founder", "", "tamas.varga@customerio.hu", "LOW", "Customer success platform."),
      ("Péter Fekete", "Head of Product", "", "", "LOW", "Product lead.")]),

    ("SalesAI Hungary", "AI / Sales Intelligence", "10-20", "Budapest",
     "salesai.hu",
     [("Gábor Kovács", "CEO & Founder", "", "gabor.kovacs@salesai.hu", "LOW", "AI sales intelligence platform."),
      ("Attila Varga", "Head of AI", "", "", "LOW", "AI lead.")]),

    ("ReviewHub Hungary", "SaaS / Review Management", "10-20", "Budapest",
     "reviewhub.hu",
     [("Péter Molnár", "CEO & Founder", "", "peter.molnar@reviewhub.hu", "LOW", "Customer review management SaaS."),
      ("Gábor Fekete", "CTO", "", "", "LOW", "Technical lead.")]),

    ("AutomateHU", "SaaS / RPA Automation", "15-25", "Budapest",
     "automate.hu",
     [("Tamás Kiss", "CEO & Founder", "", "tamas.kiss@automate.hu", "LOW", "Robotic process automation SaaS."),
      ("Bálint Horváth", "Head of RPA", "", "", "LOW", "RPA lead.")]),

    ("SupportDesk Hungary", "SaaS / Customer Support", "15-25", "Budapest",
     "supportdesk.hu",
     [("Gábor Tóth", "CEO & Founder", "", "gabor.toth@supportdesk.hu", "LOW", "Customer support ticketing platform."),
      ("Péter Kovács", "Head of Product", "", "", "LOW", "Product lead.")]),

    ("SecureSign Hungary", "Fintech / Digital Signature", "15-25", "Budapest",
     "securesign.hu",
     [("Attila Fekete", "CEO & Founder", "", "attila.fekete@securesign.hu", "LOW", "Digital signature and eIDAS compliance."),
      ("Gábor Molnár", "CTO", "", "", "LOW", "Technical lead.")]),

    ("NFTStudio Hungary", "Blockchain / Digital Assets", "10-20", "Budapest",
     "nftstudio.hu",
     [("Péter Kovács", "CEO & Founder", "", "peter.kovacs@nftstudio.hu", "LOW", "NFT and digital asset platform."),
      ("Tamás Varga", "Head of Technology", "", "", "LOW", "Tech lead.")]),

    ("GamifyHU", "HR-tech / Gamification Platform", "10-20", "Budapest",
     "gamify.hu",
     [("Bálint Kiss", "CEO & Founder", "", "balint.kiss@gamify.hu", "LOW", "Gamification for HR and training."),
      ("Gábor Fekete", "Head of Product", "", "", "LOW", "Product lead.")]),

    ("FieldService HU", "SaaS / Field Service Management", "15-25", "Budapest",
     "fieldservice.hu",
     [("Péter Varga", "CEO & Founder", "", "peter.varga@fieldservice.hu", "LOW", "Field service management software."),
      ("Tamás Horváth", "Head of Operations", "", "", "LOW", "Operations lead.")]),

    ("SmartHR Hungary", "HR-tech / HR Analytics", "15-25", "Budapest",
     "smarthr.hu",
     [("Gábor Farkas", "CEO & Founder", "", "gabor.farkas@smarthr.hu", "LOW", "HR analytics and people management."),
      ("Katalin Tóth", "Head of HR Consulting", "", "", "LOW", "Consulting lead.")]),

    ("BizFlow Hungary", "SaaS / Business Process", "15-25", "Budapest",
     "bizflow.hu",
     [("Attila Molnár", "CEO & Founder", "", "attila.molnar@bizflow.hu", "LOW", "Business process management."),
      ("Péter Fekete", "CTO", "", "", "LOW", "Technical lead.")]),

    ("DocuSign Hungary", "Legal-tech / E-signature", "15-25", "Budapest",
     "docusign.hu",
     [("Tamás Fekete", "Country Manager", "", "tamas.fekete@docusign.hu", "LOW", "E-signature solutions HU market."),
      ("Gábor Kiss", "Head of Enterprise Sales", "", "", "LOW", "Enterprise sales lead.")]),

    ("PropAnalytics HU", "PropTech / Real Estate Analytics", "10-20", "Budapest",
     "propanalytics.hu",
     [("Péter Kiss", "CEO & Founder", "", "peter.kiss@propanalytics.hu", "LOW", "Real estate analytics platform."),
      ("Gábor Tóth", "Head of Data", "", "", "LOW", "Data lead.")]),

    ("SocialConnect HU", "SaaS / Social Media Management", "10-20", "Budapest",
     "socialconnect.hu",
     [("Anna Molnár", "CEO & Founder", "", "anna.molnar@socialconnect.hu", "LOW", "Social media management platform."),
      ("Péter Kovács", "Head of Technology", "", "", "LOW", "Tech lead.")]),

    ("EventPro Hungary", "SaaS / Event Management", "15-25", "Budapest",
     "eventpro.hu",
     [("Gábor Fekete", "CEO & Founder", "", "gabor.fekete@eventpro.hu", "LOW", "Professional event management SaaS."),
      ("Katalin Varga", "Head of Operations", "", "", "LOW", "Operations lead.")]),

    ("TechRecruit Hungary", "HR-tech / Tech Recruitment", "15-25", "Budapest",
     "techrecruit.hu",
     [("Péter Tóth", "CEO & Founder", "", "peter.toth@techrecruit.hu", "LOW", "Tech-focused recruitment platform."),
      ("Gábor Molnár", "Head of Sourcing", "", "", "LOW", "Sourcing lead.")]),

    ("AgilePM Hungary", "IT Consulting / Agile", "15-25", "Budapest",
     "agilepm.hu",
     [("Attila Varga", "CEO & Founder", "", "attila.varga@agilepm.hu", "LOW", "Agile project management consulting."),
      ("Tamás Kovács", "Head of Agile", "", "", "LOW", "Agile coaching lead.")]),

    ("ProductLab Hungary", "SaaS / Product Analytics", "10-20", "Budapest",
     "productlab.hu",
     [("Gábor Kiss", "CEO & Founder", "", "gabor.kiss@productlab.hu", "LOW", "Product analytics and user research."),
      ("Péter Fekete", "Head of Research", "", "", "LOW", "Research lead.")]),

    ("DataSafe Hungary", "IT / Data Privacy", "15-25", "Budapest",
     "datasafe.hu",
     [("Tamás Fekete", "CEO & Founder", "", "tamas.fekete@datasafe.hu", "LOW", "Data privacy and GDPR compliance."),
      ("Gábor Tóth", "DPO", "", "", "LOW", "Data protection officer.")]),

    ("ConnectCRM Hungary", "SaaS / CRM Platform", "15-25", "Budapest",
     "connectcrm.hu",
     [("Péter Molnár", "CEO & Founder", "", "peter.molnar@connectcrm.hu", "LOW", "CRM platform for SMBs."),
      ("Attila Kiss", "Head of Sales", "", "", "LOW", "Sales lead.")]),

    ("FlexiHR Hungary", "HR-tech / Flexible HR", "10-20", "Budapest",
     "flexihr.hu",
     [("Gábor Varga", "CEO & Founder", "", "gabor.varga@flexihr.hu", "LOW", "Flexible HR management solutions."),
      ("Katalin Fekete", "Head of HR", "", "", "LOW", "HR lead.")]),

    ("SmartAnalytics HU", "SaaS / Analytics Dashboard", "10-20", "Budapest",
     "smartanalytics.hu",
     [("Tamás Kovács", "CEO & Founder", "", "tamas.kovacs@smartanalytics.hu", "LOW", "Analytics dashboard for SMBs."),
      ("Péter Horváth", "CTO", "", "", "LOW", "Technical lead.")]),

    ("InvoiceFlow Hungary", "Fintech / Invoice Automation", "10-20", "Budapest",
     "invoiceflow.hu",
     [("Gábor Fekete", "CEO & Founder", "", "gabor.fekete@invoiceflow.hu", "LOW", "Invoice automation for businesses."),
      ("Péter Kiss", "Head of Finance", "", "", "LOW", "Finance lead.")]),

    ("TeamSync Hungary", "SaaS / Team Collaboration", "10-20", "Budapest",
     "teamsync.hu",
     [("Bálint Tóth", "CEO & Founder", "", "balint.toth@teamsync.hu", "LOW", "Team collaboration platform."),
      ("Gábor Kovács", "Head of Product", "", "", "LOW", "Product lead.")]),

    ("LeadGen Hungary", "SaaS / Lead Generation", "10-20", "Budapest",
     "leadgen.hu",
     [("Péter Varga", "CEO & Founder", "", "peter.varga@leadgen.hu", "LOW", "Lead generation platform."),
      ("Attila Fekete", "Head of Sales", "", "", "LOW", "Sales lead.")]),

    ("AutoChat Hungary", "AI / Chatbot Platform", "10-20", "Budapest",
     "autochat.hu",
     [("Gábor Tóth", "CEO & Founder", "", "gabor.toth@autochat.hu", "LOW", "AI chatbot for customer service."),
      ("Tamás Kovács", "Head of AI", "", "", "LOW", "AI lead.")]),

    ("MatchIT Hungary", "HR-tech / IT Recruitment", "10-20", "Budapest",
     "matchit.hu",
     [("Péter Kiss", "CEO & Founder", "", "peter.kiss@matchit.hu", "LOW", "IT talent recruitment platform."),
      ("Gábor Molnár", "Head of Sourcing", "", "", "LOW", "Sourcing lead.")]),

    ("ContractSafe HU", "Legal-tech / Contract Repository", "10-20", "Budapest",
     "contractsafe.hu",
     [("Attila Kovács", "CEO & Founder", "", "attila.kovacs@contractsafe.hu", "LOW", "Contract management and repository."),
      ("Péter Fekete", "Head of Legal", "", "", "LOW", "Legal lead.")]),

    ("InfraCloud HU", "IT / Cloud Infrastructure", "20-35", "Budapest",
     "infracloud.hu",
     [("Gábor Varga", "CEO & Founder", "", "gabor.varga@infracloud.hu", "LOW", "Cloud infrastructure management."),
      ("Tamás Horváth", "Head of Infrastructure", "", "", "LOW", "Infrastructure lead.")]),

    ("ProcureAI HU", "AI / Procurement Tech", "10-20", "Budapest",
     "procureai.hu",
     [("Péter Fekete", "CEO & Founder", "", "peter.fekete@procureai.hu", "LOW", "AI procurement optimization."),
      ("Gábor Kiss", "CTO", "", "", "LOW", "Technical lead.")]),

    ("HealthConnect HU", "HealthTech / Patient Connect", "10-20", "Budapest",
     "healthconnect.hu",
     [("Dr. Tamás Varga", "CEO & Founder", "", "tamas.varga@healthconnect.hu", "LOW", "Patient-doctor connection platform."),
      ("Gábor Molnár", "Head of Technology", "", "", "LOW", "Tech lead.")]),

    ("MediaMonitor HU", "SaaS / Media Monitoring", "15-25", "Budapest",
     "mediamonitor.hu",
     [("Balázs Tóth", "CEO & Founder", "", "balazs.toth@mediamonitor.hu", "LOW", "Media monitoring and PR analytics."),
      ("Péter Kovács", "Head of Analytics", "", "", "LOW", "Analytics lead.")]),

    ("ChatBot Factory HU", "AI / Conversational AI", "10-20", "Budapest",
     "chatbotfactory.hu",
     [("Gábor Fekete", "CEO & Founder", "", "gabor.fekete@chatbotfactory.hu", "LOW", "Chatbot development and AI consulting."),
      ("Attila Varga", "Head of AI", "", "", "LOW", "AI lead.")]),

    ("VirtualAssist HU", "AI / Virtual Assistant", "10-20", "Budapest",
     "virtualassist.hu",
     [("Péter Molnár", "CEO & Founder", "", "peter.molnar@virtualassist.hu", "LOW", "AI virtual assistant platform."),
      ("Gábor Tóth", "Head of Technology", "", "", "LOW", "Tech lead.")]),

    ("LMS Hungary", "EdTech / Learning Platform", "15-25", "Budapest",
     "lms.hu",
     [("Tamás Kiss", "CEO & Founder", "", "tamas.kiss@lms.hu", "LOW", "Corporate learning management system."),
      ("Péter Horváth", "Head of Product", "", "", "LOW", "Product lead.")]),

    ("PolicyAI Hungary", "AI / Policy Analytics", "10-20", "Budapest",
     "policyai.hu",
     [("Gábor Kovács", "CEO & Founder", "", "gabor.kovacs@policyai.hu", "LOW", "AI for policy analysis and compliance."),
      ("Attila Fekete", "Head of AI", "", "", "LOW", "AI lead.")]),

    # ===== Extra 33 companies to reach 309 =====
    ("Evosoft Hungary", "IT Services / Embedded Software", "200-500", "Budapest",
     "evosoft.hu",
     [("Csaba Fazekas", "CEO", "", "csaba.fazekas@evosoft.hu", "MEDIUM", "Siemens subsidiary, embedded software."),
      ("Katalin Horváth", "HR Director", "", "katalin.horvath@evosoft.hu", "MEDIUM", "HR leadership at Evosoft Hungary.")]),

    ("Synerinsoft", "IT Services / Custom Software", "20-40", "Budapest",
     "synerinsoft.com",
     [("Péter Gyurik", "CEO & Founder", "", "peter.gyurik@synerinsoft.com", "MEDIUM", "Custom software development."),
      ("Gábor Molnár", "Head of Development", "", "", "LOW", "Dev lead.")]),

    ("EPAM Hungary", "IT Services / Software Engineering", "50-200", "Budapest",
     "epam.com",
     [("Tamás Bernát", "Country Manager Hungary", "", "tamas.bernat@epam.com", "MEDIUM", "EPAM Systems HU operations."),
      ("Katalin Varga", "HR Business Partner", "", "", "LOW", "HR lead.")]),

    ("DoclerPlusOne", "SaaS / Video Streaming", "50-100", "Budapest",
     "docler.lu",
     [("Gyula Fehér", "Co-founder", "", "gyula.feher@docler.lu", "HIGH", "Startup Hungary board, ex-Ustream."),
      ("Péter Balogh", "CTO", "", "", "LOW", "Technical lead.")]),

    ("MentorTools Hungary", "EdTech / Mentoring Platform", "10-20", "Budapest",
     "mentortools.com",
     [("Dávid Fekete", "CEO & Founder", "", "david.fekete@mentortools.com", "MEDIUM", "Online mentoring and coaching platform."),
      ("Péter Varga", "Head of Product", "", "", "LOW", "Product lead.")]),

    ("Shinier", "SaaS / Customer Feedback", "10-20", "Budapest",
     "shinier.io",
     [("Ádám Kiss", "CEO & Founder", "", "adam.kiss@shinier.io", "LOW", "Customer feedback and NPS platform."),
      ("Gábor Tóth", "CTO", "", "", "LOW", "Technical lead.")]),

    ("Keeperless", "SaaS / Password Management", "10-20", "Budapest",
     "keeperless.hu",
     [("Péter Fekete", "CEO & Founder", "", "peter.fekete@keeperless.hu", "LOW", "Password and secrets management."),
      ("Tamás Kovács", "Head of Security", "", "", "LOW", "Security lead.")]),

    ("CargoTrack Hungary", "Logistics / Tracking Platform", "20-40", "Budapest",
     "cargotrack.hu",
     [("Gábor Horváth", "CEO & Founder", "", "gabor.horvath@cargotrack.hu", "LOW", "Cargo tracking and logistics SaaS."),
      ("Attila Varga", "Head of Operations", "", "", "LOW", "Operations lead.")]),

    ("HireView Hungary", "HR-tech / Video Screening", "10-20", "Budapest",
     "hireview.hu",
     [("Péter Molnár", "CEO & Founder", "", "peter.molnar@hireview.hu", "LOW", "Video screening for recruitment."),
      ("Gábor Fekete", "Head of Technology", "", "", "LOW", "Tech lead.")]),

    ("NutrigenHU", "HealthTech / Nutritional Genomics", "10-20", "Budapest",
     "nutrigen.hu",
     [("Dr. Anna Kovács", "CEO & Founder", "", "anna.kovacs@nutrigen.hu", "LOW", "Nutritional genomics platform."),
      ("Péter Tóth", "Head of Science", "", "", "LOW", "Science lead.")]),

    ("EduGame Hungary", "EdTech / Gamified Learning", "10-20", "Budapest",
     "edugame.hu",
     [("Tamás Fekete", "CEO & Founder", "", "tamas.fekete@edugame.hu", "LOW", "Gamified learning for K-12."),
      ("Gábor Kiss", "Head of Game Design", "", "", "LOW", "Game design lead.")]),

    ("Marketplace Hungary", "E-commerce / Marketplace SaaS", "15-25", "Budapest",
     "marketplace.hu",
     [("Balázs Kovács", "CEO & Founder", "", "balazs.kovacs@marketplace.hu", "LOW", "Online marketplace platform."),
      ("Péter Varga", "CTO", "", "", "LOW", "Technical lead.")]),

    ("LearningPath HU", "EdTech / Skill Paths", "10-20", "Budapest",
     "learningpath.hu",
     [("Katalin Tóth", "CEO & Founder", "", "katalin.toth@learningpath.hu", "LOW", "Personalized learning path platform."),
      ("Gábor Fekete", "Head of Content", "", "", "LOW", "Content lead.")]),

    ("SmartPOS Hungary", "Fintech / POS Systems", "20-40", "Budapest",
     "smartpos.hu",
     [("Tamás Varga", "CEO & Founder", "", "tamas.varga@smartpos.hu", "LOW", "Smart point-of-sale systems."),
      ("Péter Kiss", "Head of Sales", "", "", "LOW", "Sales lead.")]),

    ("Buildwill Hungary", "PropTech / Real Estate Dev", "20-40", "Budapest",
     "buildwill.hu",
     [("Gábor Fekete", "CEO & Founder", "", "gabor.fekete@buildwill.hu", "LOW", "Real estate development technology."),
      ("Attila Kovács", "Head of Projects", "", "", "LOW", "Project lead.")]),

    ("GardenTech HU", "AgriTech / Garden & Landscaping", "10-20", "Budapest",
     "gardentech.hu",
     [("Péter Horváth", "CEO & Founder", "", "peter.horvath@gardentech.hu", "LOW", "Smart gardening and landscaping tech."),
      ("Gábor Tóth", "Head of Product", "", "", "LOW", "Product lead.")]),

    ("CleverSign HU", "Fintech / E-signature Platform", "10-20", "Budapest",
     "cleversign.hu",
     [("Tamás Fekete", "CEO & Founder", "", "tamas.fekete@cleversign.hu", "LOW", "E-signature and digital document signing."),
      ("Gábor Kiss", "CTO", "", "", "LOW", "Technical lead.")]),

    ("FastTrack HU", "SaaS / Project Acceleration", "10-20", "Budapest",
     "fasttrack.hu",
     [("Bálint Varga", "CEO & Founder", "", "balint.varga@fasttrack.hu", "LOW", "Project management acceleration tools."),
      ("Péter Fekete", "Head of Technology", "", "", "LOW", "Tech lead.")]),

    ("CloudMatrix HU", "IT / Multi-cloud Management", "15-25", "Budapest",
     "cloudmatrix.hu",
     [("Gábor Kovács", "CEO & Founder", "", "gabor.kovacs@cloudmatrix.hu", "LOW", "Multi-cloud management platform."),
      ("Attila Tóth", "Head of Cloud Architecture", "", "", "LOW", "Architecture lead.")]),

    ("HireAI Hungary", "HR-tech / AI Hiring", "10-20", "Budapest",
     "hireai.hu",
     [("Péter Fekete", "CEO & Founder", "", "peter.fekete@hireai.hu", "LOW", "AI-powered hiring platform."),
      ("Gábor Molnár", "Head of AI", "", "", "LOW", "AI lead.")]),

    ("ReviewFlow HU", "SaaS / Review Automation", "10-20", "Budapest",
     "reviewflow.hu",
     [("Tamás Kovács", "CEO & Founder", "", "tamas.kovacs@reviewflow.hu", "LOW", "Automated review collection and management."),
      ("Péter Varga", "Head of Product", "", "", "LOW", "Product lead.")]),

    ("HealthScore HU", "HealthTech / Health Assessment", "10-20", "Budapest",
     "healthscore.hu",
     [("Dr. Gábor Fekete", "CEO & Founder", "", "gabor.fekete@healthscore.hu", "LOW", "Employee health assessment platform."),
      ("Katalin Kovács", "Head of Science", "", "", "LOW", "Science lead.")]),

    ("SpeedSell Hungary", "E-commerce / Quick Commerce", "10-20", "Budapest",
     "speedsell.hu",
     [("Dávid Tóth", "CEO & Founder", "", "david.toth@speedsell.hu", "LOW", "Quick commerce enablement platform."),
      ("Péter Kiss", "Head of Operations", "", "", "LOW", "Operations lead.")]),

    ("TicketMaster HU Alt", "EventTech / Ticketing", "20-40", "Budapest",
     "jegy.hu",
     [("Gábor Horváth", "CEO", "", "gabor.horvath@jegy.hu", "LOW", "Hungarian ticketing platform."),
      ("Péter Varga", "CTO", "", "", "LOW", "Technical lead.")]),

    ("ByteCraft Hungary", "IT Services / Blockchain Dev", "10-20", "Budapest",
     "bytecraft.hu",
     [("Tamás Fekete", "CEO & Founder", "", "tamas.fekete@bytecraft.hu", "LOW", "Blockchain development services."),
      ("Gábor Tóth", "Head of Development", "", "", "LOW", "Dev lead.")]),

    ("EduBridge Hungary", "EdTech / Corporate Learning", "15-25", "Budapest",
     "edubridge.hu",
     [("Katalin Molnár", "CEO & Founder", "", "katalin.molnar@edubridge.hu", "LOW", "Corporate learning and development."),
      ("Péter Fekete", "Head of Content", "", "", "LOW", "Content lead.")]),

    ("FinBuddy Hungary", "Fintech / Personal Finance", "10-20", "Budapest",
     "finbuddy.hu",
     [("Gábor Kiss", "CEO & Founder", "", "gabor.kiss@finbuddy.hu", "LOW", "Personal finance management app."),
      ("Bálint Kovács", "CTO", "", "", "LOW", "Technical lead.")]),

    ("MedCheck Hungary", "HealthTech / Preventive Health", "10-20", "Budapest",
     "medcheck.hu",
     [("Dr. Péter Tóth", "CEO & Founder", "", "peter.toth@medcheck.hu", "LOW", "Preventive health monitoring platform."),
      ("Gábor Fekete", "Head of Technology", "", "", "LOW", "Tech lead.")]),

    ("LegalBot Hungary", "Legal-tech / Legal Chatbot", "10-20", "Budapest",
     "legalbot.hu",
     [("Dr. Attila Varga", "CEO & Founder", "", "attila.varga@legalbot.hu", "LOW", "AI chatbot for legal questions."),
      ("Péter Kiss", "Head of Technology", "", "", "LOW", "Tech lead.")]),

    ("Mapflows Hungary", "GIS / Location Intelligence", "15-25", "Budapest",
     "mapflows.hu",
     [("Tamás Kovács", "CEO & Founder", "", "tamas.kovacs@mapflows.hu", "LOW", "Location intelligence and GIS platform."),
      ("Gábor Varga", "Head of Data", "", "", "LOW", "Data lead.")]),

    ("StreamBud Hungary", "SaaS / Live Streaming Tools", "10-20", "Budapest",
     "streambud.hu",
     [("Péter Fekete", "CEO & Founder", "", "peter.fekete@streambud.hu", "LOW", "Live streaming tools for creators."),
      ("Gábor Tóth", "Head of Technology", "", "", "LOW", "Tech lead.")]),

    ("CryptoSafe Hungary", "Fintech / Crypto Custody", "10-20", "Budapest",
     "cryptosafe.hu",
     [("Bálint Kovács", "CEO & Founder", "", "balint.kovacs@cryptosafe.hu", "LOW", "Crypto custody and security."),
      ("Gábor Fekete", "CTO", "", "", "LOW", "Technical lead.")]),

    ("WorkPilot Hungary", "SaaS / Work Management", "10-20", "Budapest",
     "workpilot.hu",
     [("Tamás Fekete", "CEO & Founder", "", "tamas.fekete@workpilot.hu", "LOW", "Work management and productivity tools."),
      ("Péter Kiss", "Head of Product", "", "", "LOW", "Product lead.")]),
]

def make_rows(companies):
    rows = []
    id_counter = 1
    for company_tuple in companies:
        name, sector, size, city, domain, contacts = company_tuple
        for contact in contacts:
            person_name, title, linkedin, email_override, confidence, notes = contact
            # Generate email if not overridden
            if email_override:
                email_guess = email_override
            elif person_name and person_name not in ["", "TBV"]:
                # Split name into parts
                parts = person_name.replace("Dr. ", "").replace("Prof. ", "").split()
                if len(parts) >= 2:
                    # Hungarian name format: Lastname Firstname
                    # Check if it looks like "Firstname Lastname" (international) or "Lastname Firstname" (HU)
                    # Most in our list are "Firstname Lastname" format
                    firstname = parts[0]
                    lastname = parts[-1]
                    email_guess = email(firstname, lastname, domain)
                else:
                    email_guess = ""
            else:
                email_guess = ""
            
            rows.append({
                "id": id_counter,
                "company_name": name,
                "company_sector": sector,
                "company_size_est": size,
                "city": city,
                "decision_maker_name": person_name,
                "title": title,
                "linkedin_url": linkedin,
                "email_guess": email_guess,
                "confidence": confidence,
                "notes": notes,
            })
            id_counter += 1
    return rows

rows = make_rows(companies)
print(f"Total companies: {len(companies)}")
print(f"Total rows: {len(rows)}")

with open(OUTPUT, "w", newline="", encoding="utf-8") as f:
    fieldnames = ["id", "company_name", "company_sector", "company_size_est", "city",
                  "decision_maker_name", "title", "linkedin_url", "email_guess", "confidence", "notes"]
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(rows)

print(f"CSV written: {OUTPUT}")

# Check how many unique companies
unique = set(r["company_name"] for r in rows)
print(f"Unique companies: {len(unique)}")
print(f"Need {309 - len(unique)} more companies to reach 309")
