// API client functions for fetching data from the API endpoints
import apiService from "./apiService";
import axios from "axios";

export const campaignsData = [
  {
    id: 1,
    title: "Help Sarah Rebuild After House Fire",
    description:
      "Sarah and her two young children lost everything when their home was destroyed in a devastating house fire. They need our help to rebuild their lives.",
    fullDescription:
      "On December 15th, Sarah and her two young children lost everything when their home was destroyed in a devastating house fire. Thankfully, everyone escaped safely, but they now face the overwhelming task of rebuilding their lives from scratch. Sarah is a single mother who works as a nurse, dedicating her life to helping others. Now, she needs our help.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&crop=center",
    category: "Emergency",
    goalAmount: 50000,
    raisedAmount: 32750,
    donorCount: 247,
    daysLeft: 23,
    featured: true,
    trending: true,
    status: "active",
    createdAt: "2023-11-01",
    organizer: {
      name: "Michael Johnson",
      relationship: "Family Friend",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: 2,
    title: "Life-Saving Surgery for Max",
    description: "Max needs an urgent heart surgery that his family cannot afford. Your donation could save his life.",
    fullDescription:
      "Max, a 7-year-old boy, has been diagnosed with a rare heart condition that requires immediate surgery. His family has exhausted their savings and insurance coverage, but they're still short of the amount needed for this life-saving procedure. Max is a bright, energetic child who loves soccer and dreams of becoming a doctor someday. With your help, we can ensure he gets the chance to pursue those dreams.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&crop=center",
    category: "Medical",
    goalAmount: 75000,
    raisedAmount: 45000,
    donorCount: 312,
    daysLeft: 15,
    featured: true,
    trending: false,
    status: "active",
    createdAt: "2023-10-15",
    organizer: {
      name: "Rebecca Miller",
      relationship: "Family Friend",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: 3,
    title: "Community Garden Project",
    description:
      "Help us transform an abandoned lot into a beautiful community garden that will provide fresh produce for local families.",
    fullDescription:
      "Our neighborhood has an abandoned lot that has become an eyesore and safety concern. We have permission from the city to transform it into a community garden that will provide fresh, organic produce for local families, including those who can't afford healthy food options. The garden will also serve as an educational space for local schools and a gathering place for community events. Your donation will help us purchase soil, seeds, tools, and build accessible garden beds.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop&crop=center",
    category: "Community",
    goalAmount: 15000,
    raisedAmount: 9800,
    donorCount: 124,
    daysLeft: 45,
    featured: false,
    trending: true,
    status: "active",
    createdAt: "2023-10-20",
    organizer: {
      name: "Jamal Washington",
      relationship: "Community Leader",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: 4,
    title: "Support Local Animal Shelter",
    description: "Our animal shelter is at capacity and needs funds for food, medical care, and facility improvements.",
    fullDescription:
      "Our local animal shelter is currently housing over 200 animals, which is well beyond our intended capacity. We urgently need funds to provide proper food, medical care, and essential facility improvements to ensure these animals receive the care they deserve. Your donation will directly impact the lives of these animals, providing them with proper nutrition, necessary medical treatments, and a more comfortable environment while they wait for their forever homes.",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop&crop=center",
    category: "Animals",
    goalAmount: 20000,
    raisedAmount: 12500,
    donorCount: 189,
    daysLeft: 30,
    featured: false,
    trending: true,
    status: "active",
    createdAt: "2023-11-05",
    organizer: {
      name: "Emma Rodriguez",
      relationship: "Shelter Director",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: 5,
    title: "College Fund for First-Generation Students",
    description:
      "Help provide scholarships for talented students who are the first in their families to attend college.",
    fullDescription:
      "Education can break the cycle of poverty, but many talented students can't afford college tuition. Our scholarship fund specifically targets first-generation college students from low-income backgrounds who have demonstrated academic excellence and community involvement. Your donation will help cover tuition, books, and living expenses for these deserving students, giving them the opportunity to build a better future for themselves and their families.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop&crop=center",
    category: "Education",
    goalAmount: 100000,
    raisedAmount: 67500,
    donorCount: 423,
    daysLeft: 60,
    featured: true,
    trending: false,
    status: "active",
    createdAt: "2023-09-10",
    organizer: {
      name: "Dr. Patricia Lee",
      relationship: "Education Foundation Director",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: 6,
    title: "Rebuild Local School After Tornado",
    description: "Our town's elementary school was severely damaged by a tornado. Help us rebuild it for our children.",
    fullDescription:
      "Last month, a devastating EF-3 tornado tore through our small town, causing significant damage to our only elementary school. While insurance will cover some of the rebuilding costs, we need additional funds to ensure the new school has proper safety features, updated learning technology, and accessible facilities for all students. The 350 students are currently attending classes in temporary facilities, but we need to rebuild quickly to provide them with a proper learning environment.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop&crop=center",
    category: "Emergency",
    goalAmount: 200000,
    raisedAmount: 125000,
    donorCount: 578,
    daysLeft: 90,
    featured: false,
    trending: false,
    status: "active",
    createdAt: "2023-10-01",
    organizer: {
      name: "Principal Robert Thompson",
      relationship: "School Principal",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: 7,
    title: "Clean Water Initiative",
    description:
      "Help us bring clean drinking water to communities that currently lack access to this basic necessity.",
    fullDescription:
      "Access to clean water is a fundamental human right, yet millions around the world still lack this basic necessity. Our organization is working to install water purification systems in five villages in rural East Africa where residents currently walk miles each day to collect water that is often contaminated. Your donation will help fund the drilling of wells, installation of filtration systems, and education programs to ensure sustainable water management for generations to come.",
    image: "https://images.unsplash.com/photo-1541544181051-e46607bc22a4?w=600&h=400&fit=crop&crop=center",
    category: "Environment",
    goalAmount: 35000,
    raisedAmount: 21000,
    donorCount: 210,
    daysLeft: 40,
    featured: false,
    trending: false,
    status: "active",
    createdAt: "2023-11-10",
    organizer: {
      name: "Daniel Okafor",
      relationship: "Project Director",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: 8,
    title: "Support for Veterans Housing Project",
    description:
      "We're building affordable housing for homeless veterans in our community. Your donation makes a difference.",
    fullDescription:
      "After serving our country, no veteran should be without a home. Yet in our community, over 50 veterans are currently homeless. We're partnering with local contractors and volunteers to build a 20-unit housing complex specifically for veterans in need. These apartments will be offered at significantly reduced rent, with support services on-site to help with employment, healthcare, and reintegration. Your donation will help cover construction costs and ensure these heroes have a safe place to call home.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&crop=center",
    category: "Housing",
    goalAmount: 150000,
    raisedAmount: 98000,
    donorCount: 356,
    daysLeft: 75,
    featured: false,
    trending: false,
    status: "active",
    createdAt: "2023-09-25",
    organizer: {
      name: "Colonel James Wilson (Ret.)",
      relationship: "Veterans Support Organization",
      avatar: "/placeholder-user.jpg",
    },
  },
]

export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  role: "user" | "admin"
  createdAt: string
  totalRaised: number
  totalDonated: number
  campaignsCreated: number
  donationsMade: number
  paystackSubaccount?: string
}

export interface DashboardStats {
  totalCampaigns: number
  totalRaised: number
  totalDonors: number
  activeCampaigns: number
  completedCampaigns: number
  recentDonations: any[]
  topCampaigns: any[]
  monthlyStats: Array<{
    month: string
    raised: number
    donations: number
  }>
}

// Mock data for donations
export const donationsData = {
  1: [
    {
      id: 1,
      campaignId: 1,
      name: "Anonymous",
      amount: 500,
      message: "Praying for your family. Stay strong! 🙏",
      time: "2 hours ago",
      avatar: null,
    },
    {
      id: 2,
      campaignId: 1,
      name: "Jennifer Martinez",
      amount: 100,
      message: "Sarah helped take care of my mom at the hospital. She's an angel.",
      time: "4 hours ago",
      avatar: "/placeholder-user.jpg",
    },
    {
      id: 3,
      campaignId: 1,
      name: "David Chen",
      amount: 250,
      message: "Hope this helps with getting back on your feet.",
      time: "6 hours ago",
      avatar: "/placeholder-user.jpg",
    },
    {
      id: 4,
      campaignId: 1,
      name: "Lisa Thompson",
      amount: 75,
      message: "Sending love and support from our family to yours.",
      time: "8 hours ago",
      avatar: "/placeholder-user.jpg",
    },
    {
      id: 5,
      campaignId: 1,
      name: "Robert Wilson",
      amount: 200,
      message: "",
      time: "12 hours ago",
      avatar: "/placeholder-user.jpg",
    },
    {
      id: 6,
      campaignId: 1,
      name: "Anonymous",
      amount: 50,
      message: "Every little bit helps. God bless.",
      time: "1 day ago",
      avatar: null,
    },
    {
      id: 7,
      campaignId: 1,
      name: "Maria Garcia",
      amount: 300,
      message: "Sarah is such a caring nurse. We're here for you!",
      time: "1 day ago",
      avatar: "/placeholder-user.jpg",
    },
    {
      id: 8,
      campaignId: 1,
      name: "James Anderson",
      amount: 150,
      message: "Wishing you and your children all the best.",
      time: "2 days ago",
      avatar: "/placeholder-user.jpg",
    },
  ],
  2: [
    {
      id: 1,
      campaignId: 2,
      name: "Thomas Wright",
      amount: 1000,
      message: "As a heart patient myself, I know how important this surgery is. Stay strong, Max!",
      time: "1 hour ago",
      avatar: "/placeholder-user.jpg",
    },
    {
      id: 2,
      campaignId: 2,
      name: "Anonymous",
      amount: 250,
      message: "Praying for a successful surgery and quick recovery.",
      time: "3 hours ago",
      avatar: null,
    },
  ],
  // Add more donations for other campaigns as needed
}

export interface Campaign {
  id: number
  title: string
  description: string
  fullDescription: string
  image: string
  category: string
  goalAmount: number
  raisedAmount: number
  donorCount: number
  daysLeft: number
  featured: boolean
  trending: boolean
  status: "active" | "paused" | "completed" | "cancelled"
  createdAt: string
  organizer: {
    name: string
    relationship: string
    avatar: string
  }
}

// Mock users data
export const usersData: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    role: "user",
    createdAt: "2023-01-15",
    totalRaised: 45000,
    totalDonated: 2500,
    campaignsCreated: 2,
    donationsMade: 15,
    paystackSubaccount: "ACCT_john_doe_123",
  },
  {
    id: 2,
    name: "Admin User",
    email: "admin@fundhope.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    role: "admin",
    createdAt: "2023-01-01",
    totalRaised: 0,
    totalDonated: 5000,
    campaignsCreated: 0,
    donationsMade: 25,
  },
]

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))



const sortBy:any = {
    "Most Recent":"createdAt",
    "Most Funded":"currentAmount",
    "Ending Soon":"deadline"


}

export async function fetchCampaigns(query = "", category = "All Categories", page = 1, sort = "Most Recent") {
  const params = new URLSearchParams({
    search:query,
    category:category == "All Categories"?"":category,
    page: page.toString(),
    sort:sortBy[sort],
  })

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/campaign?${params.toString()}`)

  if (!response.ok) {
    throw new Error("Failed to fetch campaigns")
  }

  return response.json()
}

export async function fetchFeaturedCampaigns() {

  const params = new URLSearchParams({
      featured:"true"
  })

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/campaign?${params.toString()}`)

  if (!response.ok) {
    throw new Error("Failed to fetch featured campaigns")
  }

  return response.json()
}

export async function fetchTrendingCampaigns() {
  const params = new URLSearchParams({
      trending:"true"
  })

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/campaign?${params.toString()}`)

  if (!response.ok) {
    throw new Error("Failed to fetch trending campaigns")
  }

  return response.json()
}

export async function fetchCampaignById(id:any) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/campaign/${id}`)

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Campaign not found")
    }
    throw new Error("Failed to fetch campaign")
  }

  return response.json()
}

