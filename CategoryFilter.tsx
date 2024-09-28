'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getAllCategories } from '@/lib/actions/category.actions'
import { ICategory } from '@/lib/database/models/category.model'
import { DatePicker } from "@/components/ui/date-picker"

// You'll need to create these actions or modify existing ones
import { getAllOrganizations } from '@/lib/actions/organization.actions'
import { getAllDepartments } from '@/lib/actions/department.actions'

interface IOrganization {
  _id: string
  name: string
}

interface IDepartment {
  _id: string
  name: string
}

const CategoryFilter = () => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [organizations, setOrganizations] = useState<IOrganization[]>([])
  const [departments, setDepartments] = useState<IDepartment[]>([])
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const fetchFilterData = async () => {
      const categoryList = await getAllCategories()
      const organizationList = await getAllOrganizations()
      const departmentList = await getAllDepartments()

      setCategories(categoryList as ICategory[])
      setOrganizations(organizationList as IOrganization[])
      setDepartments(departmentList as IDepartment[])
    }

    fetchFilterData()
  }, [])

  const onFilterChange = (key: string, value: string) => {
    let newUrl = ''
    if (value && value !== 'All') {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: key,
        value: value
      })
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: [key],
      })
    }
    router.push(newUrl, { scroll: false })
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Select onValueChange={(value: string) => onFilterChange('category', value)}>
        <SelectTrigger className="select-field">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className='rounded-lg'>
          <SelectItem value="All" className='select-item p-regular-14'>All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem value={category.name} key={category._id} className='select-item p-regular-14'>{category.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={(value: string) => onFilterChange('organization', value)}>
        <SelectTrigger className="select-field">
          <SelectValue placeholder="Organization/College" />
        </SelectTrigger>
        <SelectContent className='rounded-lg'>
          <SelectItem value="All" className='select-item p-regular-14'>All Organizations</SelectItem>
          {organizations.map((org) => (
            <SelectItem value={org.name} key={org._id} className='select-item p-regular-14'>{org.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={(value: string) => onFilterChange('department', value)}>
        <SelectTrigger className="select-field">
          <SelectValue placeholder="Department" />
        </SelectTrigger>
        <SelectContent className='rounded-lg'>
          <SelectItem value="All" className='select-item p-regular-14'>All Departments</SelectItem>
          {departments.map((dept) => (
            <SelectItem value={dept.name} key={dept._id} className='select-item p-regular-14'>{dept.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DatePicker 
        onSelect={(date) => onFilterChange('date', date ? date.toISOString() : 'All')}
      />

      <Select onValueChange={(value: string) => onFilterChange('price', value)}>
        <SelectTrigger className="select-field">
          <SelectValue placeholder="Price" />
        </SelectTrigger>
        <SelectContent className='rounded-lg'>
          <SelectItem value="All" className='select-item p-regular-14'>All Prices</SelectItem>
          <SelectItem value="free" className='select-item p-regular-14'>Free</SelectItem>
          <SelectItem value="paid" className='select-item p-regular-14'>Paid</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default CategoryFilter;