"""Builds the Printable Wedding Planner (US Letter) as HTML, then prints it to PDF with headless Chrome.

Run:  python build.py
Output: dist/printable-wedding-planner.pdf
"""
import os, subprocess, html

HERE = os.path.dirname(os.path.abspath(__file__))
DIST = os.path.join(HERE, 'dist')
os.makedirs(DIST, exist_ok=True)
BRAND = 'Wedding Planning Checklists'
SITE = 'weddingplanningchecklists.org'

pages = []
toc = []  # (title, page number)


def e(s):
    return html.escape(s)


def page(kicker, title, body, intro='', toc_title=None, cls=''):
    n = len(pages) + 1
    if toc_title:
        toc.append((toc_title, n))
    head = ''
    if title:
        head = f'''<div class="ph"><div class="kicker">{e(kicker)}</div><h1>{e(title)}</h1>
        {f'<p class="intro">{e(intro)}</p>' if intro else ''}</div>'''
    pages.append(f'''<section class="page {cls}">{head}<div class="body">{body}</div>
    <footer><span>{BRAND}</span><span class="pn">{n}</span><span>{SITE}</span></footer></section>''')


def lines(n, label=''):
    return ''.join(f'<div class="line">{e(label) if i == 0 and label else ""}</div>' for i in range(n))


def field(label, wide=False):
    return f'<div class="field{" wide" if wide else ""}"><span>{e(label)}</span><i></i></div>'


def checklist(items, cols=1):
    lis = ''.join(f'<li><b class="box"></b><span>{e(t)}</span></li>' for t in items)
    return f'<ul class="check cols{cols}">{lis}</ul>'


def table(headers, rows=0, data=None, widths=None, cls=''):
    ws = widths or [''] * len(headers)
    th = ''.join(f'<th style="width:{w}">{e(h)}</th>' for h, w in zip(headers, ws))
    body = ''
    if data:
        for r in data:
            body += '<tr>' + ''.join(f'<td>{e(c)}</td>' for c in r) + '</tr>'
    for _ in range(rows):
        body += '<tr>' + '<td></td>' * len(headers) + '</tr>'
    return f'<table class="grid {cls}"><thead><tr>{th}</tr></thead><tbody>{body}</tbody></table>'


def box(title, inner, cls=''):
    return f'<div class="card {cls}"><h3>{e(title)}</h3>{inner}</div>'


# ---------------------------------------------------------------- 1. Cover
pages.append(f'''<section class="page cover">
  <div class="cover-frame">
    <div class="cover-top">{BRAND}</div>
    <div class="cover-mid">
      <div class="ornament"><i></i></div>
      <h1>The Wedding<br/>Planner</h1>
      <p class="sub">Your complete printable planner, from engagement to &ldquo;I do&rdquo;</p>
      <div class="rule"></div>
      <div class="names"><span>&amp;</span></div>
      <div class="date-line">Wedding date</div>
    </div>
    <div class="cover-bottom">Budget &middot; Timeline &middot; Vendors &middot; Guests &middot; Wedding Day</div>
  </div>
</section>''')

# ---------------------------------------------------------------- 2. Welcome + contents (contents filled at the end)
pages.append('__TOC__')

# ---------------------------------------------------------------- Our wedding at a glance
page('Getting started', 'Our Wedding at a Glance', f'''
<div class="two">
  <div>{field('Couple')}{field('Wedding date')}{field('Ceremony time')}{field('Ceremony venue')}{field('Reception venue')}{field('Officiant')}</div>
  <div>{field('Total budget')}{field('Guest count goal')}{field('Wedding style')}{field('Colour palette')}{field('Planner / coordinator')}{field('Wedding website')}</div>
</div>
<div class="two">
  {box('Our three must-haves', lines(4))}
  {box('Nice to have, happy to skip', lines(4))}
</div>
{box('Three words that describe our wedding', lines(2))}
{box('Who is helping and how', lines(5))}
''', 'Fill this page in first. Every other decision in this planner follows from it.', toc_title='Our Wedding at a Glance')

