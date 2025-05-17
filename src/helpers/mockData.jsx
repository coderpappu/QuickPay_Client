/**
 * Mock data for task management system
 */

// Sample users
export const users = [
  {
    id: "user1",
    name: "John Smith",
    position: "Marketing Manager",
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
  {
    id: "user2",
    name: "Sarah Johnson",
    position: "UX Designer",
    avatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
  {
    id: "user3",
    name: "Michael Chen",
    position: "Developer",
    avatar:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
  {
    id: "user4",
    name: "Emily Wilson",
    position: "Project Manager",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
  {
    id: "user5",
    name: "David Ross",
    position: "Sales Representative",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
];

// Current logged in user
export const currentUser = users[3]; // Emily Wilson (Project Manager)

// Sample tasks
export const tasks = [
  {
    id: "task1",
    title: "Redesign company website homepage",
    description:
      "Update the layout, color scheme, and content of the company homepage to improve user engagement and conversion rates. Include new product highlights and customer testimonials.",
    status: "in_progress",
    priority: "high",
    progress: 65,
    assignedToIdId: users[1], // Sarah
    assignedByIdId: users[3], // Emily
    dueDate: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    createdAt: new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    updatedAt: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    tags: ["website", "design", "marketing"],
    comments: [
      {
        id: "comment1",
        text: "Ive started working on the wireframes. Will share them by EOD.",
        author: users[1],
        createdAt: new Date(new Date().getTime() - 8 * 24 * 60 * 60 * 1000),
      },
      {
        id: "comment2",
        text: "Wireframes look good, approved to move forward with design.",
        author: users[3],
        createdAt: new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000),
      },
    ],
    activities: [
      {
        id: "activity1",
        description: "Task created",
        user: users[3],
        timestamp: new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000),
        type: "created",
      },
      {
        id: "activity2",
        description: "Changed status from Not Started to In Progress",
        user: users[1],
        timestamp: new Date(new Date().getTime() - 8 * 24 * 60 * 60 * 1000),
        type: "status_change",
      },
    ],
  },
  {
    id: "task2",
    title: "Implement employee onboarding workflow",
    description:
      "Create and implement a standardized onboarding workflow for new employees that includes document collection, training schedules, and equipment setup.",
    status: "review",
    priority: "urgent",
    progress: 90,
    assignedToId: users[2], // Michael
    assignedById: users[3], // Emily
    dueDate: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    createdAt: new Date(new Date().getTime() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    updatedAt: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    tags: ["hr", "onboarding", "workflow"],
    comments: [
      {
        id: "comment3",
        text: "Ive completed the workflow design and started implementation.",
        author: users[2],
        createdAt: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
      },
    ],
    activities: [
      {
        id: "activity3",
        description: "Task created",
        user: users[3],
        timestamp: new Date(new Date().getTime() - 15 * 24 * 60 * 60 * 1000),
        type: "created",
      },
      {
        id: "activity4",
        description: "Changed status from In Progress to Under Review",
        user: users[2],
        timestamp: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
        type: "status_change",
      },
    ],
  },
  {
    id: "task3",
    title: "Prepare Q2 sales report",
    description:
      "Compile and analyze sales data from Q2. Generate comprehensive report with visualizations and insights for executive team meeting.",
    status: "not_started",
    priority: "medium",
    progress: 0,
    assignedToId: users[4], // David
    assignedById: users[3], // Emily
    dueDate: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    createdAt: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    updatedAt: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    tags: ["sales", "report", "Q2"],
    comments: [],
    activities: [
      {
        id: "activity5",
        description: "Task created",
        user: users[3],
        timestamp: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000),
        type: "created",
      },
    ],
  },
  {
    id: "task4",
    title: "Develop marketing strategy for new product launch",
    description:
      "Create comprehensive marketing strategy for Q3 product launch including digital, social, PR, and event components.",
    status: "completed",
    priority: "high",
    progress: 100,
    assignedToId: users[0], // John
    assignedById: users[3], // Emily
    dueDate: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago (past due but completed)
    createdAt: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    updatedAt: new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    tags: ["marketing", "product launch", "strategy"],
    comments: [
      {
        id: "comment4",
        text: "First draft of the strategy is complete. Please review.",
        author: users[0],
        createdAt: new Date(new Date().getTime() - 15 * 24 * 60 * 60 * 1000),
      },
      {
        id: "comment5",
        text: "Looks good! A few minor changes needed in the digital section.",
        author: users[3],
        createdAt: new Date(new Date().getTime() - 12 * 24 * 60 * 60 * 1000),
      },
      {
        id: "comment6",
        text: "Final version submitted for approval.",
        author: users[0],
        createdAt: new Date(new Date().getTime() - 8 * 24 * 60 * 60 * 1000),
      },
    ],
    activities: [
      {
        id: "activity6",
        description: "Task created",
        user: users[3],
        timestamp: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
        type: "created",
      },
      {
        id: "activity7",
        description: "Changed status from In Progress to Completed",
        user: users[0],
        timestamp: new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000),
        type: "status_change",
      },
    ],
  },
  {
    id: "task5",
    title: "Update employee handbook",
    description:
      "Review and update the employee handbook with new policies, benefits information, and company procedures.",
    status: "in_progress",
    priority: "low",
    progress: 30,
    assignedToId: users[3], // Emily (assigned to self)
    assignedById: users[3], // Emily
    dueDate: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    createdAt: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    updatedAt: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    tags: ["hr", "documentation", "policy"],
    comments: [],
    activities: [
      {
        id: "activity8",
        description: "Task created",
        user: users[3],
        timestamp: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000),
        type: "created",
      },
      {
        id: "activity9",
        description: "Changed status from Not Started to In Progress",
        user: users[3],
        timestamp: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000),
        type: "status_change",
      },
    ],
  },
];

// Filter options
export const statusOptions = [
  { value: "not_started", label: "Not Started" },
  { value: "in_progress", label: "In Progress" },
  { value: "review", label: "Under Review" },
  { value: "completed", label: "Completed" },
];

export const priorityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];
