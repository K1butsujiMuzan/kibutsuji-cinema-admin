type THelpData = {
  title: string
  list?: string[]
  paragraph?: string
}

export const HELP_DATA: THelpData[] = [
  {
    title: 'What is this program',
    paragraph:
      'The admin panel is designed for complete management of the online anime theater website. Regular viewers have no access here — only administrators and moderators.',
  },
  {
    title: 'What you can do',
    list: [
      'Manage the anime catalog: add new titles, edit descriptions, posters, genres, episodes, delete outdated entries.',
      'Work with episodes: upload videos, change order, hide or remove episodes.',
      'Configure genres: create new ones, rename, delete unused ones.',
      'Manage users: view the list, change roles (USER / MODERATOR / ADMIN), block if necessary.',
      'Control subscriptions and transactions: activate, change plan (FAN / MEGAFAN), track payment history.',
      'Moderate comments: remove spam and offensive messages, monitor likes.',
      'Generate reports: subscription agreement (PDF), top views (Excel), top subscriptions (Excel) for any period.',
    ],
  },
  {
    title: 'What you cannot do (restrictions)',
    list: [
      'Access personal data not related to site management (e.g., user passwords are stored encrypted and are not visible).',
      'Make changes that break the system (direct database queries, deleting service records) — contact the technical administrator for such tasks.',
      'Delete objects without confirmation — all critical actions include a confirmation dialog.',
    ],
  },
  {
    title: 'How to work in general',
    list: [
      'Use the main menu (left or top) to navigate between sections.',
      'To add any object, click the "Add" button, fill in the required fields, and save.',
      'Editing and deleting are performed via buttons in table rows.',
      'Reports are generated in the "Reports" section: choose the type, set the period, click "Generate".',
      'All your actions are recorded in the operation log — this helps during audits.',
      'If you encounter errors or unclear situations, contact the developer or system administrator.',
    ],
  },
  {
    title: 'First steps for a new administrator',
    list: [
      'Check and, if necessary, fill the genre catalog.',
      'Add a few anime with episodes so the site is not empty.',
      'Set up subscriptions for paid content, if used.',
      'Periodically check comments for violations.',
      'Always log out of the system after finishing work (the "Logout" button).',
    ],
    paragraph:
      'This is basic information. More detailed instructions for each section can be obtained from the technical specialist.',
  },
]