page('Getting started', 'Our Vision', f'''
<div class="two">
  {box('Season, setting and mood', lines(6))}
  {box('Colours, flowers and textures', lines(6))}
</div>
<div class="swatches">{''.join('<div class="sw"><i></i><span>Colour</span></div>' for _ in range(6))}</div>
<div class="two">
  {box('Food and drink we love', lines(5))}
  {box('Music and moments we want', lines(5))}
</div>
{box('Inspiration notes (paste or sketch here)', '<div class="blank" style="height:2.1in"></div>')}
''', 'Capture the look and feel before you meet vendors, so every choice points the same way.')

# ---------------------------------------------------------------- Budget
BUDGET = [
    ('Venue & catering', '40-50%'), ('Photography & video', '10-15%'), ('Attire & beauty', '8-10%'),
    ('Flowers & decor', '8-10%'), ('Music & entertainment', '5-8%'), ('Cake & desserts', '1-2%'),
    ('Stationery & postage', '2-3%'), ('Rings', '2-5%'), ('Officiant & licence', '1-2%'),
    ('Transport', '1-2%'), ('Favours & gifts', '1-2%'), ('Contingency buffer', '5-10%'),
]
page('Budget', 'Budget Planner', f'''
<div class="three">{field('Total budget')}{field('Our savings')}{field('Family contributions')}</div>
{table(['Category', 'Typical share', 'Our %', 'Planned', 'Actual', 'Difference'], data=[(c, s, '', '', '', '') for c, s in BUDGET], widths=['30%', '14%', '10%', '15%', '15%', '16%'])}
<table class="grid total"><tr><td style="width:54%">Total</td><td style="width:15%"></td><td style="width:15%"></td><td></td></tr></table>
<div class="two">{box('Where we could save', lines(4))}{box('Where we will spend more', lines(4))}</div>
<p class="tip">Typical shares are a starting point, not a rule. Move money towards your three must-haves and keep the buffer untouched until the final month.</p>
''', 'Set the total first, then split it by category before you speak to vendors.', toc_title='Budget Planner')

page('Budget', 'Expense Tracker', table(['Item', 'Vendor', 'Estimate', 'Actual', 'Paid', 'Due'], rows=24, widths=['28%', '22%', '13%', '13%', '12%', '12%']),
     'Log each quote as an estimate, then replace it with the real figure once the contract is signed.')

page('Budget', 'Payment Log', table(['Date', 'Vendor', 'What for', 'Amount', 'Method', 'Balance left'], rows=24, widths=['12%', '22%', '24%', '13%', '13%', '16%']),
     'Write every deposit and payment down the day you make it.', toc_title='Payment Log')

page('Budget', 'Hidden Costs Checklist', checklist([
    'Service charges on catering and venue (often 18-24%)', 'Sales tax on venue, catering and rentals',
    'Delivery, setup and collection fees for rentals', 'Delivery and setup for flowers and cake',
    'Cake-cutting or corkage fees', 'Overtime for venue, photographer, DJ or band',
    'Meals for vendors who work through dinner', 'Dress and suit alterations', 'Steaming and pressing',
    'Hair and makeup trials', 'Postage for invitations and RSVP cards', 'Marriage licence fee',
    'Tips and gratuities for vendors', 'Guest transport or parking attendants', 'Event insurance',
    'Permits for outdoor or private venues', 'Welcome bags and hotel delivery fees', 'Emergency kit supplies',
    'Thank-you cards and postage', 'Last-minute rentals and replacements',
]) + box('Notes', lines(5)), 'Ask about each of these on every vendor call, then add them to your budget before you sign.')

