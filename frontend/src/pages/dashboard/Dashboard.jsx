import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {latestInvoices,revenueData} from "./components/data"
import { Banknote } from 'lucide-react';
import { Clock } from 'lucide-react';
import { FileText } from 'lucide-react';
import { UsersRound } from 'lucide-react';
import UserImage from "../../assets/ProfileImage.jpg"




export default function Dashboard() {
  return (
    <div className="space-y-6 px-4">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <p className="text-muted-foreground">Welcome back, John</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-accent p-2 rounded-md">
          <CardHeader>
            <CardTitle className=" flex items-center gap-2 text-base"><span><Banknote size={24}/></span>Collected</CardTitle>
          </CardHeader>
          <CardContent className=" bg-card px-3 py-6 h-[96px]  rounded-md">
            <p className="text-sm text-center font-semibold">$20000</p>
          </CardContent>
        </Card>
        <Card className="bg-accent p-2 rounded-md">
          <CardHeader>
            <CardTitle className=" flex items-center gap-2 text-base"><span><Clock size={24}/></span>Pending</CardTitle>
          </CardHeader>
          <CardContent className=" bg-card px-3 py-6 h-[96px]  rounded-md">
            <p className="text-sm text-center font-semibold">$1000</p>
          </CardContent>
        </Card>
        <Card className="bg-accent p-2 rounded-md">
          <CardHeader>
            <CardTitle className=" flex items-center gap-2 text-base"><span><FileText size={24}/></span>Total invoices</CardTitle>
          </CardHeader>
          <CardContent className=" bg-card px-3 py-6 h-[96px]  rounded-md">
            <p className="text-sm text-center font-semibold">35</p>
          </CardContent>
        </Card>
        <Card className="bg-accent p-2 rounded-md">
          <CardHeader>
            <CardTitle className=" flex items-center gap-2 text-base"><span><FileText size={24}/></span>Total Learners</CardTitle>
          </CardHeader>
          <CardContent className=" bg-card px-3 py-6 h-[96px]  rounded-md">
            <p className="text-sm text-center font-semibold">50</p>
          </CardContent>
        </Card>

      </div>

     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
  {/* Bar Chart */}
  <div className="flex flex-col h-full">
    <h3 className="font-semibold mb-[30px]">Recent Revenue</h3>
    <div className="bg-accent p-2 rounded-md h-full flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardContent className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#01589A" />
                  <stop offset="100%" stopColor="#D0E6F7" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #4b5563',
                  color: '#f9fafb',
                }}
                labelStyle={{ color: '#f9fafb' }}
              />
              <Bar
                dataKey="value"
                fill="url(#barGradient)"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  </div>

  {/* Latest Invoices */}
  <div className="flex flex-col h-full">
    <h3 className="font-semibold mb-[30px]">Latest Invoices</h3>
    <div className="bg-accent p-2 rounded-md h-full flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardContent className="flex-1">
          <div className="space-y-4">
            {latestInvoices.map((invoice, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center gap-3">
                  <img src={UserImage} alt="Profile Photo of user" className="w-10 h-10 rounded-full object-cover"/>
                   <div>
                  <p className="font-medium">{invoice.name}</p>
                  <p className="text-sm text-muted-foreground">{invoice.role}</p>
                </div>
                </div>
               
                <p className="font-semibold">{invoice.amount}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
    </div>

    </div>
  );
}