export async function fetchDonationsByCampaignId(campaignId: any) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${campaignId}/donations`)

  if (!response.ok) {
    throw new Error("Failed to fetch donations")
  }

  return response.json()
}

export async function fetchCategories() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`)

  if (!response.ok) {
    throw new Error("Failed to fetch categories")
  }

  return response.json()
}



export async function submitDonation(data: {
  campaignId: string
  userId?: string
  name: string
  email: string
  amount: number
  message?: string
  anonymous?: boolean
}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/donation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "Failed to submit donation")
  }

  return response.json()
}

// API functions for donations
export async function createDonation(donationData: {
  campaignId: number
  donorName: string
  donorEmail: string
  amount: number
  message?: string
  anonymous: boolean
  platformTip: number
  paymentReference: string
}) {

  // In a real app, this would make an API call to your backend
  const newDonation = {
    id: Date.now(),
    campaignId: donationData.campaignId,
    name: donationData.anonymous ? "Anonymous" : donationData.donorName,
    amount: donationData.amount,
    message: donationData.message || "",
    time: "Just now",
    avatar: donationData.anonymous ? null : "/placeholder-user.jpg",
    paymentReference: donationData.paymentReference,
    platformTip: donationData.platformTip,
  }
  return newDonation
}

export async function verifyPaystackTransaction(reference: string) {

  // In a real app, this would verify the transaction with Paystack
  // using your secret key on the backend
  return {
    status: "success",
    reference,
    amount: 5000, // Amount in kobo
    currency: "USD",
    paid_at: new Date().toISOString(),
    customer: {
      email: "donor@example.com",
    },
  }
}

