import { createResource } from '../lib/actions/resources';

async function uploadText() {
  const text = `
    Field Descriptions for FERPA Responses from Penn Admissions
General Statement
Penn practices holistic admissions. In other words, we review every application in its entirety, and we
consider academic and non‐academic factors in our review process. These factors may be qualitative or
quantitative in nature. In order to understand their performance and potential, we evaluate students
based on the opportunities made available to them in their respective environment. Every application is
reviewed by multiple admissions officers. Together, we try to understand how Penn can benefit the
individual and how the individual may benefit the broader Penn community.
We are providing this document to explain the abbreviations used and provide context for information
you may see in your FERPA response.
Scales
M (Pre 2019): Match with Penn (1‐4*) ‐ Student’s developed interest in Penn, fit with Penn programs,
and talent within academic priorities
A (2019 and later): Alignment (1‐4*) ‐ Student’s developed interest in Penn, fit with Penn programs, and
talent within academic priorities
E: Excellence of Mind (1‐6**) ‐ Student’s pursuit of academic interests and achievements within school
and community context
I: Impact in Your Space (1‐6**) ‐ community context
Student as a catalyst for impact and involvement with school and
POK: Pursuit of Knowledge (2023 and later) (1-6**) - Student's pursuit of academic interests and
achievements within school and beyond
P: Purpose (2023 and later) (1-6**) - Purpose and intention for applying to higher education, Penn in
particular
C: Contribution (2023 and later) (1-6**) - Contribution to community, family or self-development
AI: Academic Index – this is a calculated value that combines GPA, ACT/SATs, SAT IIs (if present)
Portfolio Rating (1-9***).-only provided to applicants applying to Architecture, Digital Media Design,
Fine Arts, and Music
Indicators
FG: First Generation
Legacy: Legacy – having parent, stepparent, guardian or grandparent who graduated from Penn
F/S: Child of Faculty or Staff
SE: Student coming from a potentially lower socioeconomic environment
LGBTQA: member of the LGBTQ community, LGBTQ ally, etc
ACA/PROB: Disciplinary action or Misdemeanor/Felony expressed on record
PHL: Philadelphia resident
Sibling Applying: Indication that a sibling has applied in the same application cycle
QB-FM: Questbridge finalist matched with Penn
Re‐App: Applicant that had applied in a previous year
Confirmed Designations
BFS: Benjamin Franklin Scholars
JSW: Joseph Wharton Scholars
Civic: Civic Scholars
Clark: Clark Scholars
PWS: Penn World Scholars
Rachleff (SEAS): Rachleff Engineering Scholars
Robeson‐Cooper: Robeson‐Cooper Scholars
University Scholars
MLS: Vagelos Scholars
PFP: Pre‐Freshmen Program
Other Abbreviations
ED: Early Decision
RD: Regular Decision
TR: Transfer
* 4 highest rating
** 6 highest rating
*** 9 highest rating
  `;

  try {
    const result = await createResource({ content: text });
    console.log('Upload result:', result);
  } catch (error) {
    console.error('Error uploading text:', error);
  }
}

uploadText();
