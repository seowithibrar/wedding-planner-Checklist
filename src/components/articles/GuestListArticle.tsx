import React from 'react';
import { BlogArticleLayout } from '../layout/BlogArticleLayout';
import { QuickAnswerBox } from '../blog/QuickAnswerBox';
import { ExpertTip, CommonMistake, ProTip, ChecklistItem } from '../blog/CalloutBoxes';
import { ArticleCTA } from '../blog/ArticleCTA';

export function GuestListArticle() {
  return (
    <BlogArticleLayout
      slug="perfect-guest-list-guide"
      title="Mastering Your Guest List & Seating Charts: The Ultimate Guide"
      category="Planning"
      readTime="6 Min Read"
      updatedAt="July 2026"
      heroImage="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800"
      heroImageAlt="Curated table arrangements and seating checklist"
      introduction={
        <p>
          Building a wedding guest list is often cited as the most stressful part of wedding planning. It forces couples to make difficult decisions about budget, venue capacity, and family politics—often all at the same time.
          <br /><br />
          This guide is designed to help you confidently navigate the tricky waters of guest list creation and seating chart logistics. You will learn how to create fair "A" and "B" lists, establish strict plus-one rules, and design a seating chart that ensures every guest has a wonderful time without causing family drama.
        </p>
      }
      keyTakeaways={[
        "Draft an A, B, and C list",
        "Establish firm plus-one rules",
        "Group guests by relationships",
        "Use digital seating tools"
      ]}
      tableOfContents={[
        { id: 'drafting', label: '1. Drafting the Initial List' },
        { id: 'cutting', label: '2. How to Cut the List' },
        { id: 'plus-ones', label: '3. The Plus-One Etiquette' },
        { id: 'seating', label: '4. Mastering the Seating Chart' },
        { id: 'faq', label: 'Frequently Asked Questions' }
      ]}
      faqs={[
        {
          q: "How do we split the guest list with parents?",
          a: "The traditional breakdown is 50% for the couple, 25% for the bride's parents, and 25% for the groom's parents. However, if you are paying for the wedding yourselves, you have full control over the list."
        },
        {
          q: "When should we finalize the guest list?",
          a: "Your guest list should be 90% finalized before you book your venue, as your venue dictates your maximum capacity. Finalize the remaining 10% before sending save-the-dates at the 6-month mark."
        },
        {
          q: "Do we have to invite coworkers?",
          a: "No. Only invite coworkers you socialize with outside of the office. If you invite one person from a small team, it's polite to invite the rest, but it's not strictly required."
        },
        {
          q: "What is an A-list and a B-list?",
          a: "The A-list consists of essential guests who receive the first round of invitations. As A-list guests decline, you send invitations to the B-list. Always send B-list invites at least 6 weeks before the wedding."
        },
        {
          q: "Do we need a seating chart?",
          a: "Unless you are having a very casual cocktail reception with under 50 people, yes. A seating chart prevents chaos, ensures families sit together, and speeds up dinner service."
        },
        {
          q: "How many people fit at a standard round table?",
          a: "A standard 60-inch round table comfortably seats 8 people (maximum 10). A 72-inch round table comfortably seats 10 people (maximum 12)."
        }
      ]}
      conclusion={
        <p>
          Mastering your guest list and seating chart requires a mix of firm boundaries and delicate diplomacy. By establishing rules early, communicating clearly with family, and utilizing digital planning tools, you can eliminate the stress of this process. Remember, those who truly matter will be thrilled just to celebrate your marriage!
        </p>
      }
    >
      
      <section className="space-y-6 text-left">
        <QuickAnswerBox title="How do you make a wedding guest list?">
          Start by writing down absolutely everyone you <em>want</em> to invite, creating your "Dream List." Then, divide this list into an <strong>A-List</strong> (must-haves) and a <strong>B-List</strong> (would-like-to-haves). Establish strict rules for plus-ones and children upfront. Finally, cut the list down until it matches your venue's maximum capacity and your catering budget.
        </QuickAnswerBox>

        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="drafting">
          <span className="text-brand-pink mr-2">01.</span> Drafting the Initial List
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Before looking at your budget or venue capacity, sit down with your partner and brain-dump every single person you would consider inviting. This is your "Dream List." 
        </p>
        <p className="text-slate-700 leading-relaxed">
          Once the initial list is drafted, assign every name a priority ranking. The A-List is for immediate family, closest friends, and people you cannot imagine getting married without. The B-List is for extended family, newer friends, and coworkers.
        </p>

        <ExpertTip title="The 1-Year Rule">
          If you haven't spoken to someone in the last 12 months (and they aren't a relative), they should likely be moved to the B-list or removed entirely.
        </ExpertTip>

        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="cutting">
          <span className="text-brand-pink mr-2">02.</span> How to Cut the List
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Guest count is the number one driver of wedding costs. Every additional guest means another meal, more alcohol, another chair rental, and more centerpieces. 
        </p>
        <p className="text-slate-700 leading-relaxed">
          To cut the list fairly, establish blanket rules and stick to them. For example, "No children under 12," or "No second cousins." If you make exceptions for one side of the family, the other side will eventually find out and feel slighted.
        </p>

        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="plus-ones">
          <span className="text-brand-pink mr-2">03.</span> The Plus-One Etiquette
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Plus-ones are a major point of contention. You are not obligated to give every single guest a plus-one. 
        </p>
        <p className="text-slate-700 leading-relaxed">
          Standard etiquette dictates that guests who are married, engaged, or living together must be invited as a couple. For single guests, offering a plus-one is a courtesy, especially if they are traveling from out of town or won't know anyone else at the wedding.
        </p>

        <CommonMistake title="Ambiguous Envelopes">
          If you don't want someone to bring a plus-one, address the envelope exactly to them (e.g., "Mr. John Smith"). Do not write "Mr. John Smith and Guest." If they write in a guest on the RSVP card, call them immediately to clarify the misunderstanding.
        </CommonMistake>

        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="seating">
          <span className="text-brand-pink mr-2">04.</span> Mastering the Seating Chart
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Once your RSVPs are in, it's time to create the seating chart. Group people by how they know you: high school friends, college friends, bride's extended family, groom's extended family.
        </p>
        <p className="text-slate-700 leading-relaxed">
          Never create a "leftovers" table of random guests who don't know anyone. Instead, sprinkle these guests into tables where they share common interests or ages with the other guests to encourage conversation.
        </p>

        <div className="space-y-4 my-6">
          <ChecklistItem>
            <strong>Seat older guests away from the speakers:</strong> Grandparents will appreciate being seated where they can hear each other without shouting.
          </ChecklistItem>
          <ChecklistItem>
            <strong>Keep the wedding party close:</strong> Seat your bridesmaids and groomsmen at a head table, or at tables immediately adjacent to your sweetheart table.
          </ChecklistItem>
          <ChecklistItem>
            <strong>Use digital tools:</strong> Use online drag-and-drop seating chart tools rather than sticky notes. It makes last-minute changes infinitely easier.
          </ChecklistItem>
        </div>

        <ArticleCTA 
          type="download"
          title="Digital Guest List Manager"
          description="Track RSVPs, meal choices, and table assignments with our automated Guest List Tracker."
          buttonText="Access Free Tracker"
          link="/blog/The-Ultimate-Wedding-Planning-Checklists-Guide-for-a-Stress-Free-Wedding"
        />

      </section>
    </BlogArticleLayout>
  );
}