# ---------------------------------------------------------------- Timeline checklists
TL = [
    ('12 to 10 Months Before', 'Lay the foundations and book the vendors who sell out first.', [
        'Agree on wedding size, style and season', 'Set the total budget and who is contributing', 'Draft the guest list and estimate numbers',
        'Choose two or three possible dates', 'Decide on a planner, coordinator or DIY', 'Tour venues at your ceremony time of day',
        'Sign the venue contract and pay the deposit', 'Book the photographer', 'Book the videographer (optional)',
        'Start a wedding folder for quotes and contracts', 'Consider wedding insurance', 'Book an engagement shoot (optional)']),
    ('9 to 7 Months Before', 'Book your core vendors and start on attire.', [
        'Book caterer and bar service', 'Book band or DJ', 'Book ceremony musicians', 'Confirm your officiant',
        'Choose your wedding party', 'Start shopping for the wedding dress or outfit', 'Book hair and makeup artists',
        'Create a wedding website', 'Collect guest addresses', 'Start a gift registry (optional)']),
    ('6 to 4 Months Before', 'Guests, design and the details that bring it together.', [
        'Send save-the-dates', 'Reserve hotel room blocks', 'Book the florist and agree on a palette', 'Choose wedding party attire',
        'Taste and order the cake', 'Order invitations and day-of stationery', 'Book rentals, lighting and transport',
        'Buy wedding rings', 'Plan the rehearsal dinner', 'Book the honeymoon', 'Buy shoes and accessories']),
    ('3 to 2 Months Before', 'Invitations, trials, paperwork and the menu.', [
        'Mail invitations 8-10 weeks before', 'Schedule hair, makeup and nail trials', 'Hold the menu tasting and confirm the menu',
        'Plan the ceremony with your officiant', 'Write your vows', 'Book the marriage licence appointment', 'First dress or suit fitting',
        'Buy gifts for the wedding party and parents', 'Plan favours and welcome bags', 'Draft the day-of timeline']),
    ('1 Month Before', 'Confirm everything in writing.', [
        'Follow up on missing RSVPs', 'Finalise the seating chart', 'Print escort cards and place cards', 'Final dress or suit fitting',
        'Give final headcount to caterer and venue', 'Confirm arrival times with every vendor', 'Share the timeline with the wedding party',
        'Make final payments', 'Prepare tip envelopes', 'Break in your wedding shoes', 'Pack the emergency kit']),
    ('Final Week & the Day Before', 'Hand over, rest, and enjoy it.', [
        'Send the final timeline to all vendors', 'Pick up attire and rings', 'Deliver decor, signage and favours to the venue',
        'Confirm transport for the day', 'Manicure and final beauty appointments', 'Hold the rehearsal', 'Give rings and licence to the right people',
        'Hand tip envelopes to your coordinator', 'Pack an overnight bag', 'Charge phones and cameras', 'Eat well, drink water, sleep early']),
]
for i, (t, intro, items) in enumerate(TL):
    page('Planning timeline', t, f'''<div class="tl-grid"><div>{checklist(items)}</div>
    <div>{box('Booked & done', lines(7))}{box('Notes', lines(6))}</div></div>
    {box('Appointments in this period', table(['Date', 'Time', 'Appointment', 'Where'], rows=5, widths=['16%', '12%', '42%', '30%'], cls='inner'))}''', intro, toc_title='Planning Timeline' if i == 0 else None)

# ---------------------------------------------------------------- Vendors
page('Vendors', 'Vendor Booking Order', table(['#', 'Vendor', 'Book by', 'Booked', 'Deposit', 'Contract'], data=[
    ('1', 'Venue', '12-18 months', '', '', ''), ('2', 'Planner / coordinator', '12-15 months', '', '', ''), ('3', 'Photographer', '10-14 months', '', '', ''),
    ('4', 'Videographer', '10-12 months', '', '', ''), ('5', 'Caterer', '9-12 months', '', '', ''), ('6', 'Band or DJ', '9-12 months', '', '', ''),
    ('7', 'Officiant', '9-12 months', '', '', ''), ('8', 'Florist', '6-9 months', '', '', ''), ('9', 'Hair & makeup', '6-9 months', '', '', ''),
    ('10', 'Cake baker', '4-6 months', '', '', ''), ('11', 'Stationery', '4-6 months', '', '', ''), ('12', 'Rentals & lighting', '4-6 months', '', '', ''),
    ('13', 'Transport', '3-4 months', '', '', '')], widths=['6%', '30%', '20%', '14%', '15%', '15%']) +
    box('Before you sign any contract, check', checklist(['Date, times and address', 'Exact services and quantities', 'Total price incl. tax and fees',
        'Deposit and payment schedule', 'Cancellation and rescheduling terms', 'Overtime rates', 'Meal, power and parking needs', 'Name of your contact on the day'], cols=2)),
    'Vendors who can only work one wedding a day go first.', toc_title='Vendors')

