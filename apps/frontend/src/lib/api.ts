// API client functions for fetching data from the API endpoints
import apiService from "./apiService";
import axios from "axios";





const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))



const sortBy:any = {
    "Most Recent":"createdAt",
    "Most Funded":"currentAmount",
    "Ending Soon":"deadline"


}

export async function fetchCampaigns(query:string | undefined = "", category:string | undefined  = "All Categories", page:number | undefined  = 1, sort:string | undefined  = "Most Recent",isActive:boolean | undefined = true) {
  const params = new URLSearchParams({
    search:query,
    category:category == "All Categories"?"":category,
    page: page.toString(),
    sort:sortBy[sort],
    isActive:isActive?"true":"false"
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

export async function fetchAllDonations() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/donation`)

  if (!response.ok) {
    throw new Error("Failed to fetch donations")
  }

  return response.json()
}

export async function fetchAllUsers() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`)

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


export async function fetchAdminStats() {

  // }
  const response = await apiService.get("/user/admin-stats");
  return response;
}

// // API functions for user management
export async function fetchUserById(id: string) {
   const response = await apiService.get(`/user/${id}`);
  return response;
}

export const fetchUserStats = async () => {
  const response = await apiService.get("/user/stats");
  return response;
};

export async function fetchUserCampaigns() {

  const response = await apiService.get("/user/campaigns");
  return response;
}

export async function fetchUserDonations() {

  const response = await apiService.get("/user/donations");
  return response;
}



export async function updateCampaign(id: string, campaignData: any) {
    const response = await apiService.patch(`/campaign/${id}`,campaignData);
  return response;
}

export async function deleteCampaign(id: string) {
   const response = await apiService.delete(`/campaign/${id}`);
  return response;
 
}

export async function pauseCampaign(id: string) {
  return updateCampaign(id, { status: "PENDING" })
}

export async function resumeCampaign(id: string) {
  return updateCampaign(id, { status: "COMPLETED",isActive:true })
}

export async function fetchUser(id:string) {

  const response = await apiService.get(`/user/${id}`);
  return response;

}

export async function updateUser(id:string,data:any) {

  const response = await apiService.patch(`/user/${id}`,data);
  return response;

}

export async function deleteUser(id:string) {

  const response = await apiService.delete(`/user/${id}`);
  return response;

}