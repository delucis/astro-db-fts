import { db, Article, sql } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
  await db
    .insert(Article)
    .values(
      articles.map((content, index) => ({
        title: `Article ${index + 1}`,
        content,
      }))
    );

  // Create virtual full-text search table.
  await db.run(
    sql`CREATE VIRTUAL TABLE IF NOT EXISTS UDHRArticles USING FTS5(title, content);`
  );
  // Clean up before re-inserting entries.
  await db.run(sql`DELETE FROM UDHRArticles;`);
  // Insert content into the database.
  await db.run(
    sql`INSERT INTO UDHRArticles (title, content) SELECT title, content FROM ${Article};`
  );
}

/**
 * The Universal Declaration of Human Rights
 * https://www.un.org/en/about-us/universal-declaration-of-human-rights
 */
const articles = [
  'All human beings are born free and equal in dignity and rights. They are endowed with reason and conscience and should act towards one another in a spirit of brotherhood.',
  'Everyone is entitled to all the rights and freedoms set forth in this Declaration, without distinction of any kind, such as race, colour, sex, language, religion, political or other opinion, national or social origin, property, birth or other status. Furthermore, no distinction shall be made on the basis of the political, jurisdictional or international status of the country or territory to which a person belongs, whether it be independent, trust, non-self-governing or under any other limitation of sovereignty.',
  'Everyone has the right to life, liberty and security of person.',
  'No one shall be held in slavery or servitude; slavery and the slave trade shall be prohibited in all their forms.',
  'No one shall be subjected to torture or to cruel, inhuman or degrading treatment or punishment.',
  'Everyone has the right to recognition everywhere as a person before the law.',
  'All are equal before the law and are entitled without any discrimination to equal protection of the law. All are entitled to equal protection against any discrimination in violation of this Declaration and against any incitement to such discrimination.',
  'Everyone has the right to an effective remedy by the competent national tribunals for acts violating the fundamental rights granted him by the constitution or by law.',
  'No one shall be subjected to arbitrary arrest, detention or exile.',
  'Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him.',
  `1. Everyone charged with a penal offence has the right to be presumed innocent until proved guilty according to law in a public trial at which he has had all the guarantees necessary for his defence.
2. No one shall be held guilty of any penal offence on account of any act or omission which did not constitute a penal offence, under national or international law, at the time when it was committed. Nor shall a heavier penalty be imposed than the one that was applicable at the time the penal offence was committed.`,
  'No one shall be subjected to arbitrary interference with his privacy, family, home or correspondence, nor to attacks upon his honour and reputation. Everyone has the right to the protection of the law against such interference or attacks. ',
  `1. Everyone has the right to freedom of movement and residence within the borders of each state.
2. Everyone has the right to leave any country, including his own, and to return to his country.`,
  `1. Everyone has the right to seek and to enjoy in other countries asylum from persecution.
2. This right may not be invoked in the case of prosecutions genuinely arising from non-political crimes or from acts contrary to the purposes and principles of the United Nations.`,
  `1. Everyone has the right to a nationality.
2. No one shall be arbitrarily deprived of his nationality nor denied the right to change his nationality.`,
  `1. Men and women of full age, without any limitation due to race, nationality or religion, have the right to marry and to found a family. They are entitled to equal rights as to marriage, during marriage and at its dissolution.
2. Marriage shall be entered into only with the free and full consent of the intending spouses.
3. The family is the natural and fundamental group unit of society and is entitled to protection by society and the State.`,
  `1. Everyone has the right to own property alone as well as in association with others.
2. No one shall be arbitrarily deprived of his property.`,
  'Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance.',
  'Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers.',
  `1. Everyone has the right to freedom of peaceful assembly and association.
2. No one may be compelled to belong to an association.`,
  `1. Everyone has the right to take part in the government of his country, directly or through freely chosen representatives.
2. Everyone has the right of equal access to public service in his country.
3. The will of the people shall be the basis of the authority of government; this will shall be expressed in periodic and genuine elections which shall be by universal and equal suffrage and shall be held by secret vote or by equivalent free voting procedures.`,
  `Everyone, as a member of society, has the right to social security and is entitled to realization, through national effort and international co-operation and in accordance with the organization and resources of each State, of the economic, social and cultural rights indispensable for his dignity and the free development of his personality.`,
  `1. Everyone has the right to work, to free choice of employment, to just and favourable conditions of work and to protection against unemployment.
2. Everyone, without any discrimination, has the right to equal pay for equal work.
3. Everyone who works has the right to just and favourable remuneration ensuring for himself and his family an existence worthy of human dignity, and supplemented, if necessary, by other means of social protection.
4. Everyone has the right to form and to join trade unions for the protection of his interests.`,
  `Everyone has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay.`,
  `1. Everyone has the right to a standard of living adequate for the health and well-being of himself and of his family, including food, clothing, housing and medical care and necessary social services, and the right to security in the event of unemployment, sickness, disability, widowhood, old age or other lack of livelihood in circumstances beyond his control.
2. Motherhood and childhood are entitled to special care and assistance. All children, whether born in or out of wedlock, shall enjoy the same social protection.`,
  `1. Everyone has the right to education. Education shall be free, at least in the elementary and fundamental stages. Elementary education shall be compulsory. Technical and professional education shall be made generally available and higher education shall be equally accessible to all on the basis of merit.
2. Education shall be directed to the full development of the human personality and to the strengthening of respect for human rights and fundamental freedoms. It shall promote understanding, tolerance and friendship among all nations, racial or religious groups, and shall further the activities of the United Nations for the maintenance of peace.
3. Parents have a prior right to choose the kind of education that shall be given to their children.`,
  `1. Everyone has the right freely to participate in the cultural life of the community, to enjoy the arts and to share in scientific advancement and its benefits.
2. Everyone has the right to the protection of the moral and material interests resulting from any scientific, literary or artistic production of which he is the author.`,
  `Everyone is entitled to a social and international order in which the rights and freedoms set forth in this Declaration can be fully realized.`,
  `1. Everyone has duties to the community in which alone the free and full development of his personality is possible.
2. In the exercise of his rights and freedoms, everyone shall be subject only to such limitations as are determined by law solely for the purpose of securing due recognition and respect for the rights and freedoms of others and of meeting the just requirements of morality, public order and the general welfare in a democratic society.
3. These rights and freedoms may in no case be exercised contrary to the purposes and principles of the United Nations.`,
  `Nothing in this Declaration may be interpreted as implying for any State, group or person any right to engage in any activity or to perform any act aimed at the destruction of any of the rights and freedoms set forth herein.`,
];