VEND = ['Venue', 'Planner / coordinator', 'Photographer', 'Videographer', 'Caterer', 'Band / DJ', 'Officiant', 'Florist', 'Hair & makeup', 'Cake baker']
for k in range(0, len(VEND), 5):
    cards = ''.join(f'''<div class="vcard"><h3>{e(v)}</h3><div class="vgrid">{field('Company')}{field('Contact')}{field('Phone')}{field('Email')}
    {field('Total cost')}{field('Deposit / due')}{field('Arrival time')}{field('Notes')}</div></div>''' for v in VEND[k:k + 5])
    page('Vendors', 'Vendor Contacts', cards, '' if k else 'Keep every vendor in one place, and give a copy to your coordinator.')

page('Vendors', 'Venue Comparison', table(['', 'Venue A', 'Venue B', 'Venue C'], data=[(r, '', '', '') for r in [
    'Name', 'Date available?', 'Rental / minimum spend', 'Catering per guest', 'Service charge & tax', 'Rentals not included',
    'Required extras', 'Seated capacity', 'Rain plan', 'Parking & access', 'Vendor rules', 'Curfew / end time', 'Estimated total', 'Our rating']],
    widths=['28%', '24%', '24%', '24%'], cls='tall'), 'Fill this in on each tour. The cheapest headline price is rarely the cheapest total.')

page('Vendors', 'Venue Tour Questions', checklist([
    'Is our date available? What are peak and off-peak rates?', 'What is the seated capacity, and the capacity for a standing reception?',
    'What is included: tables, chairs, linens, glassware, lighting, sound?', 'Which vendors are required, preferred or not allowed?',
    'Can we bring our own caterer, bar or decorator?', 'What is the rain plan, and who decides when to use it?', 'Are there noise limits or a music curfew?',
    'What time can vendors arrive, and when must everything be cleared?', 'Is there parking, step-free access and enough restrooms?',
    'Will other events happen on the same day?', 'Will we have a dedicated coordinator on the day?', 'What are the deposit, payment and cancellation terms?',
    'What insurance do you require?', 'Where are the best spots for photos at our ceremony time?']) + box('Notes from our visits', lines(7)),
    'Take this page to every venue visit.')

page('Vendors', 'Vendor Comparison', table(['', 'Option A', 'Option B', 'Option C'], data=[(r, '', '', '') for r in [
    'Vendor type', 'Company', 'Available on our date?', 'Package / hours', 'What is included', 'Extra fees', 'Total price', 'Deposit & terms',
    'Reviews / references', 'Response speed', 'How they made us feel', 'Decision']], widths=['28%', '24%', '24%', '24%'], cls='tall'),
    'Use one sheet per vendor type: photographer, caterer, florist, DJ or band.')

# ---------------------------------------------------------------- Guests
for g in range(5):
    page('Guests', 'Guest List', table(['#', 'Name(s)', 'Address / contact', 'List', 'RSVP', 'Meal', 'Table'],
         data=[(str(g * 26 + i + 1), '', '', '', '', '', '') for i in range(26)], widths=['5%', '27%', '32%', '7%', '9%', '11%', '9%']),
         'Mark the list as A or B, and update the RSVP column the day each reply arrives.' if g == 0 else '', toc_title='Guest List' if g == 0 else None)

page('Guests', 'RSVP & Meal Summary', f'''
<div class="stats">{''.join(f'<div class="stat"><i></i><span>{e(s)}</span></div>' for s in ['Invited', 'Attending', 'Declined', 'Awaiting reply', 'Adults', 'Children'])}</div>
{table(['Meal / dietary need', 'Count', 'Guest names & tables'], data=[(m, '', '') for m in ['Meal option 1', 'Meal option 2', 'Meal option 3', 'Vegetarian', 'Vegan',
    'Gluten-free', 'Halal', 'Kosher', 'Nut allergy', 'Other allergy', "Children's meal"]], widths=['30%', '12%', '58%'])}
{box('Guests needing accessible seating or extra help', lines(4))}''', 'Send this summary to your caterer with the final headcount.')

