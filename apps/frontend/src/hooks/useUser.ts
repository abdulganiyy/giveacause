import { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import apiService from "@/lib/apiService";
import { useQuery } from "@tanstack/react-query";

function getCookie(name:string) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

const fetchProfile = async () => {
  const response = await apiService.get('/auth/profile')
  return response
};


export function useUser() {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

const { data, isLoading, error } = useQuery({queryKey:['profile'],queryFn:fetchProfile});


// console.log(data)

  return { data, isLoading, error };
}