export async function sendDonationNotification(donationData: {
  campaignId: number
  donorName: string
  amount: number
  campaignTitle: string
  organizerEmail: string
}) {

  // In a real app, this would send email notifications
  console.log("Sending donation notification:", donationData)
  return { success: true }
}


export async function fetchAdminStats() {
  // await delay(700)
  // return {
  //   totalUsers: usersData.length,
  //   totalCampaigns: campaignsData.length,
  //   totalRaised: campaignsData.reduce((sum, c) => sum + c.raisedAmount, 0),
  //   platformRevenue: 45000, // 3% of total raised
  //   pendingCampaigns: 12,
  //   flaggedCampaigns: 3,
  //   recentUsers: usersData.slice(-5),
  //   topCampaigns: [...campaignsData].sort((a, b) => b.raisedAmount - a.raisedAmount).slice(0, 10),
  // }
  const response = await apiService.get("/user/admin-stats");
  return response;
}

// // API functions for user management
// export async function fetchUserById(id: number) {
//   await delay(500)
//   const user = usersData.find((u) => u.id === id)
//   if (!user) {
//     throw new Error(`User with id ${id} not found`)
//   }
//   return user
// }

export const fetchUserStats = async () => {
  const response = await apiService.get("/user/stats");
  return response;
};

export async function fetchUserCampaigns() {

  const response = await apiService.get("/user/campaigns");
  return response;
  // await delay(600)
  // return campaignsData.filter((campaign) =>
  //   // In a real app, campaigns would have an ownerId field
  //   userId === 1 ? [1, 3].includes(campaign.id) : [],
  // )
}