tables = ''.join(f'<div class="tbl"><div class="circle"><span>Table {i + 1}</span></div>{lines(5)}</div>' for i in range(16))
page('Guests', 'Seating Chart Planner', f'<div class="tables">{tables}</div>', 'Start when about 80% of replies are in. Seat family and fixed tables first.', toc_title='Seating Chart')

# ---------------------------------------------------------------- People & attire
page('People', 'Wedding Party & Key People', table(['Role', 'Name', 'Phone', 'Responsibilities on the day'], data=[(r, '', '', '') for r in [
    'Maid / matron of honour', 'Best man', 'Bridesmaid', 'Bridesmaid', 'Bridesmaid', 'Groomsman', 'Groomsman', 'Groomsman', 'Flower girl / ring bearer',
    'Parent', 'Parent', 'Parent', 'Parent', 'Reader', 'Usher', 'Day-of timekeeper', 'Emergency kit holder', 'Gift & card keeper']],
    widths=['24%', '24%', '18%', '34%']), 'Give every helper one clear job and write it down.')

page('Attire & beauty', 'Attire & Beauty Planner', f'''
<div class="two">{box('Wedding outfit', field('Store / designer') + field('Order date') + field('Arrival date') + field('Price') + field('Alterations by'))}
{box('Partner outfit', field('Store / designer') + field('Order date') + field('Pick-up date') + field('Price') + field('Alterations by'))}</div>
{table(['Appointment', 'Date', 'Time', 'Where', 'Done'], data=[(a, '', '', '', '') for a in ['First fitting', 'Second fitting', 'Final fitting', 'Hair trial',
    'Makeup trial', 'Nail trial', 'Wedding party fitting', 'Grooming appointment', 'Final pick-up']], widths=['30%', '15%', '12%', '31%', '12%'])}
{box('Accessories checklist', checklist(['Veil or headpiece', 'Jewellery', 'Shoes', 'Undergarments', 'Cufflinks / tie', 'Wrap or jacket', 'Second outfit', 'Something old, new, borrowed, blue'], cols=2))}''',
     'Order early. Made-to-order outfits plus alterations can take six months or more.', toc_title='Attire & Beauty')

# ---------------------------------------------------------------- Ceremony & reception
page('Wedding day', 'Ceremony Planner', f'''
<div class="two">{field('Officiant')}{field('Ceremony start')}</div>
{table(['Moment', 'Music / reading', 'Who'], data=[(m, '', '') for m in ['Guest arrival', 'Processional: wedding party', 'Processional: couple', 'Welcome',
    'Reading 1', 'Reading 2', 'Vows', 'Ring exchange', 'Cultural or unity ritual', 'Pronouncement & kiss', 'Signing', 'Recessional']], widths=['30%', '40%', '30%'])}
<div class="two">{box('Our vows: notes', lines(6))}{box('Ceremony details', checklist(['Rings with the right person', 'Marriage licence & pen', 'Witnesses confirmed', 'Microphone tested', 'Reserved seating signs', 'Exit petals or confetti']))}</div>''',
     'Plan the order with your officiant and share it with your musicians.', toc_title='Ceremony & Reception')

page('Wedding day', 'Reception Run of Show', table(['Time', 'Moment', 'Song / notes', 'Who is involved'], data=[('', m, '', '') for m in [
    'Cocktail hour begins', 'Guests seated', 'Grand entrance', 'First dance', 'Welcome speech', 'Dinner service', 'Toasts & speeches',
    'Parent dances', 'Cake cutting', 'Open dancing', 'Bouquet / garter (optional)', 'Late-night snack', 'Last dance', 'Send-off']],
    widths=['12%', '30%', '33%', '25%']) + box('Speakers and order', lines(4)), 'Keep speeches to three to five minutes each.')

