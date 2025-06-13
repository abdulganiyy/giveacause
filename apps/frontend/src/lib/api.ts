// API client functions for fetching data from the API endpoints
import apiService from "./apiService";
import axios from "axios";


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
