import { createResource } from '../lib/actions/resources';

function splitTextIntoChunks(text: string, maxChunkSize: number = 4000): string[] {
  const chunks: string[] = [];
  
  // Split text into sections based on double newlines (paragraph breaks)
  const sections = text.split(/\n\n+/);
  
  let currentChunk = '';
  
  for (const section of sections) {
    // If adding this section would exceed maxChunkSize, save current chunk and start new one
    if (currentChunk.length + section.length > maxChunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = '';
    }
    
    // If a single section is larger than maxChunkSize, split it by sentences
    if (section.length > maxChunkSize) {
      const sentences = section.match(/[^.!?]+[.!?]+/g) || [section];
      for (const sentence of sentences) {
        if (currentChunk.length + sentence.length > maxChunkSize && currentChunk.length > 0) {
          chunks.push(currentChunk.trim());
          currentChunk = '';
        }
        currentChunk += sentence + ' ';
      }
    } else {
      currentChunk += section + '\n\n';
    }
  }
  
  // Add the last chunk if it's not empty
  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks;
}

async function uploadLargeText() {
  const text = `
CONTINUING CARE CONTRACT STATUTES
State of California
Health and Safety Code
Chapter 10 of Division 2
January 1, 2023
(Updated 06/01/23)
1
CONTINUING CARE CONTRACT STATUTES
State of California
Health and Safety Code
Chapter 10 of Division 2
January 1, 2023
CHAPTER 10. CONTINUING CARE CONTRACTS
Article 1. General Provisions
1770. Legislative Intent.1
The Legislature finds, declares, and intends all of the following:
(a) Continuing care retirement communities are an alternative for the long-term
residential, social, and health care needs of California's elderly residents and seek to
provide a continuum of care, minimize transfer trauma, and allow services to be
provided in an appropriately licensed setting.
(b) Because elderly residents often both expend a significant portion of their savings
in order to purchase care in a continuing care retirement community and expect to
receive care at their continuing care retirement community for the rest of their lives,
tragic consequences can result if a continuing care provider becomes insolvent or
unable to provide responsible care.
(c) There is a need for disclosure concerning the terms of agreements made between
prospective residents and the continuing care provider, and concerning the operations
of the continuing care retirement community.
(d) Providers of continuing care should be required to obtain a certificate of
authority to enter into continuing care contracts and should be monitored and regulated
by the State Department of Social Services.
(e) This chapter applies equally to for-profit and nonprofit provider entities.
(f) This chapter states the minimum requirements to be imposed upon any entity
offering or providing continuing care.
(g) Because the authority to enter into continuing care contracts granted by the State
Department of Social Services is neither a guarantee of performance by the providers
nor an endorsement of any continuing care contract provisions, prospective residents
must carefully consider the risks, benefits, and costs before signing a continuing care
contract and should be encouraged to seek financial and legal advice before doing so.
1771. Definitions
Unless the context otherwise requires, the definitions in this section govern the
interpretation of this chapter.
1 Chapter and Article titles are original to the statute, but section titles are not part of the original statute text and
have been added to this guide for convenience. 
2
(a)(1) "Affiliate" means any person, corporation, limited liability company, business
trust, trust, partnership, unincorporated association, or other legal entity that directly or
indirectly controls, is controlled by, or is under common control with, a provider or
applicant.
(2) "Affinity group" means a grouping of entities sharing a common interest,
philosophy, or connection (e.g., military officers, religion).
(3) "Annual report" means the report each provider is required to file annually with
the department, as described in Section 1790.
(4) "Applicant" means any entity, or combination of entities, that submits and has
pending an application to the department for a permit to accept deposits and a
certificate of authority.
(5) "Assisted living services" includes, but is not limited to, assistance with personal
activities of daily living, including dressing, feeding, toileting, bathing, grooming,
mobility, and associated tasks, to help provide for and maintain physical and
psychosocial comfort.
(6) "Assisted living unit" means the living area or unit within a continuing care
retirement community that is specifically designed to provide ongoing assisted living
services.
(7) "Audited financial statement" means financial statements prepared in accordance
with generally accepted accounting principles, including the opinion of an independent
certified public accountant, and notes to the financial statements considered customary
or necessary to provide full disclosure and complete information regarding the
provider's financial statements, financial condition, and operation.
(b) (reserved)
(c)(1) "Cancel" means to destroy the force and effect of an agreement or continuing
care contract.
(2) "Cancellation period" means the 90-day period, beginning when the resident
physically moves into the continuing care retirement community, during which the
resident may cancel the continuing care contract, as provided in Section 1788.2.
(3) "Care" means nursing, medical, or other health-related services, protection or
supervision, assistance with the personal activities of daily living, or any combination
of those services.
(4) "Cash equivalent" means certificates of deposit and United States treasury
securities with a maturity of five years or less.
(5) "Certificate" or "certificate of authority" means the certificate issued by the
department, properly executed and bearing the State Seal, authorizing a specified
provider to enter into one or more continuing care contracts at a single specified
continuing care retirement community.
(6) "Condition" means a restriction, specific action, or other requirement imposed
by the department for the initial or continuing validity of a permit to accept deposits, a
provisional certificate of authority, or a certificate of authority. A condition may limit
the circumstances under which the provider may enter into any new deposit agreement 
3
or contract, or may be imposed as a condition precedent to the issuance of a permit to
accept deposits, a provisional certificate of authority, or a certificate of authority.
(7) "Consideration" means some right, interest, profit, or benefit paid, transferred,
promised, or provided by one party to another as an inducement to contract.
Consideration includes some forbearance, detriment, loss, or responsibility, that is
given, suffered, or undertaken by a party as an inducement to another party to contract.
(8) "Continuing care contract" means a contract that includes a continuing care
promise made, in exchange for an entrance fee, the payment of periodic charges, or
both types of payments. A continuing care contract may consist of one agreement or a
series of agreements and other writings incorporated by reference.
(9) "Continuing care promise" means a promise, expressed or implied, by a provider
to provide one or more elements of care to an elderly resident for the duration of his or
her life or for a term in excess of one year. Any such promise or representation,
whether part of a continuing care contract, other agreement, or series of agreements, or
contained in any advertisement, brochure, or other material, either written or oral, is a
continuing care promise.
(10) "Continuing care retirement community" means a facility located within the
State of California where services promised in a continuing care contract are provided.
A distinct phase of development approved by the department may be considered to be
the continuing care retirement community when a project is being developed in
successive distinct phases over a period of time. When the services are provided in
residents' own homes, the homes into which the provider takes those services are
considered part of the continuing care retirement community.
(11) "Control" means directing or causing the direction of the financial management
or the policies of another entity, including an operator of a continuing care retirement
community, whether by means of the controlling entity's ownership interest, contract,
or any other involvement. A parent entity or sole member of an entity controls a
subsidiary entity provider for a continuing care retirement community if its officers,
directors, or agents directly participate in the management of the subsidiary entity or in
the initiation or approval of policies that affect the continuing care retirement
community's operations, including, but not limited to, approving budgets or the
administrator for a continuing care retirement community.
(d)(1) "Department" means the State Department of Social Services.
(2) "Deposit" means any transfer of consideration, including a promise to transfer
money or property, made by a depositor to any entity that promises or proposes to
promise to provide continuing care, but is not authorized to enter into a continuing
care contract with the potential depositor.
(3) "Deposit agreement" means any agreement made between any entity accepting a
deposit and a depositor. Deposit agreements for deposits received by an applicant
prior to the department's release of funds from the deposit escrow account shall be
subject to the requirements described in Section 1780.4.
(4) "Depository" means a bank or institution that is a member of the Federal Deposit
Insurance Corporation or a comparable deposit insurance program.
4
(5) "Depositor" means any prospective resident who pays a deposit. Where any
portion of the consideration transferred to an applicant as a deposit or to a provider as
consideration for a continuing care contract is transferred by a person other than the
prospective resident or a resident, that third-party transferor shall have the same
cancellation or refund rights as the prospective resident or resident for whose benefit
the consideration was transferred.
(6) "Director" means the Director of Social Services.
(e)(1) "Elderly" means an individual who is 60 years of age or older.
(2) "Entity" means an individual, partnership, corporation, limited liability company,
and any other form for doing business. Entity includes a person, sole proprietorship,
estate, trust, association, and joint venture.
(3) "Entrance fee" means the sum of any initial, amortized, or deferred transfer of
consideration made or promised to be made by, or on behalf of, a person entering into
a continuing care contract for the purpose of ensuring care or related services pursuant
to that continuing care contract or as full or partial payment for the promise to provide
care for the term of the continuing care contract. Entrance fee includes the purchase
price of a condominium, cooperative, or other interest sold in connection with a
promise of continuing care. An initial, amortized, or deferred transfer of consideration
that is greater in value than 12 times the monthly care fee shall be presumed to be an
entrance fee.
(4) "Equity" means the value of real property in excess of the aggregate amount of
all liabilities secured by the property.
(5) "Equity interest" means an interest held by a resident in a continuing care
retirement community that consists of either an ownership interest in any part of the
continuing care retirement community property or a transferable membership that
entitles the holder to reside at the continuing care retirement community.
(6) "Equity project" means a continuing care retirement community where residents
receive an equity interest in the continuing care retirement community property.
(7) "Equity securities" shall refer generally to large and midcapitalization corporate
stocks that are publicly traded and readily liquidated for cash, and shall include shares
in mutual funds that hold portfolios consisting predominantly of these stocks and other
qualifying assets, as defined by Section 1792.2. Equity securities shall also include
other similar securities that are specifically approved by the department.
(8) "Escrow agent" means a bank or institution, including, but not limited to, a title
insurance company, approved by the department to hold and render accountings for
deposits of cash or cash equivalents.
(f) "Facility" means any place or accommodation where a provider provides or will
provide a resident with care or related services, whether or not the place or
accommodation is constructed, owned, leased, rented, or otherwise contracted for by
the provider.
(g) (reserved)
(h) (reserved)
5
(i)(1) "Inactive certificate of authority" means a certificate that has been terminated
under Section 1793.8.
(2) "Investment securities" means any of the following:
(A) Direct obligations of the United States, including obligations issued or held in
book-entry form on the books of the United States Department of the Treasury or
obligations the timely payment of the principal of, and the interest on, which are fully
guaranteed by the United States.
(B) Obligations, debentures, notes, or other evidences of indebtedness issued or
guaranteed by any of the following:
(i) The Federal Home Loan Bank System.
(ii) The Export-Import Bank of the United States.
(iii) The Federal Financing Bank.
(iv) The Government National Mortgage Association.
(v) The Farmers Home Administration.
(vi) The Federal Home Loan Mortgage Corporation of the Federal Housing
Administration.
(vii) Any agency, department, or other instrumentality of the United States if the
obligations are rated in one of the two highest rating categories of each rating agency
rating those obligations.
(C) Bonds of the State of California or of any county, city and county, or city in this
state, if rated in one of the two highest rating categories of each rating agency rating
those bonds.
(D) Commercial paper of finance companies and banking institutions rated in one of
the two highest categories of each rating agency rating those instruments.
(E) Repurchase agreements fully secured by collateral security described in
subparagraph (A) or (B), as evidenced by an opinion of counsel, if the collateral is
held by the provider or a third party during the term of the repurchase agreement,
pursuant to the terms of the agreement, subject to liens or claims of third parties, and
has a market value, which is determined at least every 14 days, at least equal to the
amount so invested.
(F) Long-term investment agreements, which have maturity dates in excess of one
year, with financial institutions, including, but not limited to, banks and insurance
companies or their affiliates, if the financial institution's paying ability for debt
obligations or long-term claims or the paying ability of a related guarantor of the
financial institution for these obligations or claims, is rated in one of the two highest
rating categories of each rating agency rating those instruments, or if the short-term
investment agreements are with the financial institution or the related guarantor of the
financial institution, the long-term or short-term debt obligations, whichever is
applicable, of which are rated in one of the two highest long-term or short-term rating
categories, of each rating agency rating the bonds of the financial institution or the
related guarantor, provided that if the rating falls below the two highest rating
categories, the investment agreement shall allow the provider the option to replace the
financial institution or the related guarantor of the financial institution or shall provide 
6
for the investment securities to be fully collateralized by investments described in
subparagraph (A), and, provided further, if so collateralized, that the provider has a
perfected first security lien on the collateral, as evidenced by an opinion of counsel
and the collateral is held by the provider.
(G) Banker's acceptances or certificates of deposit of, or time deposits in, any
savings and loan association that meets any of the following criteria:
(i) The debt obligations of the savings and loan association, or in the case of a
principal bank, of the bank holding company, are rated in one of the two highest rating
categories of each rating agency rating those instruments.
(ii) The certificates of deposit or time deposits are fully insured by the Federal
Deposit Insurance Corporation.
(iii) The certificates of deposit or time deposits are secured at all times, in the
manner and to the extent provided by law, by collateral security described in
subparagraph (A) or (B) with a market value, valued at least quarterly, of no less than
the original amount of moneys so invested.
(H) Taxable money market government portfolios restricted to obligations issued or
guaranteed as to payment of principal and interest by the full faith and credit of the
United States.
(I) Obligations the interest on which is excluded from gross income for federal
income tax purposes and money market mutual funds whose portfolios are restricted to
these obligations, if the obligations or mutual funds are rated in one of the two highest
rating categories by each rating agency rating those obligations.
(J) Bonds that are not issued by the United States or any federal agency, but that are
listed on a national exchange and that are rated at least "A" by Moody's Investors
Service, or the equivalent rating by Standard and Poor's Corporation or Fitch Investors
Service.
(K) Bonds not listed on a national exchange that are traded on an over-the-counter
basis, and that are rated at least "Aa" by Moody's Investors Service or "AA" by
Standard and Poor's Corporation or Fitch Investors Service.
(j) (reserved)
(k) (reserved)
(l) "Life care contract" means a continuing care contract that includes a promise,
expressed or implied, by a provider to provide or pay for routine services at all levels
of care, including acute care and the services of physicians and surgeons, to the extent
not covered by other public or private insurance benefits, to a resident for the duration
of his or her life. Care shall be provided under a life care contract in a continuing care
retirement community having a comprehensive continuum of care, including a skilled
nursing facility, under the ownership and supervision of the provider on or adjacent to
the premises. A change shall not be made in the monthly fee based on level of care. A
life care contract shall also include provisions to subsidize residents who become
financially unable to pay their monthly care fees.
(m)(1) "Monthly care fee" means the fee charged to a resident in a continuing care
contract on a monthly or other periodic basis for current accommodations and services, 
7
including care, board, or lodging. Periodic entrance fee payments or other
prepayments shall not be monthly care fees.
(2) "Monthly fee contract" means a continuing care contract that requires residents
to pay monthly care fees.
(n) "Nonambulatory person" means a person who is unable to leave a building
unassisted under emergency conditions in the manner described by Section 13131.
(o) (reserved)
(p)(1) "Per capita cost" means a continuing care retirement community's operating
expenses, excluding depreciation, divided by the average number of residents.
(2) "Periodic charges" means fees paid by a resident on a periodic basis.
(3) "Permanent closure" means the voluntary or involuntary termination or
forfeiture, as specified in subdivisions (a), (b), (g), (h), and (i) of Section 1793.7, of a
provider's certificate of authority or license, or another action that results in the
permanent relocation of residents. Permanent closure does not apply in the case of a
natural disaster or other event out of the provider's control.
(4) "Permit to accept deposits" means a written authorization by the department
permitting an applicant to enter into deposit agreements regarding a single specified
continuing care retirement community.
(5) "Prepaid contract" means a continuing care contract in which the monthly care
fee, if any, may not be adjusted to cover the actual cost of care and services.
(6) "Preferred access" means that residents who have previously occupied a
residential living unit have a right over other persons to any assisted living or skilled
nursing beds that are available at the community.
(7) "Processing fee" means a payment to cover administrative costs of processing
the application of a depositor or prospective resident.
(8) "Promise to provide one or more elements of care" means any expressed or
implied representation that one or more elements of care will be provided or will be
available, such as by preferred access.
(9) "Proposes" means a representation that an applicant or provider will or intends to
make a future promise to provide care, including a promise that is subject to a
condition, such as the construction of a continuing care retirement community or the
acquisition of a certificate of authority.
(10) "Provider" means an entity that provides continuing care, makes a continuing
care promise, or proposes to promise to provide continuing care. "Provider" also
includes any entity that controls an entity that provides continuing care, makes a
continuing care promise, or proposes to promise to provide continuing care. The
department shall determine whether an entity controls another entity for purposes of
this article. No homeowner's association, cooperative, or condominium association
may be a provider.
(11) "Provisional certificate of authority" means the certificate issued by the
department, properly executed and bearing the State Seal, under Section 1786. A
provisional certificate of authority shall be limited to the specific continuing care
retirement community and number of units identified in the applicant's application.
8
(q) (reserved)
(r)(1) "Refund reserve" means the reserve a provider is required to maintain, as
provided in Section 1792.6.
(2) "Refundable contract" means a continuing care contract that includes a promise,
expressed or implied, by the provider to pay an entrance fee refund or to repurchase
the transferor's unit, membership, stock, or other interest in the continuing care
retirement community when the promise to refund some or all of the initial entrance
fee extends beyond the resident's sixth year of residency. Providers that enter into
refundable contracts shall be subject to the refund reserve requirements of
Section 1792.6.
 (3) “Repayable contract” means a continuing care contract that includes a promise to
repay all or a portion of an entrance fee that is conditioned upon reoccupancy or resale
of the unit previously occupied by the resident. A repayable contract shall not be
considered a refundable contract for purposes of the refund reserve requirements of
Section 1792.6, provided that this conditional promise of repayment is not referred to
by the applicant or provider as a “refund.” A provider may repay all or a portion of an
entrance fee that is conditioned upon resale of the unit before the resale of the unit.
The repayment of an entrance fee before the resale of the unit shall not cause any other
entrance fee to be subject to the refund reserve requirements of Section 1792.6,
provided that the provider does not promise, at the time of contracting or thereafter, to
make this type of early repayment, represent that the provider intends to make this
type of early repayment, or indicate that the provider has a practice of making this type
of early repayment.
(4) "Resale fee" means a levy by the provider against the proceeds from the sale of a
transferor's equity interest.
(5) "Reservation fee" refers to consideration collected by an entity that has made a
continuing care promise or is proposing to make this promise and has complied with
Section 1771.4.
(6) "Resident" means a person who enters into a continuing care contract with a
provider, or who is designated in a continuing care contract to be a person being
provided or to be provided services, including care, board, or lodging.
(7) "Residential care facility for the elderly" means a housing arrangement as
defined by Section 1569.2.
(8) "Residential living unit" means a living unit in a continuing care retirement
community that is not used exclusively for assisted living services or nursing services.
(9) "Residential temporary relocation" means the relocation of one or more
residents, except in the case of a natural disaster that is out of the provider's control,
from one or more residential living units, assisted living units, skilled nursing units, or
a wing, floor, or entire continuing care retirement community building, due to a
change of use or major repairs or renovations. A residential temporary relocation shall
mean a relocation pursuant to this subdivision that lasts for a period of at least 9
months but that does not exceed 18 months without the written agreement of the
resident.
9
(s) (reserved)
(t)(1) "Termination" means the ending of a continuing care contract as provided for
in the terms of the continuing care contract.
(2) "Transfer trauma" means death, depression, or regressive behavior, that is caused
by the abrupt and involuntary transfer of an elderly resident from one home to another
and results from a loss of familiar physical environment, loss of well-known
neighbors, attendants, nurses and medical personnel, the stress of an abrupt break in
the small routines of daily life, or the loss of visits from friends and relatives who may
be unable to reach the new facility.
(3) "Transferor" means a person who transfers, or promises to transfer, consideration
in exchange for care and related services under a continuing care contract or proposed
continuing care contract, for the benefit of another. A transferor shall have the same
rights to cancel and obtain a refund as the depositor under the deposit agreement or the
resident under a continuing care contract.
1771.2. Permit to Accept Deposits/Certificate of Authority Required.
(a) An entity shall apply for and hold a currently valid permit to accept deposits
before it may enter into a deposit agreement or accept a deposit.
(b) A provider shall hold a currently valid provisional certificate of authority or
certificate of authority before it may enter into a continuing care contract.
(c) Before a provider subcontracts or assigns to another entity the responsibility to
provide continuing care, that other entity shall have a current and valid certificate of
authority. A provider holding a certificate of authority may contract for the provision
of a particular aspect of continuing care, such as medical care, with another entity that
does not possess a certificate of authority, if that other entity is appropriately licensed
under laws of this state to provide that care, and the provider has not paid in advance
for more than one year for that care.
(d) If an entity enters into an agreement to provide care for life or for more than one
year to a person under 60 years of age in return for consideration, and the agreement
includes the provision of services to that person after age 60, when the person turns
60 years of age, the promising entity shall comply with all the requirements imposed
by this chapter.
1771.3. Exemptions; Letters of Exemptions.
(a) This chapter shall not apply to either of the following:
(1) An arrangement for the care of a person by a relative.
(2) An arrangement for the care of a person or persons from only one family by a
friend.
(b) This chapter shall not apply to any admission or residence agreements offered by
residential communities for the elderly or residential care facilities for the elderly that
promise residents preferred access to assisted living services or nursing care, when
each of the following conditions is satisfied:
10
(1) Residents pay on a fee-for-service basis for available assisted living services and
nursing care.
(2) The fees paid for available assisted living services and nursing care are the same
for residents who have previously occupied a residential living unit as for residents
who have not previously occupied a residential living unit.
(3) No entrance fee or prepayment for future care or access, other than monthly care
fees, is paid by, or charged to, any resident at the community or facility. For purposes
of this paragraph, the term entrance fee shall not include initial, deferred, or amortized
payments that cumulatively do not exceed seven thousand five hundred dollars
($7,500).
(4) The provider has not made a continuing care promise of preferred access, other
than a promise as described in paragraph (5).
(5) The admission or residence agreement states:
(A) "This agreement does not guarantee that an assisted living or nursing bed will be
available for residents, but, instead, promises preferred access to any assisted living or
nursing beds that are available at the community or facility. The promise of preferred
access gives residents who have previously occupied a residential living unit a right
over other persons to such beds."
(B) "A continuing care contract promises that care will be provided to residents for
life or for a term in excess of a year. (Name of community or facility) is not a
continuing care retirement community and (name of provider) does not hold a
certificate of authority to enter into continuing care contracts and is not required to
have the same fiscal reserves as a continuing care provider. This agreement is not a
continuing care contract and is exempted from the continuing care statutes under
subdivision (b) of Section 1771.3 of the Health and Safety Code so long as the
conditions set forth in that section are met."
(6) The admission or residence agreement also states the policies and procedures
regarding transfers to higher levels of care within the community or facility.
(c) Any entity may apply to the department for a Letter of Exemption stating that the
requesting entity satisfies the requirements for an exemption under this section.
(d) The department shall issue a Letter of Exemption to a requesting entity if the
department determines either of the following:
(1) The requesting entity satisfies each of the requirements for an exemption under
subdivision (b).
(2) The requesting entity satisfies each of the requirements for an exemption under
subdivision (b) other than the requirements of paragraph (2) of subdivision (b), and
there is no substantial difference between the following:
(A) The fees for available assisted living services and skilled nursing care paid by
residents who have previously occupied a residential living unit.
(B) The fees for available assisted living services and skilled nursing care paid by
residents who have not previously occupied a residential living unit.
(e) An application to the department for a Letter of Exemption shall include all of
the following:
11
(1) A nonrefundable one thousand dollar ($1,000) application fee.
(2) The name and business address of the applicant.
(3) A description of the services and care available or provided to residents of the
community or facility.
(4) Documentation establishing that the requesting entity satisfies the requirements
for an exemption under this section, including all of the following:
(A) A schedule showing all fees for assisted living services and skilled nursing care
charged to residents at the facility or community who have previously occupied a
residential living unit.
(B) A schedule showing all fees for assisted living services and skilled nursing care
charged to residents at the facility or community who have not previously occupied a
residential living unit.
(C) A description of the differences between the fees for assisted living services and
skilled nursing care charged to residents who have not previously occupied a
residential unit and the fees for assisted living services and skilled nursing care
charged to residents who have previously occupied a residential unit.
(D) A schedule showing any other fees charged to residents of the community or
facility.
(E) Copies of all admission and residence agreement forms that have been entered
into, or will be entered into, with residents at the community or facility.
(5) Any other information reasonably requested by the department.
(f) If at any time any of the conditions stated in this section are not satisfied, then
the requirements of this chapter apply, and the department may impose appropriate
remedies and penalties set forth in Article 7 (commencing with Section 1793.5).
1771.4. Market Tests.
An entity may conduct a market test for a proposed continuing care retirement
community and collect reservation fees from persons interested in residing at the
proposed continuing care retirement community without violating this chapter if all of
the following conditions are met:
(a) The entity has filed with the department an application for a permit to accept
deposits and a certificate of authority for the project.
(b) The entity's application includes the proposed reservation agreement form and a
proposed escrow agreement that provide all of the following:
(1) All fees shall be deposited in escrow.
(2) Refunds shall be made within 10 calendar days after the payer's or proposed
resident's request or 10 days after denial of the application for a permit to accept
deposits.
(3) All reservation fees shall be converted to deposits within 15 days after a permit
to accept deposits is issued.
(c) The department has acknowledged in writing its receipt of the entity's application
and its approval of the entity's proposed reservation agreement between the payer and
the entity and the escrow agreement between the escrow holder and the entity.
12
(d) The amount of any reservation fee collected by the entity does not exceed one
thousand dollars ($1,000) or 1 percent of the average entrance fee amount as
determined from the entity's application, whichever is greater.
(e) The entity places all reservation fees collected by the entity into an escrow under
the terms of the approved reservation agreement and escrow agreement.
1771.5. License(s) Required.
The department shall not issue a provisional certificate of authority or a certificate of
authority to an applicant until the applicant has obtained licenses for the entire
continuing care retirement community, including a license to operate the residential
living and assisted living units, pursuant to Chapter 3.2 (commencing with
Section 1569) and if a skilled nursing facility is on the premises, a license for the
facility pursuant to Chapter 2 (commencing with Section 1250).
1771.6. Letter of Nonapplicability.
(a) Any entity may apply to the department for a Letter of Nonapplicability for
reasons other than those specified in Section 1771.3, which states that the provisions
of this chapter do not apply to its community, project, or proposed project.
(b) Applications for Letters of Nonapplicability shall be made to the department in
writing and include the following:
(1) A nonrefundable one thousand dollar ($1,000) application fee.
(2) A list of the reasons why the existing or proposed project may not be subject to
this chapter.
(3) A copy of the existing or proposed contract between the entity and residents.
(4) Copies of all advertising material.
(5) Any other information reasonably requested by the department.
(c) The department shall do both of the following:
(1) Within seven calendar days, acknowledge receipt of the request for a Letter of
Nonapplicability.
(2) Within 30 calendar days after all materials are received, either issue the Letter of
Nonapplicability or notify the entity of the department's reasons for denial of the
request.
(d)(1) If the department determines that the entity does not qualify for a Letter of
Nonapplicability, the entity shall refrain from, or immediately cease, entering into
continuing care contracts.
(2) If an entity to which this subdivision applies intends to provide continuing care,
an application for a certificate of authority shall be required to be filed with the
department pursuant to this chapter.
(3) If an entity to which this subdivision applies does not intend to provide
continuing care, it shall alter its plan of operation so that the project is not subject to
this chapter. To obtain a Letter of Nonapplicability for the revised project, the entity
shall submit a new application and fee.
13
1771.7. Resident Rights/Resident Association.
(a) No resident of a continuing care retirement community shall be deprived of any
civil or legal right, benefit, or privilege guaranteed by law, by the California
Constitution, or by the United States Constitution, solely by reason of status as a
resident of a community. In addition, because of the discretely different character of
residential living unit programs that are a part of continuing care retirement
communities, this section shall augment Chapter 3.9 (commencing with Section 1599),
Sections 72527 and 87572 of Title 22 of the California Code of Regulations, and other
applicable state and federal law and regulations.
(b) A prospective resident shall have the right to visit each of the different care
levels and to inspect assisted living and skilled nursing home licensing reports
including, but not limited to, the most recent inspection reports and findings of
complaint investigations covering a period of no less than two years, prior to signing a
continuing care contract.
(c) All residents in residential living units shall have all of the following rights:
(1) To live in an attractive, safe, and well maintained physical environment.
(2) To live in an environment that enhances personal dignity, maintains
independence, and encourages self-determination.
(3) To participate in activities that meet individual physical, intellectual, social, and
spiritual needs.
(4) To expect effective channels of communication between residents and staff, and
between residents and the administration or provider's governing body.
(5) To receive a clear and complete written contract that establishes the mutual
rights and obligations of the resident and the continuing care retirement community.
(6) To manage his or her financial affairs.
(7) To be assured that all donations, contributions, gifts, or purchases of providersponsored financial products shall be voluntary, and may not be a condition of
acceptance or of ongoing eligibility for services.
(8) To maintain and establish ties to the local community.
(9) To organize and participate freely in the operation of independent resident
organizations and associations.
(d) A continuing care retirement community shall maintain an environment that
enhances the residents' self-determination and independence. The provider shall do
both of the following:
(1) Encourage the formation of a resident association by interested residents who
may elect a governing body. The provider shall provide space and post notices for
meetings, and provide assistance in attending meetings for those residents who request
it. In order to promote a free exchange of ideas, at least part of each meeting shall be
conducted without the presence of any continuing care retirement community
personnel. The association may, among other things, make recommendations to
management regarding resident issues that impact the residents' quality of life, quality
of care, exercise of rights, safety and quality of the physical environment, concerns
about the contract, fiscal matters, or other issues of concern to residents. The 
14
management shall respond, in writing, to a written request or concern of the resident
association within 20 working days of receiving the written request or concern.
Meetings shall be open to all residents to attend as well as to present issues. Executive
sessions of the governing body shall be attended only by the governing body.
(2) Establish policies and procedures that promote the sharing of information,
dialogue between residents and management, and access to the provider's governing
body. The provider shall biennially conduct a resident satisfaction survey that shall be
made available to the resident association or its governing body, or, if neither exists, to
a committee of residents at least 14 days prior to the next semiannual meeting of
residents and the governing board of the provider required by subdivision (c) of
Section 1771.8. A copy of the survey shall be posted in a conspicuous location at each
facility.
(e) In addition to any statutory or regulatory bill of rights required to be provided to
residents of residential care facilities for the elderly or skilled nursing facilities, the
provider shall provide a copy of the bill of rights prescribed by this section to each
resident at the time or before the resident signs a continuing care contract, and at any
time when the resident is proposed to be moved to a different level of care.
(f) Each continuing care retirement community shall prominently post in areas
accessible to the residents and visitors a notice that a copy of rights applicable to
residents pursuant to this section and any governing regulation issued by the
Continuing Care Contracts Branch of the State Department of Social Services is
available upon request from the provider. The notice shall also state that the residents
have a right to file a complaint with the Continuing Care Contracts Branch for any
violation of those rights and shall contain information explaining how a complaint may
be filed, including the telephone number and address of the Continuing Care Contracts
Branch.
(g) The resident has the right to freely exercise all rights pursuant to this section, in
addition to political rights, without retaliation by the provider.
(h) The department may, upon receiving a complaint of a violation of this section,
request a copy of the policies and procedures along with documentation on the conduct
and findings of any self-evaluations.
(i) Failure to comply with this section shall be grounds for the imposition of
conditions on, suspension of, or revocation of the provisional certificate of authority or
certificate of authority pursuant to Section 1793.21.
(j) Failure to comply with this section constitutes a violation of residents' rights.
Pursuant to Section 1569.49 of the Health and Safety Code, the department shall
impose and collect a civil penalty of not more than one hundred fifty dollars ($150)
per violation upon a continuing care retirement community that violates a right
guaranteed by this section.
15
1771.8. Resident Representatives to and Members on the Board of Directors.
(a) The Legislature finds and declares all of the following:
(1) The residents of continuing care retirement communities have a unique and
valuable perspective on the operations of, and services provided in, the community in
which they live.
(2) Resident input into decisions made by the provider is an important factor in
creating an environment of cooperation, reducing conflict, and ensuring timely
response and resolution to issues that may arise.
(3) Continuing care retirement communities are strengthened when residents know
that their views are heard and respected.
(b) The Legislature encourages continuing care retirement communities to exceed
the minimum resident participation requirements established by this section by, among
other things, the following:
(1) Encouraging residents to form a resident association, and assisting the residents,
the resident association, and its governing body to keep informed about the operation
of the continuing care retirement community.
(2) Encouraging residents of a continuing care retirement community or their
elected representatives to select residents to participate as members of the governing
body of the provider.
(3) Quickly and fairly resolving any dispute, claim, or grievance arising between a
resident and the continuing care retirement community.
(c) The governing body of a provider, or the designated representative of the
provider, shall hold, at a minimum, semiannual meetings with the residents of the
continuing care retirement community, or the resident association or its governing
body, for the purpose of the free discussion of subjects including, but not limited to,
income, expenditures, and financial trends and issues as they apply to the continuing
care retirement community and proposed changes in policies, programs, and services.
This section does not preclude a provider from taking action or making a decision at
any time, without regard to the meetings required under this subdivision.
(d) At least 30 days prior to the implementation of an increase in the monthly care
fee, the designated representative of the provider shall convene a meeting, to which all
residents shall be invited, for the purpose of discussing the reasons for the increase, the
basis for determining the amount of the increase, and the data used for calculating the
increase. This meeting may coincide with the semiannual meetings required in
subdivision (c). At least 14 days prior to the meeting to discuss an increase in the
monthly care fee, the provider shall make available to each resident or resident
household comparative data showing the budget for the upcoming year, the current
year's budget, and actual and projected expenses for the current year, and a copy shall
be posted in a conspicuous location at each facility.
(e) The governing body of a provider or the designated representative of the
provider shall provide residents with at least 14 days' advance notice of each meeting
provided for in subdivisions (c) and (d), and shall permit residents attending the
meeting to present issues orally and in writing. The governing body of a provider or 
16
the designated representative of the provider shall post the notice of, and the agenda
for, the meeting in a conspicuous place in the continuing care retirement community at
least 14 days prior to the meeting. The governing body of a provider or the designated
representative of the provider shall make available to residents of the continuing care
retirement community upon request the agenda and accompanying materials at least
seven days prior to the meeting.
(f) A provider shall make available to the resident association or its governing
body, or if neither exists, to a committee of residents, a financial statement of activities
for that facility comparing actual costs to budgeted costs broken down by expense
category, not less than quarterly, with a written explanation of all significant budget
variances, and shall consult with the resident association or its governing body, or, if
neither exists, with a committee of residents, during the annual budget planning
process. The effectiveness of consultations during the annual budget planning process
shall be evaluated at a minimum every two years by the continuing care retirement
community administration. The evaluation, including any policies adopted relating to
cooperation with residents, shall be made available to the resident association or its
governing body, or, if neither exists, to a committee of residents at least 14 days prior
to the next semiannual meeting of residents and the provider's governing body
provided for in subdivision (c), and a copy of the evaluation shall be posted in a
conspicuous location at each facility.
(g) A provider shall, within 10 days after the annual report required pursuant to
Section 1790 is submitted to the department, provide, at a central and conspicuous
location in the community and in a conspicuous location on the provider's Internet
Web site, a copy of the annual report, including the multifacility statement of activities
and a copy of the annual audited financial statement, but excluding personal
confidential information.
(h) A provider shall maintain, as public information, available upon request to
residents, prospective residents, and the public, minutes of the meetings held by the
provider's governing body and shall retain these records for at least three years from
the date the records were filed or issued.
(i) Except as provided in subdivision (s), the governing body of a provider that is
not part of a multifacility organization with more than one continuing care retirement
community in the state shall accept both of the following:
(1) At least one resident of the continuing care retirement community it operates to
participate as a nonvoting resident representative to the provider's governing body.
(2) At least one resident, or two residents for a governing body with 21 or more
members, of the continuing care retirement community it operates to participate as a
voting member of the provider's governing body. A provider's governing body shall
not be required to meet the requirements of this paragraph until there is a vacancy on
the provider's governing body or upon the next regularly scheduled selection of the
provider's governing body occurring on or after January 1, 2015. A resident member
shall perform his or her duties in a manner that complies with the standards of conduct
and fiduciary duties of all other members of the governing board. 
17
(j) Except as provided in subdivision (s), in a multifacility organization having
more than one continuing care retirement community in the state, the governing body
of the multifacility organization shall do both of the following:
(1) Elect either to have at least one nonvoting resident representative to the
provider's governing body for each California-based continuing care retirement
community the provider operates or to have a resident-elected committee composed of
representatives of the residents of each California-based continuing care retirement
community that the provider operates select or nominate at least one nonvoting
resident representative to the provider's governing body for every three Californiabased continuing care retirement communities, or fraction thereof, that the provider
operates. If a multifacility organization elects to have one representative for every
three communities that the provider operates, the provider shall provide to the
president of the residents association of each of the communities that do not have a
resident representative the same notice of meetings, packets, minutes, and other
materials as the resident representative. At the reasonable discretion of the provider,
information related to litigation, personnel, competitive advantage, or confidential
information that is not appropriate to disclose, may be withheld.
(2)(A) Elect to have at least one resident, or two residents for a governing body with
21 or more members, from any of the continuing care retirement communities it
operates to participate as voting members of the provider's governing body. A
provider's governing body shall not be required to meet the requirements of this
subparagraph until there is a vacancy on the provider's governing body or upon the
next regularly scheduled selection of the provider's governing body occurring on or
after January 1, 2015. A resident member shall perform his or her duties in a manner
that complies with the standards of conduct and fiduciary duties of all other members
of the governing board.
(B) If there are communities that do not have a resident from the community as a
voting member of the provider's governing body, the provider shall provide to the
president of the resident association of each of those communities the same notice of
meetings, packets, minutes, and other materials as the resident voting members. At the
reasonable discretion of the provider, information related to litigation, personnel,
competitive advantage, or confidential information that is not appropriate to disclose
may be withheld.
(k) In order to encourage innovative and alternative models of resident involvement,
residents selected pursuant to paragraph (1) of subdivision (i) or paragraph (1) of
subdivision (j) to participate as a resident representative to the provider's governing
body may, at the option of the resident association, be selected in any one of the
following ways:
(1) By a majority vote of the resident association of a provider or by a majority vote
of a resident-elected committee of residents of a multifacility organization.
(2) If no resident association exists, any resident may organize a meeting of the
majority of the residents of the continuing care retirement community to select or
nominate residents to represent them on the governing body.
18
(3) Any other method designated by the resident association.
(l) A resident member of the provider's governing body selected pursuant to
paragraph (2) of subdivision (i) or paragraph (2) of subdivision (j) shall be nominated
to participate on the provider's governing body by the resident association or, if a
resident association does not exist, a committee of residents. The resident association
or committee of residents may nominate multiple nominees from which the provider's
governing body may approve a resident member. If the governing body disapproves
of the resident association's nominations, the resident association or the committee of
residents shall nominate additional resident members for the governing body's
approval or disapproval until the vacancy is filled.
(m) The resident association, organizing resident, or, in the case of a multifacility
organization, the resident-elected committee of residents, shall give residents of the
continuing care retirement community at least 30 days' advance notice of the meeting
to select a resident representative and resident members of the governing body and
shall post the notice in a conspicuous place at the continuing care retirement
community.
(n)(1) Except as provided in subdivision (o), resident representatives shall receive
the same notice of meetings, packets, minutes, and other materials as members of the
provider's governing body and shall be permitted to attend, speak, and participate in all
meetings of the governing body.
(2) Resident representatives may share information from meetings with other
residents, unless the information is confidential or doing so would violate fiduciary
duties to the provider. A resident representative shall be permitted to attend meetings
of the governing body committee or committees that review the annual budget of the
facility or facilities and recommend increases in monthly care fees. The resident
representative shall receive the same notice of meetings, information, packets,
minutes, and other materials as committee members, and shall be permitted to attend,
speak, and participate in the committee meetings. Resident representatives shall
perform their duties in good faith and with such care, including reasonable inquiry, as
an ordinarily prudent person in a like position would use under similar circumstances.
(o) Notwithstanding subdivision (n), the provider's governing body may exclude
resident representatives from its executive sessions and from receiving meeting
materials to be discussed during executive session. However, resident representatives
shall be included in executive sessions and shall receive all meeting materials to be
discussed during executive sessions related to discussions of the annual budgets,
increases in monthly care fees, indebtedness, and expansion of new and existing
continuing care retirement communities.
(p) The provider shall pay all reasonable travel costs for resident representatives and
resident members of the governing body.
(q) The provider shall disclose in writing the extent of resident involvement with the
governing body to prospective residents.
(r) A provider is not prohibited from exceeding the minimum resident participation
requirements of this section by, for example, having more resident meetings, more 
19
resident representatives or resident members of the governing body to the provider's
governing body than required, or by having one or more residents on the provider's
governing body who are selected with the active involvement of residents.
(s)(1) If a provider having at least one continuing care retirement community in the
state does not have a governing body within the state, the provider shall, in lieu of
appointing a voting member pursuant to subdivision (i) or (j), appoint a select
committee of its governing body members to meet pursuant to paragraph (6) of
subdivision (a) of Section 307 of the Corporations Code, or in a location that has been
designated in the notice of the meeting, with the resident association or a residentelected committee of residents no less frequently than a reasonable period prior to any
regularly scheduled meeting of the governing body at each of its facilities in the state
to address concerns of the residents and to ensure that the opinions of the residents are
relayed to all governing body members of the provider.
(2)(A) For a provider that is a sole proprietorship, general partnership, limited
partnership, limited liability company, or a closely held corporation, the provider may,
in lieu of appointing a voting member pursuant to paragraph (2) of subdivision (i) or
paragraph (2) of subdivision (j), appoint a select committee of its members to, or, if it
is a sole proprietorship, the sole proprietor shall, meet in a location that has been
designated in the notice of the meeting with the resident association or a residentelected committee of residents at each of its facilities semiannually and at least 60 days
prior to any financial or administrative changes, including, but not limited to, any
proposed increase in monthly fees, indebtedness of the provider, expansion or
contraction of the community facility, or other changes that would result in a budget
variance, or any policies, programs, or services that would materially change the
operation or environment of the community, to address concerns of the residents and
to ensure that the opinions of the residents are relayed to all members of the provider.
(B) If any member of a limited liability company is a corporation, a nonvoting
resident representative elected pursuant to paragraph (1) of subdivision (i) or
paragraph (1) of subdivision (j) shall be invited to the meetings of the governing body
of that corporation that address any of the proposed changes specified in subparagraph
(A) and shall be permitted to address those proposed changes. The governing body of
the corporation shall provide the nonvoting resident representative with at least 30
days' advance notice of the meeting. If more than one member of the limited liability
company is a corporation, only the corporation with the largest interest in the limited
liability company shall comply with this subparagraph.
1771.10. Comprehensive Disaster Preparedness Plan.
Each provider shall adopt a comprehensive disaster preparedness plan specifying
policies for evacuation, relocation, continued services, reconstruction, organizational
structure, insurance coverage, resident education, and plant replacement.
20
1772. Representation or Advertisements Which Lists or Refers to Individual or
Organization; Document of Acceptance of Responsibility and Liability; Filing.
(a) No report, circular, public announcement, certificate, financial statement, or any
other printed matter or advertising material, or oral representation, that states or
implies that an entity sponsors, guarantees, or assures the performance of any
continuing care contract, shall be published or presented to any prospective resident
unless both of the following have been met:
(1) Paragraph (5) of subdivision (a) of Section 1788 applies and the requirements of
that paragraph have been satisfied.
(2) The entity files with the department a duly authorized and executed written
declaration that it accepts full financial responsibility for each continuing care
contract. The filing entity shall be subject to the application requirements set forth in
Article 2 (commencing with Section 1779), shall be a coobligor for the subject
contracts, and shall be a coprovider on the applicable provisional certificate of
authority and certificate of authority.
(b) Implied sponsorship includes the use of the entity's name for the purpose of
implying that the entity's reputation may be relied upon to ensure the performance of
the continuing care contract.
(c) Any implication that the entity may be financially responsible for these contracts
may be rebutted by a conspicuous statement, in all continuing care contracts and
marketing materials, that clearly discloses to prospective residents and all transferors
that the entity is not financially responsible.
(d) On written appeal to the department, and for good cause shown, the department
may, in its discretion, allow an affinity group exemption from this section. If an
exemption is granted, every continuing care contract shall include a conspicuous
statement which clearly discloses to prospective residents and all transferors that the
affinity group entity is not financially responsible.
(e) If the name of an entity, including, but not limited to, a religion, is used in
connection with the development, marketing, or continued operation of a continuing
care retirement community, but that entity does not actually own, control, manage, or
otherwise operate the continuing care retirement community, the provider shall clearly
disclose the absence of that affiliation, involvement, or association with the continuing
care retirement community in the continuing care contract.
1772.2. Advertising Disclosures.
(a) All printed advertising materials, including brochures, circulars, public
announcements, and similar publications pertaining to continuing care or a continuing
care retirement community shall specify the number on the provider's provisional
certificate of authority or certificate of authority.
(b) If the provider has not been issued a certificate of authority, all advertising
materials shall specify both of the following:
(1) Whether an application has been filed.
21
(2) If applicable, that a permit to accept deposits or a provisional certificate of
authority has been issued.
1773. Certificate of Authority; Transferability.
(a) A provisional certificate of authority or certificate of authority may not be sold,
transferred, or exchanged in any manner. A provider may not sell or transfer
ownership of the continuing care retirement community without the approval of the
department. Any violation of this section shall cause the applicable provisional
certificate of authority or certificate of authority to be forfeited by operation of law
pursuant to subdivision (c) of Section 1793.7.
(b) A provider may not enter into a contract with a third party for overall
management of the continuing care retirement community without the approval of the
department. The department shall review the transaction for consistency with this
chapter.
(c) Any violation of this section shall be grounds for revocation for the provider's
provisional certificate of authority or certificate of authority under Section 1793.21.
1774. Non-Applicability of Security Laws.
No arrangement allowed by a permit to accept deposits, a provisional certificate or
authority, or a certificate of authority issued by the department under this chapter may
be deemed a security for any purpose.
1775. Relationship of Provisions of Chapter to Other Laws and Regulations.
(a) To the extent that this chapter, as interpreted by the department, conflicts with
the statutes, regulations, or interpretations governing the sale or hire of real property,
this chapter shall prevail.
(b) Notwithstanding any law or regulation to the contrary, a provider for a
continuing care retirement community may restrict or abridge the right of any resident,
whether or not the resident owns an equity interest, to sell, lease, encumber, or
otherwise convey any interest in the resident's unit, and may require that the resident
only sell, lease, or otherwise convey the interest to persons approved by the provider.
Provider approval may be based on factors which include, but are not limited to, age,
health status, insurance risk, financial status, or burden on the provider's personnel,
resources, or physical facility. The provider shall record any restrictions on a real
property interest.
(c) To the extent that this chapter conflicts with Sections 51.2 and 51.3 of the Civil
Code, this chapter shall have precedence. A continuing care provider, at its discretion,
may limit entrance based on age.
(d) This chapter imposes minimum requirements upon any entity promising to
provide, proposing to promise to provide, or providing continuing care.
(e) This chapter shall be liberally construed for the protection of persons attempting
to obtain or receiving continuing care. 
22
(f) A resident's entry into a continuing care contract described in this chapter shall
be presumptive evidence of the resident's intent not to return to his or her prior
residence to live for purposes of qualifying for Medi-Cal coverage under Sections
14000 et seq. of the Welfare and Institutions Code and Section 50425 of Title 22 of the
California Code of Regulations.
1776. Power of Department to Adopt, Amend, or Repeal Regulations.
The department shall adopt, amend, or repeal, in accordance with Chapter 3.5
(commencing with Section 11340) of Part 1 of Division 3 of Title 2 of the Government
Code, reasonable regulations as may be necessary or proper to carry out the purposes
and intent of this chapter and to protect the rights of the elderly.
1776.2. Inspections and Examinations.
The department may, by any duly authorized representative, inspect and examine any
continuing care retirement community, including the books and records thereof, or the
performance of any service required by the continuing care contracts.
1776.3. Facility Inspections and Complaints.
(a) The Continuing Care Contracts Branch of the department shall enter and review
each continuing care retirement community in the state at least once every three years
to augment the branch's assessment of the provider's financial soundness.
(b) During its facility visits, the branch shall consider the condition of the facility,
whether the facility is operating in compliance with applicable state law, and whether
the provider is performing the services it has specified in its continuing care contracts.
(c) The branch shall issue guidelines that require each provider to adopt a
comprehensive disaster preparedness plan, update that plan at least every three years,
submit a copy to the department, and make copies available to residents in a prominent
location in each continuing care retirement community facility.
(d)(1) The branch shall respond within 15 business days to residents' rights, servicerelated, and financially related complaints by residents, and shall furnish to residents
upon request and within 15 business days any document or report filed with the
department by a continuing care provider, except documents protected by privacy
laws.
(2) The provider shall disclose any citation issued by the department pursuant to
Section 1793.6 in its disclosure statement to residents as updated annually, and shall
post a notice of the citation in a conspicuous location in the facility. The notice shall
include a statement indicating that residents may obtain additional information
regarding the citation from the provider and the department.
1776.4. Contracting for Consulting Services.
The department may contract with any entity to provide consultation services. In
providing the services, the entity shall conform to the requirements of this chapter and 
23
to the rules, regulations, and standards of the department. The department shall
reimburse an entity for services performed pursuant to this section.
1776.6. Confidentiality.
(a) Pursuant to the California Public Records Act (Chapter 3.5 (commencing with
Section 6250) of Division 7 of Title 1 of the Government Code) and the Information
Practices Act of 1977 (Chapter 1 (commencing with Section 1798) of Title 1.8 of
Part 4 of Division 3 of the Civil Code), the following documents are public
information and shall be provided by the department upon request: audited financial
statements, annual reports and accompanying documents, compliance or
noncompliance with reserve requirements, whether an application for a permit to
accept deposits and certificate of authority has been filed, whether a permit or
certificate has been granted or denied, and the type of care offered by the provider.
(b) The department shall regard resident data used in the calculation of reserves as
confidential.
1778. CCRC Oversight Fund.
(a) There is hereby created in the State Treasury a fund that shall be known as the
CCRC Oversight Fund. The fund shall consist of fees received by the department
pursuant to this chapter. Notwithstanding Section 13340 of the Government Code, the
CCRC Oversight Fund is hereby continuously appropriated to the department, without
regard to fiscal years.
(b) Use of the funds appropriated pursuant to this section shall include funding of
the following:
(1) Program personnel salary costs, including, but not limited to, the following:
(A) A Continuing Care Contracts Program Manager at a level consistent with other
management classifications that direct a regulatory program with statewide impact.
The position shall require skills and knowledge at the highest level with responsibility
for work of the most critical or sensitive nature as it relates to the department’s
mission, including protecting vulnerable elderly persons, supervising technical staff
with oversight of highly complex operations, and responsibility for policy and program
evaluation and recommendations.
(B) A full-time legal counsel with a working knowledge of all laws relating to the
regulation of continuing care retirement communities and residential care facilities for
the elderly.
(C) A financial analyst with working knowledge of generally accepted accounting
principles and auditing standards.
(D) Other appropriate analytical and technical support positions.
(2) Contracts with technically qualified persons, including, but not limited to,
financial, actuarial, and marketing consultants, as necessary to provide advice
regarding the feasibility or viability of continuing care retirement communities and
providers.
(3) Other program costs or costs directly supporting program staff.
24
(4) The department shall use no more than 5 percent of the fees collected pursuant to
this section for overhead costs, including facilities operation and indirect department
and division costs.
(c) As needed, the department shall adjust the calculations for the application fees
under Section 1779.2 and annual fees under Section 1791 to ensure that the balance in
the CCRC Oversight Fund is adequate to fund the reasonable regulatory costs of the
program, as specified in subdivision (b). If the balance in the CCRC Oversight Fund
exceeds an amount adequate to fund the reasonable regulatory costs of the program, as
specified in subdivision (b), the department shall adjust the calculations for the
application fees under Section 1779.2 and annual fees under Section 1791 to reduce
the amounts collected. A link to the approved budget for the Continuing Care
Contracts Section shall be posted on the department’s internet website.
(d) The intent of the Legislature is to empower the program administrator with the
ability and authorization to obtain necessary resources or staffing to carry out the
program objectives.
25
Article 2. Application
1779. Application Required.
(a) An entity shall file an application for a permit to accept deposits and for a
certificate of authority with the department, as set forth in this chapter, before doing
any of the following:
(1) Accepting any deposit, reservation fee, or any other payment that is related to a
promise or proposal to promise to provide continuing care.
(2) Entering into any reservation agreement, deposit agreement, or continuing care
contract.
(3) Commencing construction of a prospective continuing care retirement
community. If the project is to be constructed in phases, the application shall include
all planned phases.
(4) Expanding an existing continuing care retirement community whether by
converting existing buildings or by new construction.
(5) Converting an existing structure to a continuing care retirement community.
(6) Recommencing marketing on a planned continuing care retirement community
when the applicant has previously forfeited a permit to accept deposits pursuant to
Section 1793.7.2
(7) Executing new continuing care contracts after a provisional certificate of
authority or certificate of authority has been inactivated, revoked, surrendered, or
forfeited.
(8) Closing the sale or transfer of a continuing care retirement community or
assuming responsibility for continuing care contracts.
(b) For purposes of paragraph (4) of subdivision (a), an expansion of a continuing
care retirement community shall be deemed to occur when there is an increase in the
capacity stated on the residential care facility for the elderly license issued to the
continuing care retirement community, an increase in the number of units at the
continuing care retirement community, an increase in the number of skilled nursing
beds, or additions to or replacement of existing continuing care retirement community
structures that may affect obligations to current residents.
(c) Any provider that alters, or proposes to alter, its organization, including by
means of a change in the type of entity it is, separation from another entity, merger,
affiliation, spinoff, or sale, shall file a new application and obtain a new certificate of
authority before the new entity may enter into any new continuing care contracts.
(d) A new application shall not be required for an entity name change if there is no
change in the entity structure or management. If the provider undergoes a name
change, the provider shall notify the department in writing of the name change and
shall return the previously issued certificate of authority for reissuance under the new
name.
2 Note that section 1793.7 relates to the forfeiture of permits to accept deposits, PCOA, or COA.
26
(e) Within 10 days of submitting an application for a certificate of authority
pursuant to paragraph (3), (4), (7), or (8) of subdivision (a), the provider shall notify
residents of the provider's existing community or communities of its application. The
provider shall notify its resident associations of any filing with the department to
obtain new financing, additional financing for a continuing care retirement
community, the sale or transfer of a continuing care retirement community, any change
in structure, and of any applications to the department for any expansion of a
continuing care retirement community. A summary of the plans and application shall
be posted in a prominent location in the continuing care retirement community so as to
be accessible to all residents and the general public, indicating in the summary where
the full plans and application may be inspected in the continuing care retirement
community.
(f) When the department determines that it has sufficient information on the
provider or determines that the provisions do not apply and the protections provided
by this article are not compromised, the department may eliminate all or portions of
the application contents required under Section 1779.4 for applications filed pursuant
to paragraphs (4), (5), (6), (7), and (8) of subdivision (a) or pursuant to subdivision (c).
1779.2. Application; Fees.
(a) Any entity filing an application for a permit to accept deposits and a certificate
of authority shall pay an application fee.
(b) The applicant shall pay 80 percent of the application fee for all planned phases at
the time the applicant submits its application. The 80 percent payment shall be made
by check payable to the Continuing Care Provider Fee Fund. The department shall not
process the application until it has received this fee.
(c) For new continuing care retirement communities or for the sale or transfer of
existing continuing care retirement communities, the application fee shall be
calculated as one-tenth of 1 percent of the purchase price of the continuing care
retirement community, or the estimated construction cost, including the purchase price
of the land or the present value of any long-term lease and all items listed in
subparagraph (D) of paragraph (2) of subdivision (y) of Section 1779.4.
(d) For existing continuing care retirement communities that are proposing new
phases, remodeling or an expansion, the application fee shall be calculated as onetenth of 1 percent of the cost of the addition, annexation, or renovation, including the
value of the land and improvements and all items listed in subparagraph (D) of
paragraph (2) of subdivision (y) of Section 1779.4.
(e) For existing facilities converting to continuing care retirement communities, the
application fee shall be calculated as one-tenth of 1 percent of the current appraised
value of the facility, including the land, or present value of any long-term lease.
(f) For organizational changes, the application fee shall be determined by the
department based on the time and resources it considers reasonably necessary to
process the application, including any consultant fees. The minimum application fee
for those applications shall be two thousand dollars ($2,000). 
27
(g) The applicant shall pay the remainder of the application fee before the
provisional certificate of authority is issued, or in the case of expansions or
remodeling, before final approval of the project is granted. The applicant shall make
this payment by check payable to the Continuing Care Provider Fee Fund.
1779.4. Application Contents.
An application shall contain all of the following:
(a) A statement signed by the applicant under penalty of perjury certifying that to
the best of the applicant's knowledge and belief, the items submitted in the application
are correct. If the applicant is a corporation, the chief executive officer shall sign the
statement. If there are multiple applicants, these requirements shall apply to each
applicant.
(b) The name and business address of the applicant.
(c) An itemization of the total fee calculation, including sources of figures used, and
a check in the amount of 80 percent of the total application fee.
(d) The name, address, and a description of the real property of the continuing care
retirement community.
(e) An estimate of the number of continuing care residents at the continuing care
retirement community.
(f) A description of the proposed continuing care retirement community, including
the services and care to be provided to residents or available for residents.
(g) A statement indicating whether the application is for a certificate of authority to
enter into continuing care or life care contracts.
(h) A license to operate the proposed continuing care retirement community as a
residential care facility for the elderly or documentation establishing that the applicant
has received a preliminary approval for licensure from the department's Community
Care Licensing Division.
(i) A license to operate the proposed skilled nursing facility or evidence that an
application has been filed with the Licensing and Certification Division of the State
Department of Health Services, if applicable.
(j) A statement disclosing any revocation or other disciplinary action taken, or in
the process of being taken, against a license, permit, or certificate held or previously
held by the applicant.
(k) A description of any matter in which any interested party involved with the
proposed continuing care retirement community has been convicted of a felony or
pleaded nolo contendere to a felony charge, or been held liable or enjoined in a civil
action by final judgment, if the felony or civil action involved fraud, embezzlement,
fraudulent conversion, or the misappropriation of property. For the purpose of this
subdivision, "interested party" includes any representative of the developer of the
proposed continuing care retirement community or the applicant, including all general
partners, executive officers, or chief operating officers and board members of
corporations; and managing members and managers of limited liability companies for 
28
each entity; who has significant decision making authority with respect to the proposed
continuing care retirement community.
(l) If the applicant is an entity other than an individual, the following information
shall also be submitted:
(1) A statement identifying the type of legal entity and listing the interest and extent
of the interest of each principal in the legal entity. For the purposes of this paragraph,
"principal" means any person or entity having a financial interest in the legal entity of
10 percent or more. When the application is submitted in the name of a corporation,
the parent, sole corporate shareholder, or sole corporate member who controls the
operation of the continuing care retirement community shall be listed as an applicant.
When multiple corporate applicants exist, they shall be listed jointly by corporate
name on the application, and the certificate of authority shall be issued in the joint
names of the corporations. When the application is submitted by a partnership, all
general partners shall be named as coapplicants and the department shall name them as
coproviders on any certificate of authority it issues.
(2) The names of the members of the provider's governing body.
(3) A statement indicating whether the applicant was or is affiliated with a religious,
charitable, nonprofit or for-profit organization, and the extent of any affiliation. The
statement shall also include the extent, if any, to which the affiliate organization will
be responsible for the financial and contract obligations of the applicant and shall be
signed by a responsible officer of the affiliate organization.
(4) A statement identifying any parent entity or other affiliate entity, the primary
activities of each entity identified, the relationship of each entity to the applicant, and
the interest in the applicant held by each entity.
(5) Copies of all contracts, management agreements, or other documents setting
forth the relationships with each of the other entities.
(6) A statement indicating whether the applicant, a principal, a parent entity, affiliate
entity, subsidiary entity, any responsible employee, manager, or board member, or
anyone who profits from the continuing care retirement community has had applied
against it any injunctive or restrictive order of a court of record, or any suspension or
revocation of any state or federal license, permit, or certificate, arising out of or
relating to business activity of health or nonmedical care, including, but not limited to,
actions affecting a license to operate a health care institution, nursing home,
intermediate care facility, hospital, home health agency, residential care facility for the
elderly, community care facility, or child day care facility.
(m) A description of the business experience of the applicants in the operation or
management of similar facilities.
(n) A copy of any advertising material regarding the proposed continuing care
retirement community prepared for distribution or publication.
(o) Evidence of the bonds required by Section 1789.8.
(p) A copy of any proposed reservation agreement.
(q) A copy of the proposed deposit agreements.
(r) The name of the proposed escrow agent and depository.
29
(s) Any copies of reservation and deposit escrow account agreements.
(t) A copy of any proposed continuing care contracts.
(u) A statement of any monthly care fees to be paid by residents, the components
and services considered in determining the fees, and the manner by which the provider
may adjust these fees in the future. If the continuing care retirement community is
already in operation, or if the provider operates one or more similar continuing care
retirement communities within this state, the statement shall include tables showing
the frequency and each percentage increase in monthly care rates at each continuing
care retirement community for the previous five years, or any shorter period for which
each continuing care retirement community may have been operated by the provider or
his or her predecessor in interest.
(v) A statement of the actions that have been, or will be, taken by the applicant to
fund reserves as required by Section 1792 or 1792.6 and to otherwise ensure that the
applicant will have adequate finances to fully perform continuing care contract
obligations. The statement shall describe actions such as establishing restricted
accounts, sinking funds, trust accounts, or additional reserves. If the applicant is
purchasing an existing continuing care retirement community from a selling provider,
the applicant shall provide an actuarial report to determine the liabilities of existing
continuing care contracts and demonstrate the applicant's ability to fund those
obligations.
(w) A copy of audited financial statements for the three most recent fiscal years of
the applicant or any shorter period of time the applicant has been in existence,
prepared in accordance with generally accepted accounting principles and
accompanied by an independent auditor's report from a reputable firm of certified
public accountants. The audited financial statements shall be accompanied by a
statement signed and dated by both the chief financial officer and chief executive
officer for the applicant or, if applicable, by each general partner, or each managing
member and manager, stating that the financial statements are complete, true, and
correct in all material matters to the best of their knowledge.
(x) Unaudited interim financial statements shall be included if the applicant's fiscal
year ended more than 90 days prior to the date of filing. The statements shall be either
quarterly or monthly, and prepared on the same basis as the annual audited financial
statements or any other basis acceptable to the department.
(y) A financial study and a marketing study that reasonably project the feasibility of
the proposed continuing care retirement community and are prepared by a firm or
firms acceptable to the department. These studies shall address and evaluate, at a
minimum, all of the following items:
(1) The applicant and its prior experience, qualifications, and management,
including a detailed description of the applicant's proposed continuing care retirement
community, its service package, fee structure, and anticipated opening date.
(2) The construction plans, construction financing, and permanent financing for the
proposed continuing care retirement community, including a description of the
anticipated source, cost, terms, and use of all funds to be used in the land acquisition, 
30
construction, and operation of the continuing care retirement community. This
proposal shall include, at a minimum, all of the following:
(A) A description of all debt to be incurred by the applicant for the continuing care
retirement community, including the anticipated terms and costs of the financing. The
applicant's outstanding indebtedness related to the continuing care retirement
community may not, at any time, exceed the appraised value of the continuing care
retirement community.
(B) A description of the source and amount of the equity to be contributed by the
applicant.
(C) A description of the source and amount of all other funds, including entrance
fees, that will be necessary to complete and operate the continuing care retirement
community.
(D) A statement itemizing all estimated project costs, including the real property
costs and the cost of acquiring or designing and constructing the continuing care
retirement community, and all other similar costs that the provider expects to incur
prior to the commencement of operation. This itemization shall identify all costs
related to the continuing care retirement community or project, including financing
expenses, legal expenses, occupancy development costs, marketing costs, and furniture
and equipment.
(E) A description of the interest expense, insurance premiums, and property taxes
that will be incurred prior to opening.
(F) An estimate of any proposed continuing care retirement community reserves
required for items such as debt service, insurance premiums, and operations.
(G) An estimate of the amount of funds, if any, that will be necessary to fund startup
losses, fund statutory and refundable contract reserves, and to otherwise provide
additional financial resources in an amount sufficient to ensure full performance by the
provider of its continuing care contract obligations.
(3) An analysis of the potential market for the applicant's continuing care retirement
community, addressing such items as:
(A) A description of the service area, including its demographic, economic, and
growth characteristics.
(B) A forecast of the market penetration the continuing care retirement community
will achieve based on the proposed fee structure.
(C) Existing and planned competition in and about the primary service area.
(4) A detailed description of the sales and marketing plan, including all of the
following:
(A) Marketing projections, anticipated sales, and cancellation rates.
(B) Month-by-month forecast of unit sales through sellout.
(C) A description of the marketing methods, staffing, and advertising media to be
used by the applicant.
(D) An estimate of the total entrance fees to be received from residents prior to
opening the continuing care retirement community.
31
(5) Projected move-in rates, deposit collections, and resident profiles, including
couple mix by unit type, age distribution, care and nursing unit utilization, and unit
turnover or resale rates.
(6) A description or analysis of development-period costs and revenues throughout
the development of the proposed continuing care retirement community.
(z) Projected annual financial statements for the period commencing on the first day
of the applicant's current fiscal year through at least the fifth year of operation.
(1) Projected annual financial statements shall be prepared on an accrual basis using
the same accounting principles and procedures as the audited financial statements
furnished pursuant to subdivision (x).
(2) Separate projected annual cash-flow statements shall be provided. These
statements shall show projected annual cash-flows for the duration of any debt
associated with the continuing care retirement community. If the continuing care
retirement community property is leased, the cash-flow statement shall demonstrate
the feasibility of closing the continuing care retirement community at the end of the
lease period.
(A) The projected annual cash-flow statements shall be submitted using prevailing
rates of interest, and assume no increase of revenues and expenses due to inflation.
(B) The projected annual cash-flow statements shall include all of the following:
(i) A detailed description and a full explanation of all assumptions used in preparing
the projections, accompanied by supporting supplementary schedules and calculations,
all to be consistent with the financial study and marketing study furnished pursuant to
subdivision (y). The department may require such other supplementary schedules,
calculations, or projections as it determines necessary for an adequate application.
(ii) Cash-flow from monthly operations showing projected revenues for monthly
fees received from continuing care contracts, medical unit fees if applicable, other
periodic fees, gifts and bequests used in operations, and any other projected source of
revenue from operations less operating expenses.
(iii) Contractual cash-flow from activities showing projected revenues from
presales, deposit receipts, entrance fees, and all other projected sources of revenue
from activities, less contract acquisition, marketing, and advertising expenditures.
(iv) Cash-flows from financing activities, including, but not limited to, bond or loan
proceeds less bond issue or loan costs and fees, debt service including CAL Mortgage
Insurance premiums, trustee fees, principal and interest payments, leases, contracts,
rental agreements, or other long-term financing.
(v) Cash-flows from investment activities, including, but not limited to, construction
progress payments, architect and engineering services, furnishings, and equipment not
included in the construction contract, project development, inspection and testing,
marketable securities, investment earnings, and interfund transfers.
(vi) The increase or decrease in cash during the projection period.
(vii) The beginning cash balance, which means cash, marketable securities, reserves,
and other funds on hand, available, and committed to the proposed continuing care
retirement community.
32
(viii) The cash balance at the end of the period.
(ix) Details of the components of the ending cash balance shall be provided for each
period presented, including, but not limited to, the ending cash balances for bond
reserves, other reserve funds, deposit funds, and construction funds balance.
(3) If the cash-flow statements required by paragraph (2) indicate that the provider
will have cash balances exceeding two months' projected operating expenses of the
continuing care retirement community, a description of the manner in which the cash
balances will be invested, and the persons who will be making the investment
decisions, shall accompany the application.
(4) The department may require the applicant to furnish additional data regarding its
operating budgets, projections of cash required for major repairs and improvements, or
any other matter related to its projections including additional information, schedules,
and calculations regarding occupancy rate projections, unit types, couple mix, sex and
age estimates for resident mix, turnover rates, refund obligations, and sales.
(aa)(1) A declaration by the applicant acknowledging that it is required to execute
and record a Notice of Statutory Limitation on Transfer relating to continuing care
retirement community property.
(2) The notice required in this subdivision shall be acknowledged and suitable for
recordation, describe the property, declare the applicant's intention to use all or part of
the described property for the purposes of a continuing care retirement community
pursuant to this chapter, and shall be in substantially the following form:
"NOTICE OF STATUTORY LIMITATION ON TRANSFER
 Notice is hereby given that the property described below is licensed, or proposed to
be licensed, for use as a continuing care retirement community and accordingly, the
use and transfer of the property is subject to the conditions and limitations as to use
and transfer set forth in Sections 1773 and 1789.4 of the Health and Safety Code. This
notice is recorded pursuant to subdivision (aa) of Section 1779.4 of the Health and
Safety Code.
The real property, which is legally owned by (insert the name of the legal owner) and
is the subject of the statutory limitation to which this notice refers, is more particularly
described as follows: (Insert the legal description and the assessor's parcel number of
the real property to which this notice applies.)"
(3) The Notice of Statutory Limitation on Transfer shall remain in effect until notice
of release is given by the department. The department shall execute and record a
release of the notice upon proof of complete performance of all obligations to
residents.
(4) Unless a Notice of Statutory Limitation on Transfer has been recorded with
respect to the land on which the applicant or provider is operating, or intends to
operate a continuing care retirement community, prior to the date of execution of any
trust deed, mortgage, or any other lien or encumbrance securing or evidencing the
payment of money and affecting land on which the applicant or provider intends to 
33
operate a continuing care retirement community, the applicant or provider shall give
the department advance written notice of the proposed encumbrance. Upon the giving
of notice to the department, the applicant or provider shall execute and record the
Notice of Statutory Limitation on Transfer in the office of the county recorder in each
county in which any portion of the continuing care retirement community is located
prior to encumbering the continuing care retirement community property with the
proposed encumbrance.
(5) In the event that the applicant or provider and the owner of record are not the
same entity on the date on which execution and recordation of the notice is required,
the leasehold or other interest in the continuing care retirement community property
held by the applicant or provider shall survive in its entirety and without change, any
transfer of the continuing care retirement community property by the owner. In
addition, the applicant or provider shall record a memorandum of leasehold or other
interest in the continuing care retirement community property that includes a provision
stating that its interest in the property survives any transfer of the property by the
owner. The applicant or provider shall provide a copy of the notice and the
memorandum of interest to the owner of record by certified mail and to the
department.
(6) The notice shall, and, if applicable, the memorandum of interest shall be indexed
by the recorder in the grantor-grantee index to the name of the owner of record and the
name of the applicant or provider.
(ab) A statement that the applicant will keep the department informed of any
material changes to the proposed continuing care retirement community or its
application.
(ac) Any other information that may be required by the department for the proper
administration and enforcement of this chapter.
1779.6. Timeframes; Approval or Denial of Applications.
(a) Within seven calendar days of receipt of an initial application for a permit to
accept deposits and a certificate of authority, the department shall acknowledge receipt
of the application in writing.
(b) Within 30 calendar days following its receipt of an application, the department
shall determine if the application is complete and inform the applicant of its
determination. If the department determines that the application is incomplete, its
notice to the applicant shall identify the additional forms, documents, information, and
other materials required to complete the application. The department shall allow the
applicant adequate time to submit the requested information and materials. This
review may not determine the adequacy of the materials included in the application.
(c) Within 120 calendar days after the department determines that an application is
complete, the department shall review the application for adequacy. An application
shall be adequate if it complies with all the requirements imposed by this chapter, and
both the financial study and marketing study reasonably project the feasibility of the
proposed continuing care retirement community, as well as demonstrate the financial 
34
soundness of the applicant. The department shall either approve the application as
adequate under this chapter or notify the applicant that its application is inadequate. If
the application is inadequate, the department shall identify the deficiencies in the
application, provide the appropriate code references, and give the applicant an
opportunity to respond.
(d) Within 60 calendar days after receiving any additional information or
clarification required from the applicant, the department shall respond to the
applicant's submission in writing and state whether each specific deficiency has been
addressed sufficiently to make the application adequate. If the department determines
that the application is adequate and in compliance with this chapter, the department
shall issue the permit to accept deposits. If the department determines that the
response is inadequate, it may request additional information or clarification from the
applicant pursuant to subdivision (c) or deny the application pursuant to
Section 1779.10.
(e) If the applicant does not provide the department with the additional information
within 90 days after the department's notice described in subdivision (c), the
application may be denied for being inadequate. Any new application shall require an
application fee.
1779.7. Third Party Transferors.
(a) Where any portion of the consideration transferred to an applicant as a deposit or
to a provider as consideration for a continuing care contract is transferred by a person
other than the prospective resident or a resident, that third-party transferor shall have
the same cancellation or refund rights as the prospective resident or resident for whose
benefit this consideration was transferred.
(b) A transferor shall have the same rights to cancel and obtain a refund as the
depositor under the deposit agreement or the resident under a continuing care contract.
1779.8. Changes in Application Information.
(a) The applicant shall notify the department of material changes in the application
information submitted to the department, including the applicant's financial and
marketing projections.
(b) An applicant shall provide to the department at least 60 days' advance written
notice of any proposal to make any changes in the applicant's corporate name,
structure, organization, operation, or financing.
(c) Within 30 calendar days after receiving notice of a change affecting the applicant
or the application, the department shall advise the applicant:
(1) Whether additional information is required to process the pending application.
(2) Whether an additional application fee is required.
(3) Whether a new application and application fee must be submitted. The new
application fee shall be twice the actual cost of additional review time caused by the
change. This additional fee is payable to the department on demand. 
35
(d) The department shall suspend the applicant's application and, if applicable, its
permit to accept deposits if the applicant fails to give written notice of changes
required by this section. The suspension shall remain in effect until the department
has both assessed the potential impact of the changes on the interests of depositors and
taken such action as necessary under this chapter to protect these interests.
1779.10. Denial of an Application.
(a) The department shall deny an application for a permit to accept deposits and a
certificate of authority if the applicant fails to do any of the following:
(1) Pay the application fee as required by Section 1779.2.
(2) Submit all information required by this chapter.
(3) Submit evidence to support a reasonable belief that any interested party of the
proposed continuing care retirement community who has committed any offenses
listed in subdivision (k) of Section 1779.4 is of such good character as to indicate
rehabilitation.
(4) Submit evidence to support a reasonable belief that the applicant is capable of
administering the continuing care retirement community in compliance with applicable
laws and regulations when an action specified in subdivision (j) or (k) of Section
1779.4 has been taken against the applicant.
(5) Demonstrate the feasibility of the proposed continuing care retirement
community.
(6) Comply with residential care facility for the elderly licensing requirements.
(b) If the application is denied, no portion of the paid application fee shall be
refundable or refunded.
(c) Immediately upon the denial of an application, the department shall notify the
applicant in writing.
(d) The Notice of Denial from the department shall contain all of the following:
(1) A statement that the application is denied.
(2) The grounds for the denial.
(3) A statement informing the applicant that it has the right to appeal.
(4) A statement that the applicant has 30 calendar days from the date that the Notice
of Denial was mailed to appeal the denial, and where to send the appeal.
(e) If the applicant appeals the denial, further proceedings shall be conducted in
accordance with Chapter 5 (commencing with Section 11500) of Part 1 of Division 3
of Title 2 of the Government Code.
36
Article 3. Deposit Period
1780. Issuance of Permit to Accept Deposits.
The department shall issue a permit to accept deposits when it has done all of the
following:
(a) Determined that the application is adequate.
(b) Determined that the proposed continuing care retirement community financial
and marketing studies are acceptable.
(c) Reviewed and approved the deposit agreements.
(d) Reviewed and approved the deposit escrow account agreement.
1780.2. Deposit Payment Process; Processing Fees.
(a) A deposit may be paid in one or several payments, at or after the time the parties
enter into the deposit agreement. A deposit shall be paid by cash or cash equivalent,
jointly payable to the applicant and the escrow agent or depository. Possession and
control of any deposit agreement shall be transferred to the escrow agent at the time
the deposit is paid.
(b) A processing fee may be added to the deposit.
(1) The processing fee shall not exceed 1 percent of the amount of the average
entrance fee or five hundred dollars ($500), whichever is greater.
(2) A nonrefundable processing fee may be paid directly to the applicant without
being placed in the deposit escrow account.
(c) Payments made by a depositor for upgrades or modifications to the living unit
shall not be placed in escrow with deposits. The applicant shall provide written refund
policies to the depositor before accepting any payments for modifications or upgrades.
(d) The applicant shall furnish to the department within the first 10 days of each
calendar month a list of all residents who have made payments for modifications or
upgrades, the amounts each resident has paid, the date of each payment, and the unit to
be modified or upgraded for each resident.
(e) All payments for modifications or upgrades shall be refunded to the depositor
with interest if the applicant does not receive a certificate of authority for the proposed
continuing care retirement community or expansion.
(f) The department may record a lien against the continuing care retirement
community property, or any portion of the continuing care retirement community
property, to secure the applicant's obligations to refund the depositor's payments made
for modifications or upgrades. Any lien created under this section shall be to protect
depositors and shall be governed by Section 1793.15.
1780.4. Agreements Between Applicant and Depositor; Contents; Approval of
Forms; Size of Print.
(a) All deposit agreements between the applicant and the depositor shall be in
writing and shall contain all information required by this section. 
37
(b) All deposit agreement forms shall be approved by the department prior to their
use.
(c) The requirements of this chapter and Chapter 3.2 (commencing with Section
1569) shall be the bases for approval of the forms by the department.
(d) All text in deposit agreement forms shall be printed in at least 10-point typeface.
(e) The deposit agreement form shall provide all of the following:
(1) An estimated date for commencement of construction of the proposed continuing
care retirement community or, if applicable, each phase not to exceed 36 months from
the date the permit to accept deposits is issued.
(2) A statement to the effect that the applicant will notify depositors of any material
change in the application.
(3) The identity of the specific unit reserved and the total deposit for that unit.
(4) Processing fee terms and conditions, including:
(A) The amount.
(B) A statement explaining the applicant's policy regarding refund or retention of the
processing fee in the event of death of the depositor or voluntary cancellation by the
depositor.
(C) Notice that the processing fee shall be refunded within 30 days if the applicant
does not accept the depositor for residency, or the applicant fails to construct the
continuing care retirement community before the estimated date of completion and the
department determines that there is no satisfactory cause for the delay.
(5) Requirements for payment of the deposit by the depositor.
(6) A statement informing the depositor that their deposit payments will be
converted to an entrance fee payment at the time the continuing care contract is
executed.
(7) A statement informing the depositor that deposits shall be refunded within
30 calendar days of the depositor's nonacceptance for residency or notice to the
applicant of the death of the depositor.
(8) A statement informing the depositor that all deposits shall be refunded to the
depositors if the continuing care retirement community is not constructed by the
estimated date of completion and the department determines that there is no
satisfactory cause for the delay.
(9) A statement informing the depositor that a refund of the deposit within 10
calendar days of notice of cancellation by the depositor. The deposit agreement shall
state that depositors who have deposited more than one thousand dollars ($1,000) or
5 percent of the entrance fee, whichever is greater, and who have been notified that
construction of the proposed continuing care retirement community has commenced,
will not be entitled to a refund of their deposit until the provisional certificate of
authority is issued or after one of the following occurs:
(A) Another depositor has reserved the canceling depositor's specific residential unit
and paid the necessary deposit.
(B) The depositor no longer meets financial or health requirements for admission.
(C) The applicant fails to meet the requirements of Section 1786 or 1786.2.
38
(10) A statement to depositors that specifies when funds may be released from
escrow to the applicant and explains that thereafter the depositor's funds will not have
escrow protection.
(11) A statement advising the depositor whether interest will be paid to the depositor
on deposits placed in the deposit escrow account.
(f) If cash equivalents are to be accepted in lieu of cash, all of the following shall
also be included in the deposit agreement:
(1) A statement that cash equivalents that may be accepted as deposits shall be either
certificates of deposit or United States securities with maturities of five years or less.
(2) A statement that the instruments will be held by the escrow agent in the form in
which they were delivered and assigned by the depositor until they are replaced by
cash or converted to cash.
(3) A statement that the depositor will be required to assign the instruments to a
neutral third-party escrow agent. If the bank or entity that issued the instruments
refuses to allow this assignment, the escrow agent shall not accept the instruments.
These instruments shall be reassigned to the depositor if the depositor terminates the
deposit agreement before the instruments mature. If the depositor terminates the
deposit agreement after the instruments mature, the depositor shall receive a cash
refund of the portion of the deposit represented by the matured instruments.
(4) A statement that any amount by which the face value of the deposited
instruments exceeds the required deposit shall be deemed part of the deposit and shall
be applied against the depositor's obligations under the deposit agreement.
(5) A statement that the instruments shall be converted to, or replaced with, cash
prior to the department's authorization for the release of deposits to the applicant. The
depositor shall be advised that if the depositor does not substitute cash in the amount
equal to the deposit, the applicant may do either of the following:
(A) Direct the escrow agent to sell, redeem, or otherwise convert the instruments to
cash and to treat the proceeds in the same manner as it treats cash deposits under the
deposit agreement. The costs of any such sale, redemption, or conversion, including,
without limitation, transaction fees and any early withdrawal penalties, may be
charged to the depositor and paid out of the cash or other instruments received from
the depositor in escrow. If there is a shortfall, the depositor may be immediately
obligated to pay the shortfall by check jointly payable to the applicant and the escrow
agent.
(B) Terminate the deposit agreement. In this event, the escrow agent shall reassign
the property to the depositor and refund all cash in escrow within the time periods
specified in the deposit agreement.
(g) A statement that deposits will be invested in instruments guaranteed by the
federal government or an agency of the federal government, or in investment funds
secured by federally guaranteed instruments.
(h) A statement that no funds deposited in a deposit escrow account shall be subject
to any liens, judgments, garnishments, or creditor's claims against the applicant, the
proposed continuing care retirement community property, or the continuing care 
39
retirement community. The deposit agreement shall also provide that deposits may not
be subject to any liens or charges by the escrow agent, except that cash equivalent
deposits may be subject to transactions fees, commissions, prepayment penalties, and
other fees incurred in connection with these deposits.
(i) A schedule of projected monthly care fees estimated to be charged to residents
for each of the first five years of the continuing care retirement community's existence
shall be attached to each deposit agreement. This schedule shall contain a conspicuous
statement in at least 10-point boldface type that the projected fees are an estimate only
and may be changed without notice.
1781. Deposit Escrow Account Required.
(a) All deposits, excluding processing fees, shall be placed in an escrow account.
All terms governing the deposit escrow account shall be approved in advance by the
department.
(b) The deposit escrow account shall be established by an escrow agent and all
deposits shall be deposited in a depository located in California and approved by the
department. The department's approval of the depository shall be based, in part, upon
its ability to ensure the safety of funds and properties entrusted to it and its
qualifications to perform the obligations of the depository pursuant to the deposit
escrow account agreement and this chapter. The depository may be the same entity as
the escrow agent. All deposits shall be kept and maintained in a segregated account
without any commingling with other funds, including any funds or accounts owned by
the applicant.
(c) If the escrow agent is a title company, it shall meet the following requirements:
(1) A Standard and Poors rating of "A" or better or a comparable rating from a
comparable rating service.
(2) Licensure in good standing with the Department of Insurance.
(3) Tangible net equity as required by the Department of Insurance.
(4) Reserves as required by the Department of Insurance.
(d) All deposits shall remain in escrow until the department has authorized release
of the deposits, as provided in Section 1783.3.
(e) Deposits shall be invested in instruments guaranteed by the federal government
or an agency of the federal government, or in investment funds secured by federally
guaranteed instruments.
(f) No funds deposited in a deposit escrow account shall be subject to any liens,
judgments, garnishments, or creditor's claims against the applicant or the continuing
care retirement community. The deposit agreement shall also provide that deposits
may not be subject to any liens or charges by the escrow agent except that cash
equivalent deposits may be subject to transaction fees, commissions, prepayment
penalties, and other fees incurred in connection with those deposits.
40
1781.2. Deposits to the Escrow Agent.
(a) All deposits shall be delivered to the escrow agent and deposited into the deposit
escrow account within five business days after receipt by the applicant. The deposit
escrow account shall be accounted for in a separate escrow account.
(b) The applicant shall provide, with all deposits delivered to the escrow holder, a
copy of the executed deposit agreement, a copy of the receipt given to the depositor, a
summary of all deposits made on that date, and any other materials required by the
escrow holder.
1781.4. Deposit Escrow Agreement Requirements.
The deposit escrow account agreement between the applicant and the escrow agent
shall include all of the following:
(a) The amount of the processing fee.
(b) A provision requiring that all deposits shall be placed into the deposit escrow
account upon delivery.
(c) A provision requiring that monthly progress reports be sent by the escrow agent
directly to the department, beginning the month after the deposit escrow account is
opened and continuing through the month funds are released from escrow. These
reports shall be prepared every month that there are any funds in the account and shall
show each of the following in separate columns:
(1) The name and address of each depositor or resident.
(2) The designation of the living unit being provided.
(3) Any processing fee which is deposited into escrow.
(4) The total deposit required for the unit.
(5) The total entrance fee for the unit.
(6) Ten percent of the total entrance fee.
(7) Each deposit payment made by or on behalf of the depositor and any refunds
paid to the depositor.
(8) The unpaid balance for each depositor's deposit.
(9) The unpaid balance for each depositor's entrance fee.
(10) The current balance in the deposit escrow account for each depositor and the
collective balance.
(11) The dollar amount, type, and maturity date of any cash equivalent paid by each
depositor.
(d) A provision for investment of escrow account funds in a manner consistent with
Section 1781.
(e) A provision for refunds to depositors in the manner specified by Section 1783.2.
(f) A provision regarding the payment of interest earned on the funds held in escrow
in the manner specified in the applicant's deposit agreement.
(g) Release of deposit escrow account funds in the manner specified in
Section 1783.3, including to whom payment of interest earned on the funds will be
made.
41
(h) Representations by the escrow agent that it is not, and shall not be during the
term of the deposit escrow account, a lender to the applicant or for the proposed
continuing care retirement community, or a fiduciary for any lender or bondholder for
that continuing care retirement community, unless approved by the department.
(i) If cash equivalents may be accepted as a deposit in lieu of cash, the deposit
escrow account agreement shall also include all of the following:
(1) Authorization for the escrow agent to convert instruments to cash when they
mature. The escrow agent may notify all financial institutions whose securities are
held by the escrow agent that all interest and other payments due upon these
instruments shall be paid to the escrow agent. The escrow agent shall collect, hold,
invest, and disburse these funds as provided under the escrow agreement.
(2) Authorization for the escrow agent to deliver the instruments in its possession
and release funds from escrow according to written directions from the applicant,
consistent with the terms provided in the applicant's deposit escrow account
agreement. The escrow agent shall distribute cash and other property to an individual
depositor only upon either of the following occurrences:
(A) The depositor's written request to receive monthly payments of interest accrued
on his or her deposits.
(B) Receipt of notice from the applicant to pay a refund to the depositor.
(3) A provision that the escrow agent shall maintain, at all times, adequate records
showing the beneficial ownership of the instruments.
(4) A provision that the escrow agent shall have no responsibility or authority to
initiate any transfer of the instruments or conduct any other transaction without
specific written instructions from the applicant.
(5) A provision authorizing, instructing, and directing the escrow agent to do all of
the following:
(A) Redeem and roll over matured investments into money market accounts or other
department approved instruments with the escrow agent or an outside financial
institution.
(B) Collect and receive interest, principal, and other things of value in connection
with the instruments.
(C) Sign for the depositors any declarations, affidavits, certificates, and other
documents that may be required to collect or receive payments or distributions with
respect to the instruments.
1781.6. Changes to Deposit Agreement or Deposit Escrow Account Agreement
Forms.
All changes to a deposit agreement or deposit escrow account agreement form shall
be submitted to, and approved by, the department before use by the applicant.
1781.8. Earnings from Funds in Escrow.
(a) Deposits held in escrow shall be placed in an interest bearing account or invested
as provided under subdivision (e) of Section 1781. 
42
(b) Interest, income, and other gains derived from deposits held in a deposit escrow
account may not be released or distributed from the deposit escrow account except
upon written approval of the department.
(c) Approval by the department for the release of earnings generated from funds
held in escrow shall be based upon an assessment that funds remaining in the deposit
escrow account will be sufficient to pay refunds and any interest promised to all
depositors, as well as administrative costs owed to the escrow agent.
(d) When released by the department, interest earned by the funds in the deposit
escrow account shall be distributed in accordance with the terms of the deposit
agreement.
1781.10. Escrowed Funds Not to be Used as Collateral.
No deposit or any other asset held in a deposit escrow account, shall be encumbered
or used as collateral for any obligation of the applicant or any other person, unless the
applicant obtains prior written approval from the department for the encumbrance or
use as collateral. The department shall not approve any encumbrance or use as
collateral under this section unless the encumbrance or use as collateral is expressly
subordinated to the rights of depositors under this chapter to refunds of their deposits.
1782. Construction.
(a) An applicant shall not begin construction on any phase of a continuing care
retirement community without first obtaining a written acknowledgment from the
department that all of the following prerequisites have been met:
(1) A completed application has been submitted to the department.
(2) A permit to accept deposits has been issued to the applicant or, in the case of
continuing care retirement community renovation projects, the department has issued a
written approval of the applicant's application.
(3) For new continuing care retirement communities, or construction projects adding
new units to an existing continuing care retirement community, deposits equal to at
least 10 percent of each depositor's applicable entrance fee have been placed into
escrow for each phase for at least 50 percent of the number of residential living units
to be constructed.
(b) Applicants shall notify depositors in writing when construction is commenced.
(c) For purposes of this chapter only, construction shall not include site preparation,
demolition, or the construction of model units.
1783. Conversion of Existing Building to Continuing Care.
(a)(1) An applicant proposing to convert an existing building to continuing care use
shall comply with all the application requirements in Section 1779.4 identified by the
department as necessary for the department to assess the feasibility of the proposed
continuing care retirement community or conversion.
(2) If the proposed continuing care retirement community is already occupied and
only a portion of the existing residential units will be converted into continuing care 
43
units, the department may modify the presale requirements of paragraph (3) of
subdivision (a) of Section 1782 and paragraph (2) of subdivision (a) of Section 1783.3.
(b) Any applicant proposing to convert an existing building into continuing care
units shall indicate the portion of the facility to be used for continuing care contract
services. The continuing care allocation specified by the applicant shall be reflected in
all financial and marketing studies and shall be used to determine the applicant's
compliance with the percentage requirements stated in paragraph (3) of subdivision (a)
of Section 1782 and paragraph (2) of subdivision (a) of Section 1783.3.
1783.2. Refunds of Deposits.
(a) An escrow agent shall refund to the depositor all amounts required by the
depositor's deposit agreement upon receiving written notice from the applicant that a
depositor has canceled the deposit agreement. Refunds required by this subdivision
shall be paid to the depositor within 10 days after the depositor gives notice of
cancellation to the applicant.
(b) Depositors who have deposited more than one thousand dollars ($1,000) or
5 percent of the entrance fee, whichever is greater, and who have been notified that
construction of the proposed continuing care retirement community has commenced,
shall not be entitled to a refund of their deposit until any of the following occurs:
(1) The continuing care retirement community is opened for operation.
(2) Another depositor has reserved the canceling depositor's specific residential unit
and paid the necessary deposit.
(3) The depositor no longer meets financial or health requirements for admission.
1783.3. Release of Escrowed Funds.
(a) In order to seek a release of escrowed funds, the applicant shall petition in
writing to the department and certify to each of the following:
(1) The construction of the proposed continuing care retirement community or phase
is at least 50 percent completed.
(2) At least 10 percent of the total of each applicable entrance fee has been received
and placed in escrow for at least 60 percent of the total number of residential living
units. Any unit for which a refund is pending may not be counted toward that 60-
percent requirement.
(3) Deposits made with cash equivalents have been either converted into, or
substituted with, cash or held for transfer to the provider. A cash equivalent deposit
may be held for transfer to the provider, if all of the following conditions exist:
(A) Conversion of the cash equivalent instrument would result in a penalty or other
substantial detriment to the depositor.
(B) The provider and the depositor have a written agreement stating that the cash
equivalent will be transferred to the provider, without conversion into cash, when the
deposit escrow is released to the provider under this section.
(C) The depositor is credited the amount equal to the value of the cash equivalent.
44
(4) The applicant's average performance over any six-month period substantially
equals or exceeds its financial and marketing projections approved by the department,
for that period.
(5) The applicant has received a commitment for any permanent mortgage loan or
other long-term financing.
(b) The department shall instruct the escrow agent to release to the applicant all
deposits in the deposit escrow account when all of the following requirements have
been met:
(1) The department has confirmed the information provided by the applicant
pursuant to subdivision (a).
(2) The department has determined that there has been substantial compliance with
projected annual financial statements that served as a basis for issuance of the permit
to accept deposits.
(3) The applicant has complied with all applicable licensing requirements in a timely
manner.
(4) The applicant has obtained a commitment for any permanent mortgage loan or
other long-term financing that is satisfactory to the department.
(5) The applicant has complied with any additional reasonable requirements for
release of funds placed in the deposit escrow accounts, established by the department
under Section 1785.
(c) The escrow agent shall release the funds held in escrow to the applicant only
when the department has instructed it to do so in writing.
(d) When an application describes different phases of construction that will be
completed and commence operating at different times, the department may apply the
50-percent construction completion requirement to any one or group of phases
requested by the applicant, provided the phase or group of phases is shown in the
applicant's projections to be economically viable.
1784. Expiration of a Permit to Accept Deposits.
(a) If construction of the proposed continuing care retirement community, or
applicable phase, has not commenced within 36 months from the date the permit to
accept deposits is issued, an applicant may request an extension of the permit to accept
deposits. The request for extension shall be made to the department in writing and
shall include the reasons why construction of the proposed continuing care retirement
community was not commenced within the required 36-month period. The request for
extension shall also state the new estimated date for commencement of construction.
(b) In response to a request for an extension, the department may do one of the
following:
(1) If the department determines there is satisfactory cause for the delay in
commencement of construction of the proposed continuing care retirement community
or applicable phase, the department may extend the permit to accept deposits for up to
one year.
45
(2) If the department determines that there is no satisfactory cause for the delay, the
department may instruct the escrow agent to refund to depositors all deposits held in
escrow, plus any interest due under the terms of the deposit subscription agreements,
and require the applicant to file a new application and application fee. The applicant
shall also refund all processing fees paid by the depositors.
(c) Within 10 calendar days the applicant shall notify each depositor of the
department's approval or denial of the extension, of any expiration of the permit to
accept deposits and of any right to a refund of their deposits.
1785. Failure to Meet Projections of Financial and Marketing Plan.
(a) If, at any time prior to issuance of a certificate of authority, the applicant's
average performance over any six-month period does not substantially equal or exceed
the applicant's projections for that period, the department may take any of the
following actions:
(1) Cancel the permit to accept deposits and require that all funds in escrow be
returned to depositors immediately.
(2) Increase the required percentages of construction completed, units reserved, or
entrance fees to be deposited as required under Sections 1782, 1783.3, 1786, and
1786.2.
(3) Increase the reserve requirements under this chapter.
(b) Prior to taking any actions specified in subdivision (a), the department shall give
the applicant an opportunity to submit a feasibility study from a consultant in the area
of continuing care, approved by the department, to determine whether in his or her
opinion the proposed continuing care retirement community is still viable, and if so, to
submit a plan of correction. The department shall determine if the plan is acceptable.
(c) In making its determination, the department shall take into consideration the
overall performance of the proposed continuing care retirement community to date.
(d) If deposits have been released from escrow, the department may further require
the applicant to reopen the escrow as a condition of receiving any further entrance fee
payments from depositors or residents.
(e) The department may require the applicant to notify all depositors and, if
applicable, all residents, of any actions required by the department under this section.
46
Article 4. Certificate of Authority
1786. Provisional Certificate of Authority.
(a) The department shall issue a provisional certificate of authority when an
applicant has done all of the following:
(1) Complied with the approved marketing plans.
(2) Met and continues to meet the requirements imposed under subdivision (a) of
Section 1783.3. The issuance of the provisional certificate of authority shall not
require, and shall not be dependent upon the release of escrowed funds. Release of
escrowed funds shall be governed by Section 1783.3.
(3) Completed construction of the continuing care retirement community or
applicable phase.
(4) Obtained the required licenses.
(5) Paid the remainder of the application fee.
(6) Executed a permanent mortgage loan or other long-term financing.
(7) Provided the department with a recorded copy of the Notice of Statutory
Limitation on Transfer required by subdivision (aa) of Section 1779.4.
(8) Met all applicable provisions of this chapter.
(b) The provisional certificate of authority shall expire 12 months after issuance
unless both of the following occur:
(1) No later than 60 days prior to the expiration of the provisional certificate of
authority, the provider petitions the department and demonstrates good cause in
writing for an extension of the provisional certificate of authority.
(2) The department determines that the provider is capable of meeting the
requirements of Section 1786.2 during the extension period.
(c) The department shall exercise its discretion to determine the length of the
extension period.
(d) After the provisional certificate of authority is issued providers may continue to
take deposits by modifying the deposit agreement as appropriate. The new deposit
agreement shall clearly state the rights of the depositor and the provider. The
applicant shall submit the agreements to the department for review and approval prior
to use. A provider that holds a provisional certificate of authority or certificate of
authority may accept fees paid by potential residents to be placed on a waiting list
without using a deposit agreement. These waiting list fees may not exceed five
hundred dollars ($500), and shall be refunded to the potential resident upon written
request.
(e) All holders of a provisional certificate of authority shall request in writing a
certificate of authority when the requirements of Section 1786.2 have been met.
1786.2. Certificate of Authority.
(a) The department shall not issue a certificate of authority to an applicant or a
provider, until the department determines that each of the following has occurred:
47
(1) A provisional certificate of authority has been issued or all of the requirements
for a provisional certificate of authority have been satisfied. In the case of an
application for a new certificate of authority due to an organizational change, if the
continuing care retirement community is financially sound and operating in
compliance with this chapter, it shall be sufficient for the purposes of this paragraph
that the department has approved the application in writing.
(2) One of the following requirements has been met:
(A) At a minimum, continuing care contracts have been executed for 80 percent of
the total residential living units in the continuing care retirement community, with
payment in full of the entrance fee.
(B) At a minimum, continuing care contracts have been executed for 70 percent of
the total residential living units in the continuing care retirement community, with
payment in full of the entrance fee, and the provider has submitted an updated
financial and marketing plan, satisfactory to the department, demonstrating that the
proposed continuing care retirement community will be financially viable.
(C) At a minimum, continuing care contracts have been executed for 50 percent of
the total residential living units in the continuing care retirement community, with
payment in full of the entrance fee, and the provider furnishes and maintains a letter of
credit or other security, satisfactory to the department, sufficient to bring the total
amount of payments to a level equivalent to 80 percent of the total entrance fees for
the entire continuing care retirement community.
(3) A minimum five-year financial plan of operation remains satisfactory to the
department.
(4) Adequate reserves exist as required by Sections 1792 and 1792.6. For a new
continuing care retirement community without an operating history, the department
may approve calculation of required reserves on a pro forma basis in conjunction with
compliance with approved marketing plans.
(5) All applicable provisions of this chapter have been met.
(b) When issued, the certificate of authority, whether full or conditioned, shall
remain in full force unless forfeited by operation of law under Section 1793.7,
inactivated under Section 1793.8, or suspended or revoked by the department pursuant
to Section 1793.21.
(c) The provider shall display the certificate of authority in a prominent place within
the continuing care retirement community.
48
Article 5. Contract
1787. Agreements Between Provider and Transferor; Contents; Forms; Filing
and Approval; Size of Print.
(a) All continuing care contracts shall be in writing and shall contain all the
information required by Section 1788.
(b) All continuing care contract forms, including all addenda, exhibits, and any other
related documents, incorporated therein, as well as any modification to these items,
shall be approved by the department prior to their use.
(c) The department shall approve continuing care contract forms that comply with
this chapter. The requirements of this chapter and Chapter 3.2 (commencing with
Section 1569) shall be the bases for approval by the department. To the extent that
this chapter conflicts with Chapter 3.2 (commencing with Section 1569), this chapter
shall prevail.
(d) A continuing care contract approved by the department shall constitute the full
and complete agreement between the parties.
(e) More than one continuing care contract form may be used by a provider if
multiple program options are available.
(f) All text in continuing care contract forms shall be printed in at least 10-point
typeface.
(g) A clearly legible copy of the continuing care contract, executed by each provider
named on the provisional certificate of authority or the certificate of authority, the
resident, and any transferor, shall be furnished with all required or included
attachments to the resident at the time the continuing care contract is executed. A
copy shall also be furnished within 10 calendar days to any transferor who is not a
resident.
(h) The provider shall require a written acknowledgment from the resident (and any
transferor who is not a resident) that the executed copy of the continuing care contract
and attachments have been received.
(i) The continuing care contract shall be an admissions agreement for purposes of
the residential care facility for the elderly and long-term health care facility
requirements and shall state the resident's entitlement to receive these levels of care.
The continuing care contract may state the entitlement for skilled nursing care in
accordance with the provisions of law governing admissions to long-term health care
facilities in effect at the time of admission to the skilled nursing facility. The parties
may agree to the terms of nursing facility admission at the time the continuing care
contract is executed, or the provider may present an exemplar of the then-current
nursing facility admission agreement and require the resident to execute the form of
agreement in effect at the time of admission to the nursing facility. The terms shall
include the nursing fee, or the method of determining the fee, at the time of the
execution of the continuing care contract, the services included in and excluded from
the fee, the grounds for transfers and discharges, and any other terms required to be
included under applicable law. 
49
(j) Only the skilled nursing admission agreement sections of continuing care
contracts which cover long-term health care facility services are subject to
Chapter 3.95 (commencing with Section 1599.60). The provider shall use a skilled
nursing admission nursing agreement that complies with the requirements of
Chapter 3.95 (commencing with Section 1599.85).
1788. Provisions of Contract.
(a) A continuing care contract shall contain all of the following:
(1) The legal name and address of each provider.
(2) The name and address of the continuing care retirement community.
(3) The resident's name and the identity of the unit the resident will occupy.
(4) If there is a transferor other than the resident, the transferor shall be a party to the
contract and the transferor's name and address shall be specified.
(5) If the provider has used the name of any charitable or religious or nonprofit
organization in its title before January 1, 1979, and continues to use that name, and
that organization is not responsible for the financial and contractual obligations of the
provider or the obligations specified in the continuing care contract, the provider shall
include in every continuing care contract a conspicuous statement that clearly informs
the resident that the organization is not financially responsible.
(6) The date the continuing care contract is signed by the resident and, where
applicable, any other transferor.
(7) The duration of the continuing care contract.
(8) A list of the services that will be made available to the resident as required to
provide the appropriate level of care. The list of services shall include the services
required as a condition for licensure as a residential care facility for the elderly,
including all of the following:
(A) Regular observation of the resident's health status to ensure that his or her
dietary needs, social needs, and needs for special services are satisfied.
(B) Safe and healthful living accommodations, including housekeeping services and
utilities.
(C) Maintenance of house rules for the protection of residents.
(D) A planned activities program, which includes social and recreational activities
appropriate to the interests and capabilities of the resident.
(E) Three balanced, nutritious meals and snacks made available daily, including
special diets prescribed by a physician as a medical necessity.
(F) Assisted living services.
(G) Assistance with taking medications.
(H) Central storing and distribution of medications.
(I) Arrangements to meet health needs, including arranging transportation.
(9) An itemization of the services that are included in the monthly fee and the
services that are available at an extra charge. The provider shall attach a current fee
schedule to the continuing care contract. The schedule shall state that a provider is
prohibited from charging the resident or his or her estate a monthly fee once a unit has 
50
been permanently vacated by the resident, unless the fee is part of an equity interest
contract.
(10) The procedures and conditions under which a resident may be voluntarily and
involuntarily transferred from a designated living unit. The transfer procedures, at a
minimum, shall include provisions addressing all of the following circumstances under
which a transfer may be authorized:
(A) A continuing care retirement community may transfer a resident under the
following conditions, taking into account the appropriateness and necessity of the
transfer and the goal of promoting resident independence:
(i) The resident is nonambulatory. The definition of "nonambulatory," as provided
in Section 13131, shall either be stated in full in the continuing care contract or be
cited. If Section 13131 is cited, a copy of the statute shall be made available to the
resident, either as an attachment to the continuing care contract or by specifying that it
will be provided upon request. If a nonambulatory resident occupies a room that has a
fire clearance for nonambulatory residents, transfer shall not be necessary.
(ii) The resident develops a physical or mental condition that is detrimental to or
endangers the health, safety, or well-being of the resident or another person.
(iii) The resident's condition or needs require the resident's transfer to an assisted
living care unit or skilled nursing facility, because the level of care required by the
resident exceeds that which may be appropriately provided in the living unit.
(iv) The resident's condition or needs require the resident's transfer to a nursing
facility, hospital, or other facility, and the provider has no facilities available to
provide that level of care.
(B) Before the continuing care retirement community transfers a resident under any
of the conditions set forth in subparagraph (A), the community shall satisfy all of the
following requirements:
(i) Involve the resident and the resident's responsible person, as defined in
paragraph (6) of subdivision (r) of Section 87101 of Title 22 of the California Code of
Regulations, and upon the resident's or responsible person's request, family members,
or the resident's physician or other appropriate health professional, in the assessment
process that forms the basis for the level of care transfer decision by the provider. The
provider shall offer an explanation of the assessment process, which shall include, but
not be limited to, an evaluation of the physical and cognitive capacities of the resident.
An assessment tool or tools, including scoring and evaluating criteria, shall be used in
the determination of the appropriateness of the transfer. The provider shall make
copies of the completed assessment to share with the resident or the resident's
responsible person.
(ii) Prior to sending a formal notification of transfer, the provider shall conduct a
care conference with the resident and the resident's responsible person, and, upon the
resident's or responsible person's request, family members, and the resident's health
care professionals, to explain the reasons for transfer.
(iii) Notify the resident and the resident's responsible person of the reasons for the
transfer in writing.
51
(iv) Notwithstanding any other provision of this subparagraph, if the resident does
not have impairment of cognitive abilities, the resident may request that his or her
responsible person not be involved in the transfer process.
(v) The notice of transfer shall be made at least 30 days before the transfer is
expected to occur, except when the health or safety of the resident or other residents is
in danger, or the transfer is required by the resident's urgent medical needs. Under
those circumstances, the written notice shall be made as soon as practicable before the
transfer.
(vi) The written notice shall contain the reasons for the transfer, the effective date,
the designated level of care or location to which the resident will be transferred, a
statement of the resident's right to a review of the transfer decision at a care
conference, as provided for in subparagraph (C), and for disputed transfer decisions,
the right to review by the Continuing Care Contracts Branch of the State Department
of Social Services, as provided for in subparagraph (D). The notice shall also contain
the name, address, and telephone number of the department's Continuing Care
Contracts Branch.
(vii) The continuing care retirement community shall provide sufficient preparation
and orientation to the resident to ensure a safe and orderly transfer and to minimize
trauma.
(viii) For disputed transfer decisions, the provider shall provide documentation of
the resident’s medical reports, other documents showing the resident’s current mental
and physical function, the prognosis, and the expected duration of relevant conditions,
if applicable. The documentation shall include an explanation of how the criteria set
out in subparagraph (A) are met. The provider shall make copies of the completed
report to share with the resident’s responsible person.
(C) The resident has the right to review the transfer decision at a subsequent care
conference that shall include the resident, the resident's responsible person, and, upon
the resident's or responsible person's request, family members, the resident's physician
or other appropriate health care professional, and members of the provider's
interdisciplinary team. The local ombudsperson may also be included in the care
conference, upon the request of the resident, the resident's responsible person, or the
provider.
(D) For disputed transfer decisions, the resident or the resident's responsible person
has the right to a prompt and timely review of the transfer process by the Continuing
Care Contracts Branch of the State Department of Social Services. The branch of the
department shall provide a description of the steps a provider took and the factors a
provider considered in deciding to transfer a resident, including the assessment tool or
tools and the scoring and evaluating criteria used by the provider to justify the transfer.
(E) The decision of the department's Continuing Care Contracts Branch shall be in
writing and shall determine whether the provider failed to comply with the transfer
process pursuant to subparagraphs (A) to (C), inclusive, and whether the transfer is
appropriate and necessary. Pending the decision of the Continuing Care Contracts
Branch, the provider shall specify any additional care the provider believes is 
52
necessary in order for the resident to remain in his or her unit. The resident may be
required to pay for the extra care, as provided in the contract.
(F) Transfer of a second resident when a shared accommodation arrangement is
terminated.
(11) Provisions describing any changes in the resident's monthly fee and any
changes in the entrance fee refund payable to the resident that will occur if the resident
transfers from any unit, including, but not limited to, terminating his or her contract
after 18 months of residential temporary relocation, as defined in paragraph (8) of
subdivision (r) of Section 1771. Unless the fee is part of an equity interest contract, a
provider is prohibited from charging the resident or his or her estate a monthly fee
once a unit has been permanently vacated by the resident.
(12) The provider's continuing obligations, if any, in the event a resident is
transferred from the continuing care retirement community to another facility.
(13) The provider's obligations, if any, to resume care upon the resident's return after
a transfer from the continuing care retirement community.
(14) The provider's obligations to provide services to the resident while the resident
is absent from the continuing care retirement community.
(15) The conditions under which the resident must permanently release his or her
living unit.
(16) If real or personal properties are transferred in lieu of cash, a statement
specifying each item's value at the time of transfer, and how the value was ascertained.
(A) An itemized receipt that includes the information described above is acceptable
if incorporated as a part of the continuing care contract.
(B) When real property is or will be transferred, the continuing care contract shall
include a statement that the deed or other instrument of conveyance shall specify that
the real property is conveyed pursuant to a continuing care contract and may be subject
to rescission by the transferor within 90 days from the date that the resident first
occupies the residential unit.
(C) The failure to comply with this paragraph shall not affect the validity of title to
real property transferred pursuant to this chapter.
(17) The amount of the entrance fee.
(18) In the event two parties have jointly paid the entrance fee or other payment that
allows them to occupy the unit, the continuing care contract shall describe how any
refund of entrance fees is allocated.
(19) The amount of any processing fee.
(20) The amount of any monthly care fee.
(21) For continuing care contracts that require a monthly care fee or other periodic
payment, the continuing care contract shall include the following:
(A) A statement that the occupancy and use of the accommodations by the resident
is contingent upon the regular payment of the fee.
(B) The regular rate of payment agreed upon (per day, week, or month).
(C) A provision specifying whether payment will be made in advance or after
services have been provided.
53
(D) A provision specifying the provider will adjust monthly care fees for the
resident's support, maintenance, board, or lodging, when a resident requires medical
attention while away from the continuing care retirement community.
(E) A provision specifying whether a credit or allowance will be given to a resident
who is absent from the continuing care retirement community or from meals. This
provision shall also state, when applicable, that the credit may be permitted at the
discretion or by special permission of the provider.
(F) A statement of billing practices, procedures, and timelines. A provider shall
allow a minimum of 14 days between the date a bill is sent and the date payment is
due. A charge for a late payment may only be assessed if the amount and any
condition for the penalty is stated on the bill.
(G) A statement that the provider is prohibited from charging the resident or his or
her estate a monthly fee once a unit has been permanently vacated by the resident,
unless the fee is part of an equity interest contract.
(22) All continuing care contracts that include monthly care fees shall address
changes in monthly care fees by including either of the following provisions:
(A) For prepaid continuing care contracts, which include monthly care fees, one of
the following methods:
(i) Fees shall not be subject to change during the lifetime of the agreement.
(ii) Fees shall not be increased by more than a specified number of dollars in any
one year and not more than a specified number of dollars during the lifetime of the
agreement.
(iii) Fees shall not be increased in excess of a specified percentage over the
preceding year and not more than a specified percentage during the lifetime of the
agreement.
(B) For monthly fee continuing care contracts, except prepaid contracts, changes in
monthly care fees shall be based on projected costs, prior year per capita costs, and
economic indicators.
(23) A provision requiring that the provider give written notice to the resident at
least 30 days in advance of any change in the resident's monthly care fees or in the
price or scope of any component of care or other services.
(24) A provision indicating whether the resident's rights under the continuing care
contract include any proprietary interests in the assets of the provider or in the
continuing care retirement community, or both. Any statement in a contract
concerning an ownership interest shall appear in a large-sized font or print.
(25) If the continuing care retirement community property is encumbered by a
security interest that is senior to any claims the residents may have to enforce
continuing care contracts, a provision shall advise the residents that any claims they
may have under the continuing care contract are subordinate to the rights of the
secured lender. For equity projects, the continuing care contract shall specify the type
and extent of the equity interest and whether any entity holds a security interest.
(26) Notice that the living units are part of a continuing care retirement community
that is licensed as a residential care facility for the elderly and, as a result, any duly 
54
authorized agent of the department may, upon proper identification and upon stating
the purpose of his or her visit, enter and inspect the entire premises at any time,
without advance notice.
(27) A conspicuous statement, in at least 10-point boldface type in immediate
proximity to the space reserved for the signatures of the resident and, if applicable, the
transferor, that provides as follows: "You, the resident or transferor, may cancel the
transaction without cause at any time within 90 days from the date you first occupy
your living unit. See the attached notice of cancellation form for an explanation of this
right."
(28) Notice that during the cancellation period, the continuing care contract may be
canceled upon 30 days' written notice by the provider without cause, or that the
provider waives this right.
(29) The terms and conditions under which the continuing care contract may be
terminated after the cancellation period by either party, including any health or
financial conditions.
(30) A statement that, after the cancellation period, a provider may unilaterally
terminate the continuing care contract only if the provider has good and sufficient
cause.
(A) Any continuing care contract containing a clause that provides for a continuing
care contract to be terminated for "just cause," "good cause," or other similar
provision, shall also include a provision that none of the following activities by the
resident, or on behalf of the resident, constitutes "just cause," "good cause," or
otherwise activates the termination provision:
(i) Filing or lodging a formal complaint with the department or other appropriate
authority.
(ii) Participation in an organization or affiliation of residents, or other similar lawful
activity.
(B) The provision required by this paragraph shall also state that the provider shall
not discriminate or retaliate in any manner against any resident of a continuing care
retirement community for contacting the department, or any other state, county, or city
agency, or any elected or appointed government official to file a complaint or for any
other reason, or for participation in a residents' organization or association.
(C) Nothing in this paragraph diminishes the provider's ability to terminate the
continuing care contract for good and sufficient cause.
(31) A statement that at least 90 days' written notice to the resident is required for a
unilateral termination of the continuing care contract by the provider.
(32) A statement concerning the length of notice that a resident is required to give
the provider to voluntarily terminate the continuing care contract after the cancellation
period.
(33) The policy or terms for refunding or repaying a lump sum of any portion of the
entrance fee, in the event of cancellation, termination, or death. Every continuing care
contract that provides for a refund or repaying a lump sum of all or a part of the
entrance fee shall also do all of the following:
55
(A) Specify the amount, if any, the resident has paid or will pay for upgrades,
special features, or modifications to the resident's unit.
(B) State that if the continuing care contract is canceled or terminated by the
provider, the provider shall do both of the following:
(i) Amortize the specified amount at the same rate as the resident's entrance fee.
(ii) Refund the unamortized balance to the resident at the same time the provider
pays the resident's entrance fee refund.
(C) State that the resident has a right to terminate his or her contract after 18 months
of residential temporary relocation, as defined in paragraph (8) of subdivision (r) of
Section 1771. Provisions for refunds due to cancellation pursuant to this subparagraph
shall be set forth in the contract.
 (D) State the provider shall make a good-faith effort to reoccupy or resell a unit for
which a lump-sum payment is conditioned upon resale of the unit. No later than July 1,
2017, a provider shall provide notice to all current residents with contracts applicable
to this subparagraph regarding the statement required by this subparagraph as a
clarification of the resident’s existing contract.
(E) For all contracts with a repayment of all or a portion of the entrance fee
conditioned upon the resale of the unit, the provider shall state the average and longest
amount of time that it has taken to resell a unit within the last five calendar years.
(34) The following notice at the bottom of the signatory page:
"NOTICE" (date)
This is a continuing care contract as defined by paragraph (8) of subdivision (c), or
subdivision (l) of Section 1771 of the California Health and Safety Code. This
continuing care contract form has been approved by the State Department of Social
Services as required by subdivision (b) of Section 1787 of the California Health and
Safety Code. The basis for this approval was a determination that (provider name) has
submitted a contract that complies with the minimum statutory requirements
applicable to continuing care contracts. The department does not approve or
disapprove any of the financial or health care coverage provisions in this contract.
Approval by the department is NOT a guaranty of performance or an endorsement of
any continuing care contract provisions. Prospective transferors and residents are
strongly encouraged to carefully consider the benefits and risks of this continuing care
contract and to seek financial and legal advice before signing.
(35) The provider may not attempt to absolve itself in the continuing care contract
from liability for its negligence by any statement to that effect, and shall include the
following statement in the contract: "Nothing in this continuing care contract limits
either the provider's obligation to provide adequate care and supervision for the
resident or any liability on the part of the provider which may result from the
provider's failure to provide this care and supervision."
56
(36) Provisions describing how the provider will proceed in the event of a closure,
including an explanation of how the provider will comply with Sections 1793.80,
1793.81, 1793.82, and 1793.83.
(b) A life care contract shall also provide that:
(1) All levels of care, including acute care and physicians' and surgeons' services,
will be provided to a resident.
(2) Care will be provided for the duration of the resident's life unless the life care
contract is canceled or terminated by the provider during the cancellation period or
after the cancellation period for good cause.
(3) A comprehensive continuum of care will be provided to the resident, including
skilled nursing, in a facility under the ownership and supervision of the provider on, or
adjacent to, the continuing care retirement community premises.
(4) Monthly care fees will not be changed based on the resident's level of care or
service.
(5) A resident who becomes financially unable to pay his or her monthly care fees
shall be subsidized provided the resident's financial need does not arise from action by
the resident to divest the resident of his or her assets.
(c) Continuing care contracts may include provisions that do any of the following:
(1) Subsidize a resident who becomes financially unable to pay for his or her
monthly care fees at some future date. If a continuing care contract provides for
subsidizing a resident, it may also provide for any of the following:
(A) The resident shall apply for any public assistance or other aid for which he or
she is eligible and that the provider may apply for assistance on behalf of the resident.
(B) The provider's decision shall be final and conclusive regarding any adjustments
to be made or any action to be taken regarding any charitable consideration extended
to any of its residents.
(C) The provider is entitled to payment for the actual costs of care out of any
property acquired by the resident subsequent to any adjustment extended to the
resident under this paragraph, or from any other property of the resident that the
resident failed to disclose.
(D) The provider may pay the monthly premium of the resident's health insurance
coverage under Medicare to ensure that those payments will be made.
(E) The provider may receive an assignment from the resident of the right to apply
for and to receive the benefits, for and on behalf of the resident.
(F) The provider is not responsible for the costs of furnishing the resident with any
services, supplies, and medication, when reimbursement is reasonably available from
any governmental agency, or any private insurance.
(G) Any refund due to the resident at the termination of the continuing care contract
may be offset by any prior subsidy to the resident by the provider.
(2) Limit responsibility for costs associated with the treatment or medication of an
ailment or illness existing prior to the date of admission. In these cases, the medical or
surgical exceptions, as disclosed by the medical entrance examination, shall be listed 
57
in the continuing care contract or in a medical report attached to and made a part of the
continuing care contract.
(3) Identify legal remedies that may be available to the provider if the resident
makes any material misrepresentation or omission pertaining to the resident's assets or
health.
(4) Restrict transfer or assignments of the resident's rights and privileges under a
continuing care contract due to the personal nature of the continuing care contract.
(5) Protect the provider's ability to waive a resident's breach of the terms or
provisions of the continuing care contract in specific instances without relinquishing
its right to insist upon full compliance by the resident with all terms or provisions in
the contract.
(6) Provide that the resident shall reimburse the provider for any uninsured loss or
damage to the resident's unit, beyond normal wear and tear, resulting from the
resident's carelessness or negligence.
(7) Provide that the resident agrees to observe the off-limit areas of the continuing
care retirement community designated by the provider for safety reasons. The
provider may not include any provision in a continuing care contract that absolves the
provider from liability for its negligence.
(8) Provide for the subrogation to the provider of the resident's rights in the case of
injury to a resident caused by the acts or omissions of a third party, or for the
assignment of the resident's recovery or benefits in this case to the provider, to the
extent of the value of the goods and services furnished by the provider to or on behalf
of the resident as a result of the injury.
(9) Provide for a lien on any judgment, settlement, or recovery for any additional
expense incurred by the provider in caring for the resident as a result of injury.
(10) Require the resident's cooperation and assistance in the diligent prosecution of
any claim or action against any third party.
(11) Provide for the appointment of a conservator or guardian by a court with
jurisdiction in the event a resident becomes unable to handle his or her personal or
financial affairs.
(12) Allow a provider, whose property is tax exempt, to charge the resident, on a pro
rata basis, property taxes, or in-lieu taxes, that the provider is required to pay.
(13) Make any other provision approved by the department.
(d) A copy of the resident's rights as described in Section 1771.7 shall be attached to
every continuing care contract.
(e) A copy of the current audited financial statement of the provider shall be
attached to every continuing care contract. For a provider whose current audited
financial statement does not accurately reflect the financial ability of the provider to
fulfill the continuing care contract obligations, the financial statement attached to the
continuing care contract shall include all of the following:
(1) A disclosure that the reserve requirement has not yet been determined or met,
and that entrance fees will not be held in escrow.
58
(2) A disclosure that the ability to provide the services promised in the continuing
care contract will depend on successful compliance with the approved financial plan.
(3) A copy of the approved financial plan for meeting the reserve requirements.
(4) Any other supplemental statements or attachments necessary to accurately
represent the provider's financial ability to fulfill its continuing care contract
obligations.
(f) A schedule of the average monthly care fees charged to residents for each type
of residential living unit for each of the five years preceding execution of the
continuing care contract shall be attached to every continuing care contract. The
provider shall update this schedule annually at the end of each fiscal year. If the
continuing care retirement community has not been in existence for five years, the
information shall be provided for each of the years the continuing care retirement
community has been in existence.
(g) If any continuing care contract provides for a health insurance policy for the
benefit of the resident, the provider shall attach to the continuing care contract a binder
complying with Sections 382 and 382.5 of the Insurance Code.
(h) The provider shall attach to every continuing care contract a completed form in
duplicate, captioned "Notice of Cancellation." The notice shall be easily detachable,
and shall contain, in at least 10-point boldface type, the following statement:
"NOTICE OF CANCELLATION" (date)
Your first date of occupancy under this contract is:
__________________________________________________________
 "You may cancel this transaction, without any penalty within 90 calendar days from
the above date.
 If you cancel, any property transferred, any payments made by you under the
contract, and any negotiable instrument executed by you will be returned within
14 calendar days after making possession of the living unit available to the provider.
Any security interest arising out of the transaction will be canceled.
 If you cancel, you are obligated to pay a reasonable processing fee to cover costs and
to pay for the reasonable value of the services received by you from the provider up to
the date you canceled or made available to the provider the possession of any living
unit delivered to you under this contract, whichever is later.
 If you cancel, you must return possession of any living unit delivered to you under
this contract to the provider in substantially the same condition as when you took
possession.
 Possession of the living unit must be made available to the provider within 20
calendar days of your notice of cancellation. If you fail to make the possession of any
living unit available to the provider, then you remain liable for performance of all
obligations under the contract.
59
 To cancel this transaction, mail or deliver a signed and dated copy of this
cancellation notice, or any other written notice, or send a telegram
to ______________________________________________________________
 (Name of provider)
at _______________________________________________________________
 (Address of provider's place of business)
not later than midnight of _____________ (date).
I hereby cancel this transaction ____________________________________
 (Resident or Transferor's signature)"
1788.2. Cancellation.
(a) A continuing care contract may be canceled without cause by written notice from
either party within 90 days from the date of the resident's initial occupancy.
(b) For all continuing care contracts, death of the resident before or during the
cancellation period shall constitute a cancellation of the continuing care contract under
subdivision (a), unless the continuing care contract includes specific provisions
otherwise.
(c) The cancellation period and the associated refund obligations shall apply as
follows:
(1) To all executed continuing care contracts regarding a unit in a continuing care
retirement community that is not an equity continuing care retirement community.
(2) To continuing care contracts executed in conjunction with a purchase of an
equity interest from a provider but not to continuing care contracts executed in
conjunction with sales of an equity interest by one resident to another.
(d) The following fees may be charged before or during the 90-day cancellation
period:
(1) If possession of the living unit in a continuing care retirement community that is
not an equity continuing care retirement community is returned to the provider in
substantially the same condition as when received, the resident's only obligations shall
be to pay a reasonable fee to cover costs and to pay the reasonable value of services
rendered pursuant to the canceled continuing care contract.
(2) Equity project providers may impose a resale fee on sellers. For contracts
entered into after January 1, 1996, upon the cancellation of a continuing care contract
executed in conjunction with the purchase of an equity interest from the provider, the
provider may charge a resale fee not to exceed the excess of the gross resale price of
the equity interest over the purchase price paid by the resident or on behalf of the
resident for the interest.
(e) No resale fee shall exceed the sum of 10 percent of either the original or resale
price of the equity interest and 100 percent of the excess if any, of the gross resale 
60
price of the equity interest over the purchase price paid by the resident or on behalf of
the resident for the interest if either of the following applies:
(1) The continuing care contract involved the purchase of an equity interest from the
provider and is terminated after the cancellation period.
(2) The continuing care contract involved the purchase of an equity interest from
another resident and is terminated at any time.
(f) For purposes of this section, "gross resale price" means the resale price before
any deductions for resale fees, transfer taxes, real estate commissions, periodic fees,
late charges, interest, escrow fees, or any other fees incidental to the sale of real
property.
(g) This section may not be construed to limit the provider's ability to withhold
delinquent periodic fees, late charges, accrued interest, or assessments from the sale
proceeds, as provided by the continuing care contract or the real estate documents
governing the equity continuing care retirement community.
1788.4. Refunds.
(a) During the cancellation period, the provider shall pay all refunds owed to a
resident within 14 calendar days after a resident makes possession of the living unit
available to the provider.
(b) After the cancellation period, any refunds due to a resident under a continuing
care contract shall be paid within 14 calendar days after a resident makes possession of
the living unit available to the provider or 90 calendar days after death or receipt of
notice of termination, whichever is later.
(c) In nonequity projects, if the continuing care contract is canceled by either party
during the cancellation period or terminated by the provider after the cancellation
period, the resident shall be refunded the difference between the total amount of
entrance, monthly, and optional fees paid and the amount used for care of the resident.
(d) If a resident has paid additional amounts for upgrades, special features, or
modifications to the living unit and the provider terminates the resident's continuing
care contract, the provider shall amortize those additional amounts at the same rate as
the entrance fee and shall refund the unamortized balance to the resident.
 (e) A lump-sum payment after termination of a repayable contract, as defined in
paragraph (3) of subdivision (r) of Section 1771, shall not be considered to be a refund
and may not be characterized or advertised as a refund. The full lump sum owed,
including any interest accrued, shall be paid to the resident or the resident’s estate
within 14 calendar days after resale of the unit.
 (f)(1) Any balance of the lump sum owed that has not been paid to the resident or the
resident’s estate within 180 days after termination of a repayable contract shall accrue
interest at a rate calculated pursuant to paragraph (2). Any balance of the lump sum
owed that has not been paid to the resident or the resident’s estate within 240 days
after termination of a repayable contract shall accrue interest at a rate calculated
pursuant to paragraph (3). Interest shall continue to accrue annually pursuant to
paragraph (4) until the date the full lump sum owed is paid to the resident or the 
61
resident’s estate. This subdivision shall apply only to repayable contracts entered into
on or after January 1, 2017.
 (2) Any amount owed that is not paid to the resident or the resident’s estate within
the 180-day period pursuant to paragraph (1) shall accrue simple interest at a rate of
4 percent of the amount owed.
 (3) Any amount owed that is not paid to the resident or the resident’s estate within
the 240-day period pursuant to paragraph (1) shall accrue simple interest at a rate of
6 percent of the amount owed.
 (4) Any amount owed that is not paid to the resident or the resident’s estate within
one year after the 240-day period pursuant to paragraph (3) shall accrue interest at a
rate of 6 percent, compounded annually.
 (5) Until January 1, 2018, this subdivision shall not apply to a project that is in
development prior to January 1, 2017, including current repayable agreements, current
deposit agreements that contemplate repayable entrance fees, and other projects that
have received department approval to market units pursuant to Section 1771.4, or have
received issuer, lender, or bond insurer approval to obtain bond financing, or other
governmental approval based on a repayable entrance fee option, if the initial contract
for the project is entered into on or before January 1, 2018.
 (g) Except as otherwise obligated by an equity interest contract, once the unit has
been vacated and made available to the provider, the provider shall not make any
further charges to the resident or his or her estate or charges against the lump sum
owed to the resident or the resident’s estate for purposes of continued monthly
payments to the provider or for maintenance or housekeeping on the vacated unit.
 (h) Nothing in this section shall be construed to limit or alter any legal remedies
otherwise available to a resident or his or her estate. 
62
Article 6. Reporting and Reserve Requirements.
1789. Notice of Proposed Changes.
(a) A provider shall notify the department and obtain its approval before making any
changes to any of the following: its name; its business structure or form of doing
business; the overall management of its continuing care retirement community; or the
terms of its financing.
(b) The provider shall give written notice of proposed changes to the department at
least 60 calendar days in advance of making the changes described in this section.
(c) This notice requirement does not apply to routine facility staff changes.
(d) Within 10 calendar days of submitting notification to the department of any
proposed changes under subdivision (a), the provider shall notify the resident
association of the proposed changes in the manner required by subdivision (e) of
Section 1779.
1789.1. Disclosure Statements.
(a) Before executing a deposit agreement or continuing care agreement, or receiving
any payment from a depositor or prospective resident, a provider shall deliver to the
other parties in the deposit or continuing care agreement a disclosure statement in the
form prescribed by the department.
(b) The department shall issue a disclosure statement form that shall generally
require disclosure, at a minimum, of the following information:
(1) General information regarding the provider and the continuing care retirement
community, including at a minimum all of the following:
(A) The continuing care retirement community's name, address, and telephone
number.
(B) The type of ownership, names of the continuing care retirement community's
owner and operator, the names of any affiliated facilities, and any direct religious
affiliation.
(C) Whether accredited and by what organization.
(D) The year the continuing care retirement community opened and the distance to
the nearest shopping center and hospital.
(E) Whether the continuing care retirement community offers life care contracts or
continuing care contracts, and whether the continuing care retirement community is
single story or multistory.
(F) The number of the continuing care retirement community's studio units, one
bedroom units, two bedroom units, cottages or houses, assisted living beds, and skilled
nursing beds.
(G) The continuing care retirement community's percentage occupancy at the
provider's most recent fiscal yearend.
(H) The form of contracts offered, the range of entrance fees, the percentages of a
resident's entrance fees that may be refunded, and the health care benefits included in
contract.
63
(I) Any age and insurance requirements for admission.
(J) A listing of common area amenities and other services included with the monthly
service fee, and a listing of those amenities and services that are available for an
additional charge.
(K) The number of meals each day included in the monthly service fee, the number
of meals available for an extra charge, the frequency of housekeeping services, and
additional cost, if any, for housekeeping services.
(2) Income from operations during the most recent five years for which audited
financial statements have been completed, including all of the following:
(A) Operating income (excluding amortization of entrance fee income).
(B) Operating expense (excluding depreciation, amortization, and interest).
(C) Net income from operations.
(D) Interest expense.
(E) Unrestricted contributions.
(F) Nonoperating income or expense, excluding extraordinary items.
(G) Net income or loss before entrance fees.
(H) Net cash-flow from entrance fees, that is the total deposits less refunds.
(3) The name of the lender, outstanding balance, interest rate, date of origination,
date of maturity, and amortization period for all secured debt.
(4) Financial ratios for each of the three most recent years for which audited
financial statements have been prepared, including all of the following: debt-to-asset
ratio, operating ratio, debt service coverage ratio, and days cash-on-hand. The
formulas for each ratio shall be determined by the department after consultation with
the Continuing Care Advisory Committee.
(5) The average monthly service fees charged during the most recent five years, and
the percentage changes in the average from year to year, for each of the following:
studio units, one bedroom units, two bedroom units, cottages and houses, assisted
living units, and skilled nursing units.
(6) Comments from the provider explaining any of the information included in the
disclosure form.
(c) Each provider shall update its disclosure statement at least annually when it
completes its annual audited financial statements. Each provider shall file its updated
version of the disclosure statement with the department not later than the final filing
date for its annual report.
(d) The form prescribed by the department under this section shall be used by
providers to comply with the requirements of this section.
1789.2. Increases to Encumbrances on Property or Revenues.
(a) A provider shall provide the department with written notice at least 90 calendar
days prior to closing any transaction that results in an encumbrance or lien on a
continuing care retirement community property or its revenues.
(b) The written notice required by this section shall include all of the following:
(1) A description of the terms and amount of the proposed transaction.
64
(2) An analysis of the sources of funds for repayment of principal and interest.
(3) An analysis of the impact of the proposed transaction on monthly care fees.
(4) An analysis of the impact that the proposed encumbrance would have on assets
available for liquid reserves required by Section 1792, and refund reserves required by
Section 1792.6.
(c) Within seven calendar days of receipt of notice of proposed changes, the
department shall acknowledge receipt of the notice in writing.
(d) Within 30 calendar days following its receipt of the notice, the department shall
inform the provider in writing whether additional materials are required to evaluate the
transaction.
(e) Within 90 calendar days following its receipt of additional materials, the
department shall inform the provider of its approval or denial of the proposed
transaction.
(f) Providers shall not execute the proposed financial transaction for which notice
has been given pursuant to subdivision (a) without the department's written
authorization unless either the 30-day response period or the 90 calendar day period
for the department's review of the provider's request has expired without any response
by the department.
(g) If the department determines that the proposed financial transaction will
materially increase monthly care fees or impair the provider's ability to maintain
required reserves, the department may:
(1) Refuse to approve the transaction.
(2) Record a notice of lien on the provider's property pursuant to Section 1793.15
after notifying the provider and giving the provider an opportunity to withdraw the
planned transaction.
(3) Take both actions and any other action that it determines is necessary to protect
the best interests of the residents.
(h) Within 10 calendar days of submitting notification to the department of any
proposed encumbrance to the community property, the provider shall notify the
resident governing body or association of the proposed encumbrance in the manner
required by subdivision (e) of Section 1779.
1789.4. Sale or Transfer of Continuing Care Retirement Community.
(a) A provider for a continuing care retirement community shall obtain approval
from the department before consummating any sale or transfer of the continuing care
retirement community or any interest in that community, other than sale of an equity
interest in a unit to a resident or other transferor.
(b) The provider shall provide written notice to the department at least 120 calendar
days prior to consummating the proposed transaction.
(c) The notice required by this section shall include all of the following:
(1) The identity of the purchaser.
(2) A description of the terms of the transfer or sale, including the sales price.
65
(3) A plan for ensuring performance of the existing continuing care contract
obligations.
(d) The provider shall give written notice to all continuing care contract residents
and depositors 120 calendar days prior to the sale or transfer. The notice shall do all of
the following:
(1) Describe the parties.
(2) Describe the proposed sale or transfer.
(3) Describe the arrangements for fulfilling continuing care contract obligations.
(4) Describe options available to any depositor or resident who does not wish to
have his or her contract assumed by a new provider.
(5) Include an acknowledgment of receipt of the notice to be signed by the resident.
(e) Unless a new provider assumes all of the continuing care obligations of the
selling provider at the close of the sale or transfer, the selling provider shall set up a
trust fund or secure a performance bond to ensure the fulfillment of all its continuing
care contract obligations.
(f) The purchaser shall make applications for, and obtain, the appropriate licenses
and a certificate of authority before executing any continuing care contracts or
assuming the selling provider's continuing care contract obligations.
1789.6. Notice of Statutory Limitation on Transfer.
A provider shall record with the county recorder a "Notice of Statutory Limitation on
Transfer" for each community as required by subdivision (aa) of Section 1779.4 and
Section 1786.
1789.8. Fidelity Bonds for Employees.
Each provider shall obtain and maintain in effect insurance or a fidelity bond for
each agent or employee, who, in the course of his or her agency or employment, has
access to any substantial amount of funds. This requirement is separate from the
bonding requirements of residential care facility for the elderly regulations.
1790. Annual Reports.
(a) Each provider that has obtained a provisional or final certificate of authority and
each provider that possesses an inactive certificate of authority shall submit an annual
report of its financial condition. The report shall consist of audited financial
statements and required reserve calculations, with accompanying certified public
accountants' opinions thereon, the reserve information required by paragraph (2),
Continuing Care Provider Fee and Calculation Sheet, evidence of fidelity bond as
required by Section 1789.8, and certification that the continuing care contract in use
for new residents has been approved by the department, all in a format provided by the
department, and shall include all of the following information:
(1) A certification, if applicable, that the entity is maintaining reserves for prepaid
continuing care contracts, statutory reserves, and refund reserves.
66
(2) Full details on the status, description, and amount of all reserves that the
provider currently designates and maintains, and on per capita costs of operation for
each continuing care retirement community operated.
(3) Disclosure of any amounts accumulated or expended for identified projects or
purposes, including, but not limited to, projects designated to meet the needs of the
continuing care retirement community as permitted by a provider's nonprofit status
under Section 501(c)(3) of the Internal Revenue Code, and amounts maintained for
contingencies. The disclosure of a nonprofit provider shall state how the project or
purpose is consistent with the provider's tax-exempt status. The disclosure of a forprofit provider shall identify amounts accumulated for specific projects or purposes
and amounts maintained for contingencies. Nothing in this subdivision shall be
construed to require the accumulation of funds or funding of contingencies, nor shall it
be interpreted to alter existing law regarding the reserves that are required to be
maintained.
(4) Full details on any increase in monthly care fees, the basis for determining the
increase, and the data used to calculate the increase.
(5) The required reserve calculation schedules shall be accompanied by the auditor's
opinion as to compliance with applicable statutes.
(6) Any other information as the department may require.
(b) Each provider shall file the annual report with the department within four
months after the provider's fiscal yearend. If the complete annual report is not
received by the due date, a one thousand dollar ($1,000) late fee shall accompany
submission of the reports. If the reports are more than 30 days past due, an additional
fee of thirty-three dollars ($33) for each day over the first 30 days shall accompany
submission of the report. The department may, at its discretion, waive the late fee for
good cause.
(c) The annual report and any amendments thereto shall be signed and certified by
the chief executive officer of the provider, stating that, to the best of his or her
knowledge and belief, the items are correct.
(d) A copy of the most recent annual audited financial statement shall be transmitted
by the provider to each transferor requesting the statement.
(e) A provider shall amend its annual report on file with the department at any time,
without the payment of any additional fee, if an amendment is necessary to prevent the
report from containing a material misstatement of fact or omitting a material fact.
(f) If a provider is no longer entering into continuing care contracts, and currently is
caring for 10 or fewer continuing care residents, the provider may request permission
from the department, in lieu of filing the annual report, to establish a trust fund or to
secure a performance bond to ensure fulfillment of continuing care contract
obligations. The request shall be made each year within 30 days after the provider's
fiscal yearend. The request shall include the amount of the trust fund or performance
bond determined by calculating the projected life costs, less the projected life revenue,
for the remaining continuing care residents in the year the provider requests the 
67
waiver. If the department approves the request, the following shall be submitted to the
department annually:
(1) Evidence of trust fund or performance bond and its amount.
(2) A list of continuing care residents. If the number of continuing care residents
exceeds 10 at any time, the provider shall comply with the requirements of this
section.
(3) A provider fee as required by subdivision (c) of Section 1791.
(g) If the department determines a provider's annual audited report needs further
analysis and investigation, as a result of incomplete and inaccurate financial
statements, significant financial deficiencies, development of work out plans to
stabilize financial solvency, or for any other reason, the provider shall reimburse the
department for reasonable actual costs incurred by the department or its representative.
The reimbursed funds shall be deposited in the Continuing Care Contract Provider Fee
Fund.
1791. Annual Provider Fees.
(a) An annual fee shall be required of each provider which has obtained a
provisional or final certificate of authority.
(b) Each annual report submitted pursuant to Section 1790 shall be accompanied by
a payment to the Continuing Care Provider Fee Fund in the amount of one-tenth of 1
percent of the portion of total operating expenses, excluding debt service and
depreciation from audited financial statements, which has been allocated to continuing
care contract residents. The allocation shall be based on the ratio of the mean number
of total residents.
(c) If a provider is granted an exemption from filing annual reports to the
department pursuant to subdivision (f) of Section 1790, the minimum annual provider
fee shall be two hundred fifty dollars ($250). This fee shall be submitted after the end
of the provider's fiscal year with proof of trust fund or performance bond as required
by subdivision (f) of Section 1790.
1792. Liquid Reserve Requirement; Amount.
(a) A provider shall maintain at all times qualifying assets as a liquid reserve in an
amount that equals or exceeds the sum of the following:
(1) The amount the provider is required to hold as a debt service reserve under
Section 1792.3.
(2) The amount the provider must hold as an operating expense reserve under
Section 1792.4.
(b) The liquid reserve requirement described in this section is satisfied when a
provider holds qualifying assets in the amount required. Except as may be required
under subdivision (d), a provider is not required to set aside, deposit into an escrow, or
otherwise restrict the assets it holds as its liquid reserve.
(c) A provider shall not allow the amount it holds as its liquid reserve to fall below
the amount required by this section. In the event the amount of a provider's liquid 
68
reserve is insufficient, the provider shall prudently eliminate the deficiency by
increasing its assets qualifying under Section 1792.2.
(d) The department may increase the amount a provider is required to hold as its
liquid reserve or require that a provider immediately place its liquid reserve into an
escrow account meeting the requirements of Section 1781 if the department has reason
to believe the provider is any of the following:
(1) Insolvent.
(2) In imminent danger of becoming insolvent.
(3) In a financially unsound or unsafe condition.
(4) In a condition such that it may otherwise be unable to fully perform its
obligations pursuant to continuing care contracts.
(e) For providers that have voluntarily and permanently discontinued entering into
continuing care contracts, the department may allow a reduced liquid reserve amount
if the department finds that the reduction is consistent with the financial protections
imposed by this article. The reduced liquid reserve amount shall be based upon the
percentage of residents at the continuing care retirement community who have
continuing care contracts.
1792.2. Qualifying Assets.
(a) A provider shall satisfy its liquid reserve obligation with qualifying assets.
Qualifying assets are:
(1) Cash.
(2) Cash equivalents as defined in paragraph (4) of subdivision (c) of Section 1771.
(3) Investment securities, as defined in paragraph (2) of subdivision (i) of
Section 1771.
(4) Equity securities, including mutual funds, as defined in paragraph (7) of
subdivision (e) of Section 1771.
(5) Lines of credit and letters of credit that meet the requirements of this paragraph.
The line of credit or letter of credit shall be issued by a state or federally chartered
financial institution approved by the department or whose long-term debt is rated in
the top three long-term debt rating categories by either Moody's Investors Service,
Standard and Poor's Corporation, or a recognized securities rating agency acceptable to
the department. The line of credit or letter of credit shall obligate the financial
institution to furnish credit to the provider.
(A) The terms of the line of credit or letter of credit shall at a minimum provide both
of the following:
(i) The department's approval shall be obtained by the provider and communicated
in writing to the financial institution before any modification.
(ii) The financial institution shall fund the line of credit or letter of credit and pay
the proceeds to the provider no later than four business days following written
instructions from the department that, in the sole judgment of the department, funding
of the provider's minimum liquid reserve is required.
69
(B) The provider shall provide written notice to the department at least 14 days
before the expiration of the line of credit or letter of credit if the term has not been
extended or renewed by that time. The notice shall describe the qualifying assets the
provider will use to satisfy the liquid reserve requirement when the line of credit or
letter of credit expires.
(C) A provider may satisfy all or a portion of its liquid reserve requirement with the
available and unused portion of a qualifying line of credit or letter of credit.
(6) For purposes of satisfying all or a portion of a provider's debt service reserve
requirement described in Section 1792.3, restricted assets that are segregated or held in
a separate account or escrow as a debt service reserve under the terms of the provider's
long-term debt instruments are qualifying assets, subject to all of the following
conditions:
(A) The assets are restricted by the debt instrument so that they may be used only to
pay principal, interest, and credit enhancement premiums.
(B) The provider furnishes to the department a copy of the agreement under which
the restricted assets are held and certifies that it is a correct and complete copy. The
provider, escrow holder, or other entity holding the assets must agree to provide to the
department any information the department may request concerning the debt service
reserve it holds.
(C) The market value, or guaranteed value, if applicable, of the restricted assets, up
to the amount the provider must hold as a debt reserve under Section 1792.3, will be
included as part of the provider's liquid reserve.
(D) The restricted assets described in this paragraph will not reduce or count
towards the amount the provider must hold in its liquid reserve for operating expenses.
(7) For purposes of satisfying all or a portion of a provider's operating expense
reserve requirement described in Section 1792.4, restricted assets that are segregated
or held in a separate account or escrow as a reserve for operating expenses, are
qualifying assets subject to all of the following conditions:
(A) The governing instrument restricts the assets so that they may be used only to
pay operating costs when operating funds are insufficient.
(B) The provider furnishes to the department a copy of the agreement under which
the assets are held, certified by the provider to be a correct and complete copy. The
provider, escrow holder, or other entity holding the assets shall agree to provide to the
department any information the department may request concerning the account.
(C) The market value, or the guaranteed value, if applicable, of the restricted assets,
up to the amount the provider is required to hold as an operating expense reserve under
Section 1792.4, will be included as part of the provider's liquid reserve.
(D) The restricted assets described in this paragraph shall not reduce or count
towards the amount the provider is required to hold in its liquid reserve for long-term
debt.
(b) Except as otherwise provided in this subdivision, the assets held by the provider
as its liquid reserve may not be subject to any liens, charges, judgments, garnishments,
or creditors' claims and may not be hypothecated, pledged as collateral, or otherwise 
70
encumbered in any manner. A provider may encumber assets held in its liquid reserve
as part of a general security pledge of assets or similar collateralization that is part of
the provider's long-term capital debt covenants and is included in the provider's longterm debt indenture or similar instrument.
1792.3. Debt Service Reserve Amount.
(a) Each provider shall include in its liquid reserve a reserve for its long-term debt
obligations in an amount equal to the sum of all of the following:
(1) All regular principal and interest payments, as well as credit enhancement
premiums, paid by the provider during the immediately preceding fiscal year on
account of any fully amortizing long-term debt owed by the provider. If a provider has
incurred new long-term debt during the immediately preceding fiscal year, the amount
required by this paragraph for that debt is 12 times the provider's most recent monthly
payment on the debt.
(2) Facility rental or leasehold payments, and any related payments such as lease
insurance, paid by the provider during the immediately preceding fiscal year.
(3) All payments paid by the provider during the immediately preceding fiscal year
on account of any debt that provides for a balloon payment. If the balloon payment
debt was incurred within the immediately preceding fiscal year, the amount required
by this paragraph for that debt is 12 times the provider's most recent monthly payment
on the debt made during the fiscal year.
(b) If any balloon payment debt matures within the next 24 months, the provider
shall submit with its annual report a plan for refinancing the debt or repaying the debt
with existing assets.
(c) When principal and interest payments on long-term debt are paid to a trust whose
beneficial interests are held by the residents, the department may waive all or any
portion of the debt service reserve required by this section. The department shall not
waive any debt service reserve requirement unless the department finds that the waiver
is consistent with the financial protections imposed by this chapter.
1792.4. Operating Expense Reserve Amount.
(a) Each provider shall include in its liquid reserve a reserve for its operating
expenses in an amount that equals or exceeds 75 days' net operating expenses. For
purposes of this section:
(1) Seventy-five days net operating expenses shall be calculated by dividing the
provider's operating expenses during the immediately preceding fiscal year by 365,
and multiplying that quotient by 75.
(2) "Net operating expenses" includes all expenses except the following:
(A) The interest and credit enhancement expenses factored into the provider's
calculation of its long-term debt reserve obligation described in Section 1792.3.
(B) Depreciation or amortization expenses.
71
(C) An amount equal to the reimbursement paid to the provider during the past
12 months for services to residents other than residents holding continuing care
contracts.
(D) Extraordinary expenses that the department determines may be excluded by the
provider. A provider shall apply in writing for a determination by the department and
shall provide supporting documentation prepared in accordance with generally
accepted accounting principles.
(b) A provider that has been in operation for less than 12 months shall calculate its
net operating expenses by using its actual expenses for the months it has operated and,
for the remaining months, the projected net operating expense amounts it submitted to
the department as part of its application for a certificate of authority.
1792.5. Reporting; Certification of Compliance.
(a) The provider shall compute its liquid reserve requirement as of the end of the
provider's most recent fiscal yearend based on its audited financial statements for that
period and, at the time it files its annual report, shall file a form acceptable to the
department certifying all of the following:
(1) The amount the provider is required to hold as a liquid reserve, including the
amounts required for the debt service reserve and the operating expense reserve.
(2) The qualifying assets, and their respective values, the provider has designated for
its debt service reserve and for its operating expense reserve.
(3) The amount of any deficiency or surplus for the provider's debt service reserve
and the provider's operating expense reserve.
(b) For the purpose of calculating the amount held by the provider to satisfy its
liquid reserve requirement, all qualifying assets used to satisfy the liquid reserve
requirements shall be valued at their fair market value as of the end of the provider's
most recently completed fiscal year. Restricted assets that have guaranteed values and
are designated as qualifying assets under paragraph (6) or (7) of subdivision (a) of
Section 1792.2 may be valued at their guaranteed values.
1792.6. Refund Reserve; Escrow Required; Amount.
(a) Any provider offering a refundable contract, or other entity assuming
responsibility for refundable contracts, shall maintain a refund reserve in trust for the
residents. The amount of the refund reserve shall be revised annually by the provider
and the provider shall submit its calculation of the refund reserve amount to the
department in conjunction with the annual report required by Section 1790. This
reserve shall accumulate interest and earnings and shall be invested in any of the
following:
(1) Qualifying assets as defined in Section 1792.2.
(2) Real estate, subject to all of the following conditions:
(A) To the extent approved by the department, the trust account may invest up to
70 percent of the refund reserves in real estate that is both used to provide care and 
72
housing for the holders of the refundable continuing care contracts and is located on
the same campus where these continuing care contract holders reside.
(B) Investments in real estate shall be limited to 50 percent of the providers' net
equity in the real estate. The net equity shall be the book value, assessed value, or
current appraised value within 12 months prior to the end of the fiscal year, less any
depreciation, and encumbrances, all according to audited financial statements
acceptable to the department.
(b) Each refund reserve trust shall be established at an institution qualified to be an
escrow agent. The escrow agreement between the provider and the institution shall be
in writing and include the terms and conditions described in this section. The escrow
agreement shall be submitted to and approved by the department before it becomes
effective.
(c) The amount to be held in the reserve shall be the total of the amounts calculated
with respect to each individual resident holding a refundable contract as follows:
(1) Determine the age in years and the portion of the entry fee for the resident
refundable for the seventh year of residency and thereafter.
(2) Determine life expectancy of that individual based on all of the following rules:
(A) The following life expectancy table shall be used in connection with all
continuing care contracts:
Age Females Males
55 26.323 23.635
56 25.526 22.863
57 24.74 22.101
58 23.964 21.35
59 23.199 20.609
60 22.446 19.88
61 21.703 19.163
62 20.972 18.457
63 20.253 17.764
64 19.545 17.083
65 18.849 16.414
66 18.165 15.759
67 17.493 15.116
68 16.832 14.486
69 16.182 13.869
70 15.553 13.268
71 14.965 12.676
72 14.367 12.073
73
73 13.761 11.445
74 13.189 10.83
75 12.607 10.243
76 12.011 9.673
77 11.394 9.139
78 10.779 8.641
79 10.184 8.159
80 9.62 7.672
81 9.06 7.188
82 8.501 6.719
83 7.952 6.269
84 7.438 5.854
85 6.956 5.475
86 6.494 5.124
87 6.054 4.806
88 5.613 4.513
89 5.2 4.236
90 4.838 3.957
91 4.501 3.67
92 4.175 3.388
93 3.862 3.129
94 3.579 2.903
95 3.329 2.705
96 3.109 2.533
97 2.914 2.384
98 2.741 2.254
99 2.584 2.137
100 2.433 2.026
101 2.289 1.919
102 2.152 1.818
103 2.022 1.723
104 1.899 1.637
105 1.784 1.563
106 1.679 1.51
107 1.588 1.5
108 1.522 1.5
109 1.5 1.5
110 1.5 1.5
74
(B) If there is a couple, the life expectancy for the person with the longer life
expectancy shall be used.
(C) The life expectancy table set forth in this paragraph shall be used until expressly
provided to the contrary through the amendment of this section.
(D) For residents over 110 years of age, 1.500 years shall be used in computing life
expectancy.
(E) If a continuing care retirement community has contracted with a resident under
55 years of age, the continuing care retirement community shall provide the
department with the methodology used to determine that resident's life expectancy.
(3) For that resident, use an interest rate of 6 percent or lower to determine from
compound interest tables the factor that, when multiplied by one dollar ($1), represents
the amount, at the time the computation is made, that will grow at the assumed
compound interest rate to one dollar ($1) at the end of the period of the life expectancy
of the resident.
(4) Multiply the refundable portion of the resident's entry fee amount by the factor
obtained in paragraph (3) to determine the amount of reserve required to be
maintained.
(5) The sum of these amounts with respect to each resident shall constitute the
reserve for refundable contracts.
(6) The reserve for refundable contracts shall be revised annually as provided for in
subdivision (a), using the interest rate, refund obligation amount, and individual life
expectancies current at that time.
(d) Withdrawals may be made from the trust to pay refunds when due under the
terms of the refundable entrance fee contracts and when the balance in the trust
exceeds the required refund reserve amount determined in accordance with
subdivision (c).
(e) Deposits shall be made to the trust with respect to new residents when the
entrance fee is received and in the amount determined with respect to that resident in
accordance with subdivision (c).
(f) Additional deposits shall be made to the trust fund within 30 days of any annual
reporting date on which the trust fund balance falls below the required reserve in
accordance with subdivision (c) and the deposits shall be in an amount sufficient to
bring the trust balance into compliance with this section.
(g) Providers who have used a method previously allowed by statute to satisfy their
refund reserve requirement may continue to use that method.
1792.7. Legislative Intent – Provider Financial Reporting Requirements
(a) The Legislature finds and declares all of the following:
(1) In continuing care contracts, providers offer a wide variety of living
accommodations and care programs for an indefinite or extended number of years in
exchange for substantial payments by residents.
75
(2) The annual reporting and reserve requirements for each continuing care provider
should include a report that summarizes the provider's recent and projected
performance in a form useful to residents, prospective residents, and the department.
(3) Certain providers enter into "life care contracts" or similar contracts with their
residents. Periodic actuarial studies that examine the actuarial financial condition of
these providers will help to assure their long-term financial soundness.
(b) Each provider shall annually file with the department a report that shows certain
key financial indicators for the provider's past five years, based on the provider's actual
experience, and for the upcoming five years, based on the provider's projections.
Providers shall file their key indicator reports in the manner required by
Section 1792.9 and in a form prescribed by the department.
(c) Each provider that has entered into Type A contracts shall file with the
department an actuary's opinion as to the actuarial financial condition of the provider's
continuing care operations in the manner required by Section 1792.10.
1792.8. Actuarial Definitions.
(a) For purposes of this article, "actuarial study" means an analysis that addresses
the current actuarial financial condition of a provider that is performed by an actuary
in accordance with accepted actuarial principles and the standards of practice adopted
by the Actuarial Standards Board. An actuarial study shall include all of the
following:
(1) An actuarial report.
(2) A statement of actuarial opinion.
(3) An actuarial balance sheet.
(4) A cohort pricing analysis.
(5) A cash flow projection.
(6) A description of the actuarial methodology, formulae, and assumptions.
(b) "Actuary" means a member in good standing of the American Academy of
Actuaries who is qualified to sign a statement of actuarial opinion.
(c) "Type A contract" means a continuing care contract that has an up-front entrance
fee and includes provision for housing, residential services, amenities, and unlimited
specific health-related services with little or no substantial increases in monthly
charges, except for normal operating costs and inflation adjustments.
1792.9. Key Indicators Report.
(a) All providers shall file annually with the department a financial report disclosing
key financial ratios and other key indicators in a form determined by the department.
(b) The department shall issue a "Key Indicators Report" form to providers that shall
be used to satisfy the requirements of subdivision (a). The Key Indicators Report shall
require providers to disclose the following information:
(1) Operational data indicating the provider's average annual occupancy by facility.
(2) Margin ratios indicating the provider's net operating margin and net operating
margin adjusted to reflect net proceeds from entrance fees.
76
(3) Liquidity indicators stating both the provider's total cash and investments
available for operational expenses and the provider's days cash on hand.
(4) Capital structure indicators stating the provider's dollar figures for deferred
revenue from entrance fees, net annual entrance fee proceeds, unrestricted net assets,
and annual capital expenditure.
(5) Capital structure ratios indicating the provider's annual debt service coverage,
annual debt service coverage adjusted to reflect net proceeds from entrance fees,
annual debt service over revenue percentage, and unrestricted cash over long-term debt
percentage.
(6) Capital structure indicators stating the provider's average age of facility
calculation based on accumulated depreciation and the provider's average annual
effective interest rate.
(c) The department shall determine the appropriate formula for calculating each of
the key indicators included in the Key Indicator Report. The department shall base
each formula on generally accepted standards and practices related to the financial
analysis of continuing care providers and entities engaged in similar enterprises.
(d) Each provider shall file its annual Key Indicators Report within 30 days
following the due date for the provider's annual report. If the Key Indicators Report is
not received by the department by the date it is due, the provider shall pay a one
thousand dollar ($1,000) late fee at the time the report is submitted. The provider shall
pay an additional late fee of thirty-three dollars ($33) for each day the report is late
beyond 30 days. For purposes of this section, a provider's Key Indicators Report is not
submitted to the department until the provider has paid all accrued late fees.
1792.10. Actuarial Study Required.
(a) Each provider that has entered into Type A contracts shall submit to the
department, at least once every five years, an actuary's opinion as to the provider's
actuarial financial condition. The actuary's opinion shall be based on an actuarial
study completed by the opining actuary in a manner that meets the requirements
described in Section 1792.8. The actuary's opinion, and supporting actuarial study,
shall examine, refer to, and opine on the provider's actuarial financial condition as of a
specified date that is within four months of the date the opinion is provided to the
department.
(b) Each provider required to file an actuary's opinion under subdivision (a) that
held a certificate of authority on December 31, 2003, shall file its actuary's opinion
before the expiration of five years following the date it last filed an actuarial study or
opinion with the department. Thereafter, the provider shall file its required actuary's
opinion before the expiration of five years following the date it last filed an actuary's
opinion with the department.
(c) Each provider required to file an actuary's opinion under subdivision (a) that did
not hold a certificate of authority on December 31, 2003, shall file its first actuary's
opinion within 45 days following the due date for the provider's annual report for the
fiscal year in which the provider obtained its certificate of authority. Thereafter, the 
77
provider shall file its required actuary's opinion before the expiration of five years
following the date it last filed an actuary's opinion with the department.
(d) The actuary's opinion required by subdivision (a) shall comply with generally
accepted actuarial principles and the standards of practice adopted by the Actuarial
Standards Board. The actuary's opinion shall also include statements that the data and
assumptions used in the underlying actuarial study are appropriate and that the
methods employed in the actuarial study are consistent with sound actuarial principles
and practices. The actuary's opinion must state whether the provider has adequate
resources to meet all its actuarial liabilities and related statement items, including an
appropriate surplus, and whether the provider's financial condition is actuarially sound.
ADVISORY
Section 1793 is superseded by Section 1792.6
(SB 2077, Chapter 820, Statutes of 2000)
1793. Reserves for Refundable Contracts.
(a) Any provider offering a refundable contract, or other entity assuming responsibility
for refundable contracts, shall maintain a refund reserve fund in trust for the residents.
This trust fund shall remain intact to accumulate interest earnings resulting from
investments of liquid reserves in accordance with paragraph (1) of subdivision (e) and
subparagraphs (A) through (E), inclusive, of paragraph (3) of subdivision (e) of
Section 1792.2. The amount of the refund reserve shall be revised annually by the
provider and submitted to the department in conjunction with the annual report required
by Section 1790.
(b) Any providers or other entity assuming responsibility for refundable contracts,
which has not executed refundable contracts in a continuing care retirement community
prior to January 1, 1996, and proposes to execute these contracts in that continuing care
retirement community after that date, shall maintain a refund reserve fund in trust for the
residents holding such contracts.
(1) Except as noted in paragraph (2), this trust fund shall remain intact as specified in
subdivision (a).
(2) To the extent approved by the department, the trust account may invest up to
70 percent of the refund reserves in real estate that is used to provide care and housing
for the holders of the refundable continuing care contracts and is located on the same
campus where these continuing care contract holders reside.
These investments in real estate shall be limited to 50 percent of the providers' net
equity in the real estate. The net equity shall be the book value, assessed value, or current
appraised value within 12 months prior to the end of the fiscal year, less any depreciation,
encumbrances, and the amount required for statutory reserves under Section 1792.2, all
according to audited financial statements acceptable to the department. This paragraph
shall apply to applications, and for those phases of the project that were identified as part
of applications, submitted after May 31, 1995.
(3) Any provider who submitted an application on or before May 31, 1995, may provide
for the refund obligation of this section with a trust account that invests up to 85 percent
of the refund reserves in the continuing care retirement community's real estate and the 
78
remaining 15 percent in the form of either cash or an unconditional, irrevocable letter of
credit to be phased in over a two-year period beginning with initial occupancy in the
facility.
(4) Each refund reserve trust fund shall be established at an institution qualified to be
an escrow agent pursuant to an agreement between the provider and the institution based
on this section and approved in advance by the department.
(5) The amount to be held in the reserve fund shall be the total of the amounts
calculated with respect to each individual resident as follows:
(A) Determine the age in years and the portion of the entry fee for the resident
refundable for the seventh year of residency and thereafter.
(B) Determine life expectancy of that individual from the life expectancy table in
paragraph (1) of subdivision (b) of Section 1792.2. If there is a couple, use the life
expectancy for the individual with the longer life expectancy.
(C) For that resident, use an interest rate of 6 percent or lower to determine from
compound interest tables the factor which represents the amount required today to grow
at compound interest to one dollar ($1) at the end of the period of the life expectancy of
the resident.
(D) Multiply the refundable portion of the resident's entry fee amount by the factor
obtained in subparagraph (C) to determine the amount of reserve required to be
maintained.
(E) The sum of these amounts with respect to each resident shall constitute the reserve
for refundable contracts.
(F) The reserve for refundable contracts will be revised annually as provided for in
subdivision (a), using the interest rate, refund obligation amount, and individual life
expectancies current at that time.
(6) Withdrawals may be made from the trust fund to pay refunds when due under the
terms of the refundable entry fee contracts and when the balance in the trust fund exceeds
the required refund reserve amount determined in accordance with paragraph (5) of
subdivision (b).
(7) Deposits shall be made to the trust fund with respect to new residents when the
entry fee is received and in the amount determined with respect to that resident in
accordance with paragraph (5) of subdivision (b).
(8) Additional deposits shall be made to the trust fund within 30 days of any annual
reporting date on which the trust fund balance falls below the required reserve in
accordance with paragraph (5) of subdivision (b) and such deposits shall be in an amount
sufficient to bring the trust fund balance into compliance with this section.
(c) Any provider which has executed refundable contracts in a continuing care
retirement community prior to January 1, 1996, and which has not executed refundable
contracts in a continuing care retirement community prior to January 1, 1991, shall
submit, for the department's approval, a method of determining a refund reserve to be
held in trust for the residents. Approved methods include any of the following:
(1) The establishment, at the time continuing care contracts are signed, of a reserve
fund in trust for the full amount of the refunds promised.
(2) The purchase from an insurance company, authorized to do business in the State of
California, of fully paid life insurance policies for the full amount of the refunds promised.
79
(3) A method approved by the American Academy of Actuaries in their Actuarial
Standards of Practice Relating to Continuing Care Retirement Communities, which
method provides for fully funding the refund obligations in a separate trust fund as
provided in subdivision (b).
(d) Any provider offering a refundable contract, or other entity assuming responsibility
for refundable contracts prior to January 1, 1991, shall maintain a refund reserve bank
account in trust for the residents as described in subdivision (b) except that the amount of
refund reserves shall be calculated based on the following assumptions and methods of
calculation:
(1) The continuing care retirement community will no longer receive entry fee income
after a period of 40 years following the commencement of operation.
(2) Approved long-term investments, such as treasury notes, will earn 3 percent more
than the rate of inflation.
(3) Entrance fees will increase at the rate of inflation.
(4) Land values will increase at the rate of inflation.
(5) Investments in the refund reserve trust will increase at the rate for approved longterm investments.
(6) Calculate the number of units to be resold each year at the approved rate of
turnover.
(7) Determine the mean entrance fee, as of the current date.
(8) Determine the factor for inflating the mean entrance fee at the rate of 3 percent
below the interest rate on new 30-year treasury bonds, for each year from the current date
to the 40th year of operation, or until all units have been turned over.
(9) Calculate the inflated mean entrance fees for the 40th year and for each preceding
year, until all units have been turned over.
(10) Multiply the inflated mean entrance fee for the 40th year, and each preceding year,
as specified in paragraph (9), by the annual turnover, as specified in paragraph (6), until
the total of the annual turnovers used in the calculations equals the total number of units
in the continuing care retirement community.
(11) The projected refund liability shall be the sum of the products obtained pursuant to
paragraph (10), multiplied by the rate of refund for the seventh year of residency,
specified by current continuing care contracts, multiplied by the percentage of current
continuing care contracts which specify this rate of refund. The projected refund liability
amount shall be calculated for each rate, if existing continuing care contracts specify
several rates.
(12) The projected refund liability, or the aggregate of these liabilities, if several rates
are obtained pursuant to paragraph (11), may be reduced by the value of the land used
for the continuing care retirement community, inflated to the 40th year of operation, as
determined pursuant to paragraph (4), if the provider agrees to a lien pursuant to
Section 1793.15 to secure this commitment.
(13) Calculate the present value of the projected refund liability at the current rate of
interest for new 30-year treasury bonds. The result is the required refund reserve.
(e) Any entity which holds a certificate of authority, provisional certificate of authority,
or permit to sell deposit subscriptions on or before September 23, 1986, shall be exempted
from the refund reserve requirement established by this section, if the entity has an equity 
80
balance of five times the amount of the refund reserves calculated pursuant to subdivision
(c).
(1) The equity balance shall be verified by one or more of the following means:
(A) The "stockholders' equity," or equivalent amount, as reflected on the most recent
Form 10K (which may be on a consolidated basis or on a consolidated and combined
basis) filed with the Securities and Exchange Commission.
(B) The "total fund balance of net worth," or equivalent amount, as reflected on
Form 990 or Form 990-PF filed with the Internal Revenue Service.
(C) The "total net worth," or equivalent amount, as reflected on the most recent Form
109 filed with the Franchise Tax Board.
(2) The amount of the requirement for the equity balance shall be revised annually
pursuant to this section.
(3) Compliance shall be based on review, by the department, of financial statements
prepared in accordance with generally accepted accounting principles, accompanied by
an unqualified opinion by a certified public accountant.
(4) If the equity balance is determined by the department to be less than the required
amount, the provider or other entity assuming responsibility shall deposit, in a form
satisfactory to the department, an amount equal to the refund reserve required within 60
days.
(f) All continuing care retirement communities offering refundable entrance fees that
are not secured by cash reserves, except those facilities that were issued a certificate of
authority prior to May 31, 1995, shall clearly disclose this fact in all marketing materials
and continuing care contracts.
81
Article 7. Offenses and Penalties
1793.5. Misdemeanors.
(a) An entity that accepts deposits and proposes to promise to provide care without
having a current and valid permit to accept deposits is guilty of a misdemeanor.
(b) An entity that accepts deposits and fails to place any deposit received into an
escrow account as required by this chapter is guilty of a misdemeanor.
(c) An entity that executes a continuing care contract without holding a current and
valid provisional certificate of authority or certificate of authority is guilty of a
misdemeanor.
(d) An entity that abandons a continuing care retirement community or its
obligations under a continuing care contract is guilty of a misdemeanor. An entity that
violates this section shall be liable to the injured resident for treble the amount of
damages assessed in any civil action brought by or on behalf of the resident in any
court having proper jurisdiction. The court may, in its discretion, award all costs and
attorney fees to the injured resident, if that resident prevails in the action.
(e) Each violation of subdivision (a), (b), (c), or (d) is subject to a fine not to exceed
ten thousand dollars ($10,000), or by imprisonment in the county jail for a period not
to exceed one year, or by both.
(f) An entity that issues, delivers, or publishes, or as manager or officer or in any
other administrative capacity, assists in the issuance, delivery, or publication of any
printed matter, oral representation, or advertising material which does not comply with
the requirements of this chapter is guilty of a misdemeanor.
(g) A violation of subdivision (f) by an entity will constitute cause for the
suspension of all and any licenses, permits, provisional certificates of authority, and
certificates of authority issued to that entity by any agency of the state.
(h) A violation under this section is an act of unfair competition as defined in
Section 17200 of the Business and Professions Code.
1793.6. Civil Penalties.
(a) The department may issue citations pursuant to this section containing orders of
abatement and assessing civil penalties against any entity that violates Section 1771.2
or 1793.5.
(b) If upon inspection or investigation, the department has probable cause to believe
that an entity is violating Section 1771.2 or 1793.5, the department may issue a
citation to that entity. Each citation shall be in writing and shall describe with
particularity the basis of the citation. Each citation shall contain an order of
abatement. In addition to the administrative fines imposed pursuant to Section
1793.27, an entity that violates the abatement order shall be liable for a civil penalty in
the amount of two hundred dollars ($200) per day for violation of the abatement order.
(c) The civil penalty authorized in subdivision (b) shall be imposed if a continuing
care retirement community is operated without a provisional certificate of authority or
certificate of authority and the operator refuses to seek a certificate of authority or the 
82
operator seeks a certificate of authority and the application is denied and the operator
continues to operate the continuing care retirement community without a provisional
certificate of authority or certificate of authority, unless other remedies available to the
department, including prosecution, are deemed more appropriate by the department.
(d) Service of a citation issued under this section may be made by certified mail at
the last known business address or residence address of the entity cited.
(e) Within 15 days after service of a citation under this section, an entity may appeal
in writing to the department with respect to the violations alleged, the scope of the
order of abatement, or the amount of civil penalty assessed.
(f) If the entity cited fails without good cause to appeal in writing to the department
within 15 business days after service of the citation, the citation shall become a final
order of the department. The department may extend the 15-day period for good
cause, to a maximum of 15 additional days.
(g) If the entity cited under this section makes a timely appeal of the citation, the
department shall provide an opportunity for a hearing. The department shall thereafter
issue a decision, based on findings of fact, affirming, modifying, or vacating the
citation or directing other appropriate relief. The proceedings under this section shall
be conducted in accordance with the provisions of Chapter 5 (commencing with
Section 11500) of Part 1 of Division 3 of Title 2 of the Government Code, and the
department shall have all the powers granted therein.
(h) After exhaustion of the review procedures specified in this section, the
department may apply to the appropriate superior court for a judgment in the amount
of the civil penalty and an order compelling the cited entity to comply with the order
of abatement. The application, which shall include a certified copy of the final order
of the department shall be served upon the cited entity who shall have five business
days to file that entity's response in writing in the superior court. This period may be
extended for good cause. Failure on the part of the cited entity to respond shall
constitute grounds for entry of a default judgment against that entity. In the event a
response is timely filed in superior court, the action shall have priority for trial over all
other civil matters.
(i) Notwithstanding any other provision of law, the department may waive part or
all of the civil penalty if the entity against whom the civil penalty is assessed
satisfactorily completes all the requirements for, and is issued, a provisional certificate
of authority or certificate of authority.
(j) Civil penalties recovered pursuant to this section shall be deposited into the
Continuing Care Provider Fee Fund.
1793.7. Forfeiture.
A permit to accept deposits, a provisional certificate of authority, or a certificate of
authority shall be forfeited by operation of law when any one of the following occurs:
(a) The applicant terminates marketing for the proposed continuing care retirement
community.
83
(b) The applicant or provider surrenders to the department its residential care facility
for the elderly license, the permit to accept deposits, provisional certificate of
authority, or certificate of authority for a continuing care retirement community.
(c) The applicant or provider sells or otherwise transfers all or part of the continuing
care retirement community.
(d) A change occurs in the majority ownership of the continuing care retirement
community or the certificate of authority holder.
(e) The applicant or provider merges with another entity.
(f) The applicant or entity makes a material change in a pending application which
requires a new application pursuant to subdivision (c) of Section 1779.8.
(g) The applicant or provider moves the continuing care retirement community from
one location to another without the department's prior approval.
(h) The applicant or provider abandons the continuing care retirement community or
its obligations under the continuing care contracts.
(i) The applicant or provider is evicted from the continuing care retirement
community premises.
1793.8. Inactive Certificate of Authority.
A Certificate of Authority shall be automatically inactivated when a provider
voluntarily ceases to enter into continuing care contracts with new residents. The
provider shall notify the department of its intention to cease entering into continuing
care contracts and shall continue to comply with all provisions of this chapter until all
continuing care contract obligations have been fulfilled.
1793.9. Preferred Claim.
(a) In the event of receivership or liquidation, all claims made against a provider
based on the provider's continuing care contracts shall be preferred claims against all
assets owned by the provider. However, these preferred claims shall be subject to any
perfected claims secured by the provider's assets.
(b) If the provider is liquidated, residents who have executed a refundable
continuing care contract shall have a preferred claim to liquid assets held in the refund
reserve pursuant to Section 1792.6. This preferred claim shall be superior to all other
claims from residents without refundable contracts or other creditors. If this fund and
any other available assets are not sufficient to fulfill the refund obligations, each
resident shall be distributed a proportionate amount of the refund reserve funds
determined by dividing the amount of each resident's refund due by the total refunds
due and multiplying that percentage by the total funds available.
(c) For purposes of computing the reserve required pursuant to Sections 1792.2 and
1793, the liens required under Section 1793.15 are not required to be deducted from
the value of real or personal property.
84
1793.11. Voidable Transfer; Rescission.
(a) Any transfer of money or property, pursuant to a continuing care contract found
by the department to be executed in violation of this chapter, is voidable at the option
of the resident or transferor for a period of 90 days from the execution of the transfer.
(b) Any deed or other instrument of conveyance shall contain a recital that the
transaction is made pursuant to rescission by the resident or transferor within 90 days
from the date of first occupancy.
(c) No action may be brought for the reasonable value of any services rendered
between the date of transfer and the date the resident disaffirms the continuing care
contract.
(d) With respect to real property, the right of disaffirmance or rescission is
conclusively presumed to have terminated if a notice of intent to rescind is not
recorded with the county recorder of the county in which the real property is located
within 90 days from the date of first occupancy of the residential living unit.
(e) A transfer of money or property, real or personal, to anyone pursuant to a
continuing care contract that was not approved by the department is voidable at the
option of the department or transferor or his or her assigns or agents.
(f) A transaction determined by the department to be in violation of this chapter is
voidable at the option of the resident or his or her assignees or agents.
1793.13. Unsound Financial Condition.
(a) The department may require a provider to submit a financial plan and periodic
financial reports if any of the following apply:
(1) A provider fails to submit to the department an audited annual report as required
by Section 1790.
(2) The department has reason to believe that the provider is insolvent, is in
imminent danger of becoming insolvent, is in a financially unsound or unsafe
condition, or that its condition is such that it may otherwise be unable to fully perform
its obligations pursuant to continuing care contracts.
(3) The department receives notice from a provider within two weeks after the end
of a calendar month in which the circumstances described in subparagraph (A) and one
of the circumstances described in subparagraph (B) occurred and were continuing at
the end of that month. The provider shall notify the department within the specified
timeframe above if it meets the circumstances outlined in this paragraph.
(A) Overall average occupancy of all facility levels of care is below 80 percent at a
facility. For purposes of this subparagraph, “all facility levels of care” includes, if
applicable, independent living, assisted living, and skilled nursing. Overall average
occupancy shall be calculated as the average for all units over the preceding two
months, excluding units that were not on the market or already reserved. Overall
average occupancy shall not apply to newly opened continuing care retirement
communities for a period of 12 months from the date of opening. A provider shall not
keep a unit off the market to avoid repaying all or a portion of the entrance fee of a
repayable contract.
85
(B)(i) The provider fails to maintain the minimum reserve required pursuant to
Section 1792.3.
(ii) The provider fails to meet one or more of its debt covenants from a third-party
lender, a bond issue, or a third-party lender and a bond issue.
(iii) The provider has a net operating loss for a period of three consecutive months.
(b)(1) A provider shall submit its financial plan to the department within 60 days
following the date of the department’s request. The financial plan shall explain how
and when the provider will remedy the problems and deficiencies identified by the
department. If the provider determines that the plan contains trade secret information
protected under the Uniform Trade Secrets Act (Title 5 (commencing with Section
3426) of Part 1 of Division 4 of the Civil Code), the provider shall submit at the same
time a separate version of the plan with the trade secret information redacted. The
provider shall identify to the department the portions of the plan that it asserts are trade
secrets.
(2) If a financial plan and periodic financial reports are required by the department,
a provider shall submit periodic reports to the department. Periodic reports shall
explain the provider’s progress toward remedying the problems and deficiencies
identified by the department. The department may require reporting at intervals that
the department deems necessary.
(c) The department shall approve or disapprove the plan and redacted form of the
plan within 30 calendar days of its receipt. If the plan is approved and the redacted
form of the plan is not, the provider will be given an opportunity to resubmit the
redacted form of the plan for the department’s approval.
(d) If the plan is approved, the provider shall immediately implement the plan.
Within 10 calendar days of approval, the provider shall distribute a copy of the plan or
the approved redacted form of the plan to the facility’s resident council or association.
If the plan is approved and the redacted form of the plan is not, the provider shall
distribute a copy of the redacted form of the plan to the facility’s resident council or
association within 10 calendar days of approval. All periodic reports required by this
section shall also be distributed to the facility’s resident council or association within
10 calendar days of submission to the department.
(e) If the plan is disapproved, or if it is determined that the plan is not being fully
implemented, the department may consult with its financial consultants to develop a
corrective action plan at the provider’s expense, or require the provider to obtain new
or additional management capability approved by the department to solve its
difficulties. A reasonable period, as determined by the department, shall be allowed
for the reorganized management to develop a plan that, subject to the approval of the
department, will reasonably ensure that the provider will meet its responsibilities under
the law. A corrective action plan or a plan for reorganization shall be shared with the
facility’s resident council, resident association, or resident council and resident
association within 10 calendar days of submitting notification to the department.
(f)(1) The provider shall share its approved financial plan, the approved redacted
form of the plan, or any revised version of the financial plan, and any subsequent 
86
periodic report with a prospective or incoming resident no less than 60 calendar days
before entering into a continuing care contract until the time the provider has corrected
the problems and deficiencies identified by the department.
(2) If a prospective or incoming resident has an urgent need for placement that
requires occupancy less than 60 days from their decision to go forward with a contract,
the resident shall sign a declaration indicating all of the following:
(A) There is an urgent need for the resident to obtain a placement at the community.
(B) The resident has received a copy of the community’s financial plan, or redacted
or revised financial plan.
(C) The copy of the financial plan, or redacted or revised financial plan was
provided within a reasonable time of the provider becoming aware that a placement
would be required in less than 60 days.
(D) The resident waives the right to receive the financial plan, or redacted or revised
financial plan, 60 days in advance of their executing a continuing care contract.
The paragraph indicating that the resident received the financial plan, or redacted or
revised financial plan, shall be initialed by the resident. The declaration shall be kept
in the resident’s file.
(g) If the provider fails to correct deficiencies by the expiration of the financial plan,
the department may take further actions consistent with this chapter.
1793.15. Lien for Transferors; Release of Lien, Conditions.
(a) When necessary to secure an applicant's or a provider's performance of its
obligations to depositors or residents, the department may record a notice or notices of
lien on behalf of the depositors or residents. From the date of recording, the lien shall
attach to all real property owned or acquired by the provider during the pendency of
the lien, provided the property is not exempt from the execution of a lien and is located
within the county in which the lien is recorded. The lien shall have the force, effect,
and priority of a judgment lien.
(b) The department may record a lien on any real property owned by the provider if
the provider's annual report indicates the provider has an unfunded statutory or refund
requirement. A lien filed pursuant to this section shall have the effect, force, and
priority of a judgment lien filed against the property.
(c) The department shall file a release of the lien if the department determines that
the lien is no longer necessary to secure the applicant's or provider's performance of its
obligations to the depositors or residents.
(d) Within 10 days following the department's denial of a request for a release of the
lien, the applicant or provider may file an appeal with the department.
(e) The department's final decision shall be subject to court review pursuant to
Section 1094.5 of the Code of Civil Procedure, upon petition of the applicant or
provider filed within 30 days of service of the decision.
87
1793.17. Return of Funds to Escrow.
(a) When necessary to secure the interests of depositors or residents, the department
may require that the applicant or provider reestablish an escrow account, return
previously released moneys to escrow, and escrow all future entrance fee payments.
(b) The department may release funds from escrow as it deems appropriate or
terminate the escrow requirement when it determines that the escrow is no longer
necessary to secure the performance of all obligations of the applicant or provider to
depositors or residents.
1793.19. Nonexclusive Remedies.
The civil, criminal, and administrative remedies available to the department pursuant
to this article are not exclusive and may be sought and employed by the department, in
any combination to enforce this chapter.
1793.21. Condition, Suspension, or Revocation of Certificate of Authority.
The department, in its discretion, may condition, suspend, or revoke any permit to
accept deposits, provisional certificate of authority, or certificate of authority issued
under this chapter if it finds that the applicant or provider has done any of the
following:
(a) Violated this chapter or the rules and regulations adopted under this chapter.
(b) Aided, abetted, or permitted the violation of this chapter or the rules and
regulations adopted under this chapter.
(c) Had a license suspended or revoked pursuant to the licensing provisions of
Chapter 2 (commencing with Section 1250) or Chapter 3.2 (commencing with
Section 1569).
(d) Made a material misstatement, misrepresentation, or fraud in obtaining the
permit to accept deposits, provisional certificate of authority, or certificate of
authority.
(e) Demonstrated a lack of fitness or trustworthiness.
(f) Engaged in any fraudulent or dishonest practices of management in the conduct
of business.
(g) Misappropriated, converted, or withheld moneys.
(h) After request by the department for an examination, access to records, or
information, refused to be examined or to produce its accounts, records, and files for
examination, or refused to give information with respect to its affairs, or refused to
perform any other legal obligations related to an examination.
(i) Manifested an unsound financial condition.
(j) Used methods and practices in the conduct of business so as to render further
transactions by the provider or applicant hazardous or injurious to the public.
(k) Failed to maintain at least the minimum statutory reserves required by
Section 1792.2.
(l) Failed to maintain the reserve fund escrow account for prepaid continuing care
contracts required by Section 1792.
88
(m) Failed to comply with the refund reserve requirements stated in Section 1793.3
(n) Failed to comply with the requirements of this chapter for maintaining escrow
accounts for funds.
(o) Failed to file the annual report described in Section 1790.
(p) Violated a condition on its permit to accept deposits, provisional certificate of
authority, or certificate of authority.
(q) Failed to comply with its approved financial and marketing plan or to secure
approval of a modified plan.
(r) Materially changed or deviated from an approved plan of operation without the
prior consent of the department.
(s) Failed to fulfill his or her obligations under continuing care contracts.
(t) Made material misrepresentations to depositors, prospective residents, or
residents of a continuing care retirement community.
(u) Failed to submit proposed changes to continuing care contracts prior to use, or
using a continuing care contract that has not been previously approved by the
department.
(v) Failed to diligently submit materials requested by the department or required by
the statute.
1793.23. Right of Appeal; Removal of Condition or Suspension.
(a) If the department conditions, suspends, or revokes any permit to accept deposits,
provisional certificate of authority, or certificate of authority issued pursuant to this
chapter, the provider shall have a right of appeal to the department. The proceedings
shall be conducted in accordance with Chapter 5 (commencing with Section 11500) of
Part 1 of Division 3 of Title 2 of the Government Code, and the department shall have
all of the powers granted therein. A suspension, condition, or revocation shall remain
in effect until completion of the proceedings in favor of the provider. In all
proceedings conducted in accordance with this section, the standard of proof to be
applied shall be by a preponderance of the evidence.
(b) The department may, upon finding of changed circumstances, remove a
suspension or condition.
1793.25. Provider Obligations While Action is Pending.
(a) During the period that the revocation or suspension action is pending against the
permit to accept deposits, provisional certificate of authority, or certificate of
authority, the provider shall not enter into any new deposit agreements or continuing
care contracts.
(b) The suspension or revocation by the department, or voluntary return of the
provisional certificate of authority or certificate of authority by the provider, shall not
release the provider from obligations assumed at the time the continuing care contracts
were executed.
3 Section 1793 has been superseded by section 1792.6. (SB 2077, Chapter 820, Statutes of 2000)
89
1793.27. Administrative Fines.
(a) If the department finds that any entity has violated Section 1793.5 or one or more
grounds exist for conditioning, revoking, or suspending a permit to accept deposits,
provisional certificate of authority, or a certificate of authority issued under this
chapter, the department, in lieu of the condition, revocation, or suspension, may
impose an administrative fine upon an applicant or provider in an amount not to
exceed one thousand dollars ($1,000) per violation.
(b) The administrative fine shall be deposited in the Continuing Care Provider Fee
Fund and shall be disbursed for the specific purposes of offsetting the costs of
investigation and litigation and to compensate court-appointed administrators when
continuing care retirement community assets are insufficient.
1793.29. Injunctive or Equitable Relief.
In the case of any violation or threatened violation of this chapter, the department
may institute a proceeding or may request the Attorney General to institute a
proceeding to obtain injunctive or other equitable relief in the superior court in and for
the county in which the violation has occurred or will occur, or in which the principal
place of business of the provider is located. The proceeding under this section shall
conform with the requirements of Chapter 3 (commencing with Section 525) of Title 7
of Part 2 of the Code of Civil Procedure, except that no undertaking shall be required
of the department in any action commenced under this section, nor shall the
department be required to allege facts necessary to show lack of adequate remedy at
law, or to show irreparable loss or damage.
1793.31. Prosecutions by District Attorney.
(a) The district attorney of every county may, upon application by the department or
its authorized representative, institute and conduct the prosecution of any action for
violation of this chapter within his or her county.
(b) This chapter shall not limit or qualify the powers of the district attorney to
institute and conduct the prosecution of any action brought for the violation within his
or her county of this chapter or any other provision of law, including, but not limited
to, actions for fraud or misrepresentation.
(c) The department shall provide access to any records in its control on request of a
district attorney and shall cooperate in any investigation by a district attorney.
90
Article 8. Appointment of Administrator
1793.50. Appointment of Administrator.
(a) The department may petition the superior court for an order appointing a
qualified administrator to operate a continuing care retirement community, and thereby
mitigate imminent crisis situations where elderly residents could lose support services
or be moved without proper preparation, in any of the following circumstances:
(1) The provider is insolvent or in imminent danger of becoming insolvent.
(2) The provider is in a financially unsound or unsafe condition.
(3) The provider has failed to establish or has substantially depleted the reserves
required by this chapter.
(4) The provider has failed to submit a plan, as specified in Section 1793.13, the
department has not approved the plan submitted by the provider, the provider has not
fully implemented the plan, or the plan has not been successful.
(5) The provider is unable to fully perform its obligations pursuant to continuing
care contracts.
(6) The residents are otherwise placed in serious jeopardy.
(b) The administrator may only assume the operation of the continuing care
retirement community in order to accomplish one or more of the following:
rehabilitate the provider to enable it fully to perform its continuing care contract
obligations; implement a plan of reorganization acceptable to the department; facilitate
the transition where another provider assumes continuing care contract obligations; or
facilitate an orderly liquidation of the provider.
(c) With each petition, the department shall include a request for a temporary
restraining order to prevent the provider from disposing of or transferring assets
pending the hearing on the petition.
(d) The provider shall be served with a copy of the petition, together with an order
to appear and show cause why management and possession of the provider's
continuing care retirement community or assets should not be vested in an
administrator.
(e) The order to show cause shall specify a hearing date, which shall be not less than
five nor more than 10 days following service of the petition and order to show cause
on the provider.
(f) Petitions to appoint an administrator shall have precedence over all matters,
except criminal matters, in the court.
(g) At the time of the hearing, the department shall advise the provider and the court
of the name of the proposed administrator.
(h) If, at the conclusion of the hearing, including such oral evidence as the court
may consider, the court finds that any of the circumstances specified in subdivision (a)
exist, the court shall issue an order appointing an administrator to take possession of
the property of the provider and to conduct the business thereof, enjoining the provider
from interfering with the administrator in the conduct of the rehabilitation, and 
91
directing the administrator to take steps toward removal of the causes and conditions
which have made rehabilitation necessary, as the court may direct.
(i) The order shall include a provision directing the issuance of a notice of the
rehabilitation proceedings to the residents at the continuing care retirement community
and to other interested persons as the court may direct.
(j) The court may permit the provider to participate in the continued operation of
the continuing care retirement community during the pendency of any appointments
ordered pursuant to this section and shall specify in the order the nature and scope of
the participation.
(k) The court shall retain jurisdiction throughout the rehabilitation proceeding and
may issue further orders as it deems necessary to accomplish the rehabilitation or
orderly liquidation of the continuing care retirement community in order to protect the
residents of the continuing care retirement community.
1793.52. Notification to Residents.
The court-appointed administrator shall immediately notify the residents of that
appointment and of the status of the continuing care retirement community
management.
1793.54. Powers and Duties of Administrator.
If an administrator is appointed to rehabilitate a provider, the administrator may do
any of the following:
(a) Take possession of and preserve, protect and recover any assets, books, records,
or property of the provider, including, but not limited to, claims or causes of action
belonging to, or which may be asserted by, the provider.
(b) Deal with the property in the administrator's name in the capacity as
administrator, and purchase at any sale any real estate or other asset upon which the
provider may hold any lien or encumbrance or in which the provider may have an
interest.
(c) File, prosecute, and defend or compromise any suit or suits which have been
filed, or which may thereafter be filed, by or against the provider as necessary to
protect the provider or the residents or any property affected thereby.
(d) Deposit and invest any of the provider's available funds.
(e) Pay all expenses of the rehabilitation.
(f) Perform all duties of the provider in the provision of care and services to
residents in the continuing care retirement community at the time the administrator
takes possession.
(g) Facilitate the orderly transfer of residents should the provider ultimately fail.
(h) Exercise any other powers and duties as may be authorized by law or provided
by order of the court.
92
1793.56. Compensation and Indemnification of Administrator.
(a) The appointed administrator is entitled to reasonable compensation.
(b) The costs compensating the administrator may be charged against the assets of
the provider. When the provider's assets and assets from the continuing care
retirement community are insufficient, the department, in its discretion, may
compensate the administrator from the Continuing Care Provider Fee Fund.
(c) Any individual appointed administrator, pursuant to Section 1793.50, shall be
held harmless for any negligence in the performance of his or her duties and the
provider shall indemnify the administrator for all costs of defending actions brought
against him or her in his or her capacity as administrator.
1793.58. Order for Termination of Rehabilitation Proceedings Upon Successful
Completion of Rehabilitation.
(a) The department, administrator, or any interested person, upon due notice to the
administrator, at any time, may apply to the court for an order terminating the
rehabilitation proceedings and permitting the provider to resume possession of the
provider's property and the conduct of the provider's business.
(b) The court shall not issue the order requested pursuant to subdivision (a) unless,
after a full hearing, the court has determined that the purposes of the proceeding have
been fully and successfully accomplished and that the continuing care retirement
community can be returned to the provider's management without further jeopardy to
the residents of the continuing care retirement community, creditors, owners of the
continuing care retirement community, and to the public.
(c) Before issuing any order terminating the rehabilitation proceeding the court shall
consider a full report and accounting by the administrator regarding the provider's
affairs, including the conduct of the provider's officers, employees, and business
during the rehabilitation and the provider's current financial condition.
(d) Upon issuance of an order terminating the rehabilitation, the department shall
reinstate the provisional certificate of authority or certificate of authority. The
department may condition, suspend, or revoke the reinstated certificate only upon a
change in the conditions existing at the time of the order or upon the discovery of facts
which the department determines would have resulted in a denial of the request for an
order terminating the rehabilitation had the court been aware of these facts.
1793.60. Order for Liquidation or Dissolution of Provider.
(a) If at any time the department determines that further efforts to rehabilitate the
provider would not be in the best interest of the residents or prospective residents, or
would not be economically feasible, the department may apply to the court for an
order of liquidation and dissolution or may apply for other appropriate relief for
dissolving the property and bringing to conclusion its business affairs.
(b) Upon issuance of an order directing the liquidation or dissolution of the provider,
the department shall revoke the provider's provisional certificate of authority or
certificate of authority.
93
1793.62. Request to Terminate Order for Appointing Administrator Upon
Failure of Rehabilitation.
(a) The department, administrator, or any interested person, upon due notice to the
parties, may petition the court for an order terminating the rehabilitation proceedings
when the rehabilitation efforts have not been successful, the continuing care retirement
community has been sold at foreclosure sale, the provider is the subject of an order for
relief in bankruptcy, or the provider has otherwise been shown to be unable to perform
its obligations under the continuing care contracts.
(b) The court shall not issue the order requested pursuant to subdivision (a) unless
all of the following have occurred:
(1) There has been a full hearing and the court has determined that the provider is
unable to perform its contractual obligations.
(2) The administrator has given the court a full and complete report and financial
accounting signed by the administrator as being a full and complete report and
accounting.
(3) The court has determined that the residents of the continuing care retirement
community have been protected to the extent possible and has made such orders in this
regard as the court deems proper.
94
Article 9. Continuing Care Retirement Community Closure
1793.80. Closure Notice.
(a) Notwithstanding any other provisions of law, a provider regulated under this
chapter shall, no less than 120 days prior to the intended date of the permanent closure
of a continuing care retirement community facility, as defined in paragraph (3) of
subdivision (p) of Section 1771, provide written notice to the department and to the
affected residents and their designated representatives. The notice shall contain the
following statement of residents' rights under this article, in no less than 12-point type:
"This facility is planned for permanent closure on or after [state date of closure] that
will require you to vacate your living unit. Residents of continuing care retirement
communities in California have certain rights and continuing care community
providers have certain responsibilities when a continuing care community closes.
Those rights include, but are not limited to, the following:
1. Prior to closing, the provider shall provide a permanent closure plan to the
Continuing Care Contracts Branch of the State Department of Social Services that
describes the options available to residents for relocating to another part of the facility,
or another facility or the compensation to be provided to residents.
2. No action can be taken to relocate any resident or to close the facility until the
permanent closure and relocation plan has been prepared and provided to the
department, the affected residents of the facility and their designated representatives,
and to the local long-term care ombudsman program."
(b) Upon service of the closure notice when closure is planned for all units in a
facility, the provider is prohibited from accepting new residents or entering into new
continuing care contracts at the facility being closed.
1793.81. Closure and Relocation Plan.
No less than 90 days prior to the permanent closure of the continuing care retirement
community facility, as defined in paragraph (3) of subdivision (p) of Section 1771, the
provider shall provide to the department, the affected residents of the facility and their
designated representatives, and to the local long-term care ombudsman program, a
written closure and relocation plan. The plan shall contain all of the following
information:
(a) The number of affected residents at each level of care in the continuing care
retirement community facility.
(b) Assessment of unique service and care needs, if applicable, for all of the
following:
(1) Affected residents in skilled nursing and special care.
(2) Affected residents in assisted living units.
95
(3) Affected residents in the residential living units who require assistance with
three or more activities of daily living, and other residents upon request.
(c) An explanation on how comparable care, if applicable, and comparable
replacement housing will be provided.
(d) A detailed description of the services the provider will provide to residents to
assist them in relocating, including, but not limited to, reasonable costs of moving,
storage, if applicable, and transportation that shall be arranged by the provider in
consultation with the resident and his or her designated representative, and paid for
directly by the provider.
(e) The names and addresses of other continuing care retirement communities
operated by the provider and whether there are openings available to the residents.
(f) The names and addresses of other continuing care retirement communities
within 30 miles of the closing continuing care retirement community facility that
provide comparable replacement housing and care, if applicable, to those offered at the
facility that is scheduled for closure, and whether the facilities have immediate
openings available to residents of the closing facility.
(g) A description of how the facility will comply with the requirements of
Section 1793.82. The plan shall describe or identify the replacement facility or
facilities and the procedure by which a resident can select a replacement facility. In no
case shall the plan for replacement housing require a resident to pay more than he or
she is presently paying for comparable housing and care, other than normal rate
increases. Any proposed monetary compensation shall be fair and reasonable and
shall represent the estimated cost to the resident of securing comparable replacement
housing and care under terms similar to the contract between resident and provider.
(h) A statement regarding the availability of a licensed medical or geriatric
professional to advise the resident, the resident's representative, and the provider
regarding the transfer of the resident. Upon request by the resident or the resident's
representative, the provider shall make available the services of a licensed medical or
geriatric professional to advise the resident, the resident's representative, and the
provider regarding the transfer of the resident. The provider may place a reasonable
limit on the cost of the services of the medical or geriatric professional.
1793.82. Permanent Closure Options.
(a) In the case of a permanent closure, the provider shall offer the resident the choice
of the following four options, the terms of which shall not be less than the terms of the
continuing care contract entered into between the resident and the provider as if that
contract had been fully performed:
(1) Relocation to another continuing care facility owned or operated by the provider,
if available.
(2) Relocation to a continuing care facility that is not owned by the provider.
(3) Monetary compensation equal to the value of the remainder of the contract as if
the contract had been fully performed.
96
(4) An alternative arrangement that is mutually agreed upon by the provider and the
resident or his or her representative.
(b) Replacement housing offered pursuant to paragraph (1) or (2) of subdivision (a)
shall be housing that is, overall, comparable in cost, size, services, features, and
amenities to the unit being vacated. If the resident chooses either of the replacement
housing options in paragraph (1) or (2) of subdivision (a), the provider shall provide
the reasonable costs of moving, storage, if applicable, and transportation.
(c) Notwithstanding subdivision (a), for a resident under a life care contract, the
provider shall secure replacement housing and care at a comparable facility for the
resident at no additional cost to the resident. The replacement housing and care shall
comply with subdivision (l) of Section 1771 and subdivision (b) of Section 1788.
(d) The provider may provide relocation pursuant to paragraph (2) of subdivision (a)
on a month-to-month basis, provided that the terms are otherwise consistent with
subdivision (a). After 120 days, a resident selecting a facility not owned by the
provider may not seek monetary compensation pursuant to paragraph (3) of
subdivision (a).
1793.83. Reserve, Trust Fund, or Performance Bond Required.
(a) When there is a permanent closure, as defined in paragraph (3) of subdivision (p)
of Section 1771, within 30 days of submitting the relocation plan to the department,
the provider shall fund a reserve, set up a trust fund, or secure a performance bond to
ensure the fulfillment of the obligations and commitments associated with the
relocation plan. The amount of the reserve trust fund or performance bond shall be
equal to or greater than the estimated costs of relocating residents and the costs
associated with the relocation options pursuant to Section 1793.81 and subdivision (a)
of Section 1793.82.
(b) The reserve, trust fund, or performance bond shall be funded with qualifying
assets enumerated in paragraphs (1) to (5), inclusive, of subdivision (a) of Section
1792.2 and shall not be subject to any liens, judgments, garnishments, or creditor's
claims.
1793.84. Monthly Progress Reports Required.
(a) The provider shall submit monthly progress reports to the department detailing
the progress and problems associated with the permanent closure, as defined in
paragraph (3) of subdivision (p) of Section 1771, until all affected residents are
relocated and all required payments to, or on behalf of, affected residents are made.
(b) The department shall monitor the implementation of the permanent closure as
defined in paragraph (3) of subdivision (p) of Section 1771 and relocation plan as
necessary to ensure full compliance by the provider. If the department determines that
a provider is closing a facility in violation of this article or is doing so in a manner that
endangers the health or safety of residents, it shall exercise its powers under Article 7
(commencing with Section 1793.5). 
97
(c) No action shall be taken by the provider to relocate any resident or to close the
facility until the relocation plan required by Section 1793.81 has been prepared and
provided to the department, the affected residents of the facility and their designated
representatives, and to the local long-term ombudsman program.
98
Article 10. Residential Temporary Relocation
1793.90. Residential Temporary Relocation.
(a) All providers shall include in resident contracts the procedures to be followed to
ensure that residential temporary relocations provide comparable levels of care,
services, and living accommodations as described in the resident's contract.
(b) The provider shall notify the resident of the impending relocation at least 60
days in advance of the relocation.
(c) The provider shall meet with the resident and, at the resident's request, family
members or other individuals, at least 30 days in advance of the transfer to discuss all
aspects of the transfer, including, but not limited to, the rights, requirements, and
procedures set forth in this article. Notice of this meeting shall be provided in writing
and at least seven days in advance of the meeting and shall include all of the following
information:
(1) The date of the transfer.
(2) The available replacement unit or units and monthly fees.
(3) The time when the resident will be able to inspect the replacement unit or units.
(4) The estimated date when the resident will be able to return to his or her unit or
may move to a substitute permanent unit.
(d) If accommodations are not available at a continuing care retirement community
operated by the provider within a 30-mile radius, the provider shall be required to
provide a unit in a facility, agreed to by the resident, that most closely provides the
services, size, features, and amenities provided in the unit being vacated.
(e) The provider shall be required to arrange and pay for all moving costs to the new
facility and moving costs to the reconstructed facility, if the resident returns, as well as
storage costs.
(f) The resident shall only be required to pay to the provider the monthly fee
required in the resident's contract, or the monthly fee in the new facility, whichever is
less. The provider shall be required to make payment to the facility to which the
resident is relocated.
(g) Upon request by the resident or the resident's representative, the provider shall
make available the services of a licensed medical or geriatric professional to advise the
resident, the resident's representative, and the provider regarding the relocation of the
resident. The provider may place a reasonable limit on the cost of the services of the
medical or geriatric professional.
(h) The provider shall identify unique service and care needs, if applicable, for a
resident directly affected by the residential temporary relocation. The unique services
and care needs identified shall be in writing and shall become a part of the resident's
plan of care.
1793.91. Return of Relocated Resident.
The provider shall set forth specific procedures for the resident to follow regarding
relocation to the unit originally vacated, the selection of a new unit, and timeframes for 
99
making choices. Procedures for returning the relocated resident when residential units
will be ready for occupancy shall include all of the following:
(a) The provider shall provide the resident at least 60 days notice of the return to his
or her unit or a substitute permanent unit, and subsequent notices 30 days and seven
days prior to the return date.
(b) The resident shall have the right to return to his or her previously occupied unit
or a unit comparable in services, size, features, and amenities to the unit originally
vacated, without payment of any further entrance or accommodation fee. The provider
is not required to guarantee a specific unit. Assignment of units shall be based upon
the length of occupancy of returning residents.
(c) If the residential temporary relocation of a resident of a continuing care
retirement community will exceed 18 months, the resident shall have all options
allowed by Section 1793.82, unless there is a written agreement between the affected
resident and the provider as described in subdivision (d).
(d) If a provider determines that the period of residential temporary relocation, as
defined in paragraph (8) of subdivision (r) of Section 1771, will exceed 18 months, the
provider may extend the period of residential temporary relocation for up to six
months for an affected resident if that resident has agreed to the extension in writing.
The written agreement shall state that by signing, the resident waives all rights to
relocation options offered in Section 1793.82 for the period of the extension.
  `;

  try {
    console.log('Starting to process text...');
    const chunks = splitTextIntoChunks(text);
    console.log(`Split text into ${chunks.length} chunks`);

    for (let i = 0; i < chunks.length; i++) {
      console.log(`Uploading chunk ${i + 1} of ${chunks.length}...`);
      const result = await createResource({ content: chunks[i] });
      console.log(`Chunk ${i + 1} upload result:`, result);
    }

    console.log('All chunks uploaded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error uploading text:', error);
    process.exit(1);
  }
}

uploadLargeText().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