page('Wedding day', 'Music Lists', f'''<div class="two">{box('Must-play songs', table(['Song', 'Artist'], rows=16, widths=['55%', '45%'], cls='inner'))}
{box('Do-not-play songs', table(['Song', 'Artist'], rows=16, widths=['55%', '45%'], cls='inner'))}</div>
<div class="two">{box('Entrance & first dance', lines(3))}{box('Last song & send-off', lines(3))}</div>''', 'Give both lists to your DJ or band at least four weeks before.')

page('Wedding day', 'Photo Shot List', f'''<div class="two">{box('Must-have moments', checklist(['Getting ready details', 'Dress / outfit reveal', 'First look (optional)', 'Walking down the aisle',
    'Ring exchange & first kiss', 'Signing', 'Couple portraits', 'Wedding party', 'Grand entrance', 'First dance', 'Toasts', 'Cake cutting', 'Dance floor', 'Send-off']))}
{box('Family groups (largest first)', lines(16))}</div>{box('Family photo helper (knows everyone)', field('Name') + field('Phone'))}''',
     'Give this list to your photographer, and ask one relative to gather each group.')

hours = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00']
page('Wedding day', 'Wedding Day Timeline', table(['Time', 'What happens', 'Where', 'Who'], data=[(h, '', '', '') for h in hours], widths=['12%', '44%', '20%', '24%'], cls='tall'),
     'Start with the ceremony time, work backwards for the morning and forwards for the evening. Add 10-15 minute buffers.', toc_title='Wedding Day')

page('Wedding day', 'Day-Of Contacts', table(['Who', 'Name', 'Phone', 'Arrival'], data=[(r, '', '', '') for r in [
    'Coordinator', 'Venue manager', 'Photographer', 'Videographer', 'Caterer', 'DJ / band', 'Florist', 'Hair & makeup', 'Officiant', 'Transport',
    'Cake', 'Rentals', 'Timekeeper', 'Emergency contact']], widths=['26%', '28%', '26%', '20%']) + box('Tip envelopes', table(['Vendor', 'Amount', 'Given by'], rows=6, widths=['40%', '25%', '35%'], cls='inner')),
     'Print two copies: one for your coordinator, one for a trusted friend.')

page('Wedding day', 'Emergency Kit Checklist', f'''<div class="two">
{box('Fixes', checklist(['Safety pins', 'Fashion tape', 'Mini sewing kit', 'Small scissors', 'Stain remover pen', 'Lint roller', 'Clear nail polish', 'Spare buttons', 'Gel pads & blister plasters']))}
{box('Beauty', checklist(['Bobby pins & hair ties', 'Hairspray', 'Comb', 'Blotting papers', 'Powder & lipstick', 'Makeup wipes', 'Deodorant', 'Perfume', 'Eye drops']))}</div>
<div class="two">{box('Health & comfort', checklist(['Pain relief', 'Antacids', 'Personal medicines', 'Tissues', 'Hand sanitiser', 'Mints', 'Sunscreen / repellent', 'Water & snacks']))}
{box('Practical', checklist(['Phone charger & power bank', 'Printed timeline', 'Vendor contact sheet', 'Cash in small notes', 'Pen', 'Umbrella', 'Flat shoes', 'Wrap or shawl']))}</div>''',
     'Pack it three to five days before, and give it to someone who will stay close all day.')

week = ''.join(f'<div class="day"><h3>{d}</h3>{lines(6)}</div>' for d in ['7 days before', '6 days before', '5 days before', '4 days before', '3 days before', '2 days before', 'The day before', 'Wedding day morning'])
page('Wedding day', 'Final Week Schedule', f'<div class="week">{week}</div>', 'Confirm, hand over and rest. No new decisions this week.')