export async function fetchUserDonations() {
  // await delay(600)
  // // Mock user donations
  // return [
  //   {
  //     id: 1,
  //     campaignId: 2,
  //     campaignTitle: "Life-Saving Surgery for Max",
  //     amount: 250,
  //     date: "2023-12-01",
  //     anonymous: false,
  //   },
  //   {
  //     id: 2,
  //     campaignId: 4,
  //     campaignTitle: "Support Local Animal Shelter",
  //     amount: 100,
  //     date: "2023-11-28",
  //     anonymous: true,
  //   },
  // ]


  const response = await apiService.get("/user/donations");
  return response;
}



// Campaign management functions
export async function createCampaign(
  campaignData: Omit<
    Campaign,
    "id" | "raisedAmount" | "donorCount" | "daysLeft" | "featured" | "trending" | "status" | "createdAt"
  >,
) {
  await delay(1000)

  const newCampaign: Campaign = {
    ...campaignData,
    id: Date.now(),
    raisedAmount: 0,
    donorCount: 0,
    daysLeft: 60, // Default 60 days
    featured: false,
    trending: false,
    status: "active",
    createdAt: new Date().toISOString().split("T")[0],
  }

  campaignsData.push(newCampaign)
  return newCampaign
}

export async function updateCampaign(id: number, campaignData: Partial<Campaign>) {
  await delay(800)

  const campaignIndex = campaignsData.findIndex((c) => c.id === id)
  if (campaignIndex === -1) {
    throw new Error(`Campaign with id ${id} not found`)
  }

  campaignsData[campaignIndex] = { ...campaignsData[campaignIndex], ...campaignData }
  return campaignsData[campaignIndex]
}

export async function deleteCampaign(id: number) {
  await delay(500)

  const campaignIndex = campaignsData.findIndex((c) => c.id === id)
  if (campaignIndex === -1) {
    throw new Error(`Campaign with id ${id} not found`)
  }

  const deletedCampaign = campaignsData.splice(campaignIndex, 1)[0]

  // Also remove associated donations
  delete donationsData[id as keyof typeof donationsData]

  return deletedCampaign
}

export async function pauseCampaign(id: number) {
  await delay(500)
  return updateCampaign(id, { status: "paused" })
}

export async function resumeCampaign(id: number) {
  await delay(500)
  return updateCampaign(id, { status: "active" })
}

export async function fetchUser(id:string) {

  const response = await apiService.get(`/user/${id}`);
  return response;

}