# ---------------------------------------------------------------- Monthly calendars
cells = ''.join('<div class="cell"></div>' for _ in range(35))
dows = ''.join(f'<div class="dow">{d}</div>' for d in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
for m in range(12):
    page('Monthly planner', '', f'''<div class="cal-head"><div><div class="kicker">Monthly planner</div><div class="month-line">Month</div></div>
    <div class="cal-goals">{box('This month we will', lines(3))}</div></div>
    <div class="cal">{dows}{cells}</div>{box('Payments due this month', lines(2))}''', toc_title='Monthly Calendars' if m == 0 else None, cls='calpage')

# ---------------------------------------------------------------- Gifts & notes
for g in range(2):
    page('After the wedding', 'Gift & Thank-You Tracker', table(['From', 'Gift', 'Received', 'Thank-you sent'], rows=24, widths=['32%', '36%', '14%', '18%']),
         'Send thank-you notes within two to three months.' if g == 0 else '', toc_title='Gifts & Thank-Yous' if g == 0 else None)
for g in range(2):
    page('Notes', 'Notes', '<div class="dots"></div>', toc_title='Notes' if g == 0 else None)

# ---------------------------------------------------------------- Back page
pages.append(f'''<section class="page cover back"><div class="cover-frame"><div class="cover-mid">
<div class="ornament"><i></i></div><h1 style="font-size:34pt">Congratulations</h1>
<p class="sub">We hope this planner keeps you calm, organised and excited for the big day.</p><div class="rule"></div>
<p class="small">Free planning tools to use alongside this planner:<br/>Budget Calculator &middot; Guest List Manager &middot; Wedding Checklist Generator<br/>Planning Calendar &middot; Wedding Countdown &middot; Planning Dashboard</p>
<p class="url">{SITE}</p></div>
<div class="cover-bottom">&copy; 2026 {BRAND}. For personal, non-commercial use only. Please do not resell or redistribute.</div></div></section>''')

# ---------------------------------------------------------------- Contents page
toc_html = ''.join(f'<li><span>{e(t)}</span><i></i><b>{n}</b></li>' for t, n in toc)
pages[1] = f'''<section class="page"><div class="ph"><div class="kicker">Welcome</div><h1>How to Use This Planner</h1></div><div class="body">
<div class="two"><div>
<p class="lead">This planner holds every part of your wedding in one place: the money, the dates, the people and the day itself.</p>
<ol class="steps"><li><b>Start with &ldquo;Our Wedding at a Glance&rdquo;.</b> Budget, guest count and date shape everything else.</li>
<li><b>Split your budget</b> before you talk to vendors, and log every payment.</li>
<li><b>Work through the timeline</b> in order. Book the vendors who sell out first.</li>
<li><b>Review once a week.</b> Fifteen minutes on the same day each week keeps you on track.</li>
<li><b>Hand pages to helpers.</b> The day-of pages are made to be copied and shared.</li></ol>
<p class="tip">Print on US Letter or A4 (choose &ldquo;Fit to page&rdquo;). Print extra copies of any page you need more of, such as the guest list or monthly calendar.</p>
</div><div class="toc"><h3>Contents</h3><ul>{toc_html}</ul></div></div>
<div class="card"><h3>Our key dates</h3><div class="two">{field('Engagement')}{field('Venue booked')}{field('Save-the-dates sent')}{field('Invitations sent')}{field('RSVP deadline')}{field('Final headcount due')}{field('Marriage licence')}{field('Wedding day')}</div></div></div>
<footer><span>{BRAND}</span><span class="pn">2</span><span>{SITE}</span></footer></section>'''

CSS = open(os.path.join(HERE, 'planner.css'), encoding='utf-8').read()
doc = f'<!doctype html><html lang="en"><head><meta charset="utf-8"><title>The Wedding Planner | {BRAND}</title><style>{CSS}</style></head><body>{"".join(pages)}</body></html>'
out_html = os.path.join(DIST, 'planner.html')
open(out_html, 'w', encoding='utf-8').write(doc)
print('pages:', len(pages))

CHROME = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
pdf = os.path.join(DIST, 'printable-wedding-planner.pdf')
subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--allow-file-access-from-files',
                f'--print-to-pdf={pdf}', 'file:///' + out_html.replace('\\', '/')], check=True)
print('pdf:', pdf, os.path.getsize(pdf))
