import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { revenueData } from "./components/data";
import { Banknote, Clock, FileText } from "lucide-react";
import { useCourse } from "../../context/CourseContext";
import { setPageSEO } from "../../utils/seo";

export default function Dashboard() {
  const [invoices, setInvoices] = useState([]);
  const [invoiceCount, setInvoiceCount] = useState(0);
  const [learnersCount, setLearnersCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { getInvoices, getLearner } = useCourse();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const [invoiceRes, learnerRes] = await Promise.all([
          getInvoices(),
          getLearner(),
        ]);

        setInvoices(invoiceRes.data.invoices || []);
        setInvoiceCount(invoiceRes.data.count || 0);
        const learnersData = learnerRes?.data;
        const computedLearnersCount = Array.isArray(learnersData)
          ? learnersData.length
          : (learnersData?.count ?? learnersData?.learners?.length ?? 0);
        setLearnersCount(computedLearnersCount);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setErrorMessage("Failed to load dashboard data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [getInvoices, getLearner]);

  useEffect(() => {
    setPageSEO({
      title: "Dashboard",
      description:
        "LMS Dashboard: overview of learners, invoices, and recent revenue.",
    });
  }, []);

  const totalPaid = useMemo(
    () =>
      invoices.reduce(
        (sum, inv) => (inv.status === "paid" ? sum + inv.amount : sum),
        0,
      ),
    [invoices],
  );

  const totalPending = useMemo(
    () =>
      invoices.reduce(
        (sum, inv) => (inv.status === "pending" ? sum + inv.amount : sum),
        0,
      ),
    [invoices],
  );

  const latestInvoices = invoices.map((inv) => ({
    id: inv._id,
    firstName: inv.learner?.firstName,
    lastName: inv.learner?.lastName,
    amount: inv.amount,
    role: inv.learner?.role,
    image: inv.learner?.profileImage,
  }));
  // fetching user from session storage
  const user = sessionStorage.getItem("User");
  const parsedUser = user ? JSON.parse(user) : {};

  return (
    <div className="relative space-y-6 px-4">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <p className="text-muted-foreground">
        Welcome back, {parsedUser?.firstName || ""}
      </p>

      {errorMessage ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 flex items-center justify-between gap-3">
          <span>{errorMessage}</span>
          <button
            type="button"
            onClick={() => {
              setIsLoading(true);
              setErrorMessage("");
              Promise.all([
                getInvoices({ force: true }),
                getLearner({ force: true }),
              ])
                .then(([invoiceRes, learnerRes]) => {
                  setInvoices(invoiceRes.data.invoices || []);
                  setInvoiceCount(invoiceRes.data.count || 0);
                  const learnersData = learnerRes?.data;
                  const computedLearnersCount = Array.isArray(learnersData)
                    ? learnersData.length
                    : (learnersData?.count ??
                      learnersData?.learners?.length ??
                      0);
                  setLearnersCount(computedLearnersCount);
                })
                .catch((error) => {
                  console.error("Error fetching dashboard data:", error);
                  setErrorMessage(
                    "Failed to load dashboard data. Please try again.",
                  );
                })
                .finally(() => setIsLoading(false));
            }}
            className="shrink-0 rounded-md border border-red-200 bg-white px-3 py-1 text-xs font-medium"
          >
            Retry
          </button>
        </div>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Collected", value: totalPaid, icon: Banknote },
          { title: "Pending", value: totalPending, icon: Clock },
          { title: "Total invoices", value: invoiceCount, icon: FileText },
          { title: "Total Learners", value: learnersCount, icon: FileText },
        ].map(({ title, value, icon: IconComponent }) => {
          const Icon = IconComponent;
          return (
            <Card key={title} className="bg-accent p-2 rounded-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Icon size={24} /> {title}
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-card px-3 py-6 h-[96px] rounded-md">
                {isLoading ? (
                  <div className="h-full flex flex-col items-center justify-center gap-2 animate-pulse">
                    <div className="h-4 w-24 bg-muted rounded" />
                    <div className="h-3 w-16 bg-muted rounded" />
                  </div>
                ) : (
                  <p className="text-sm text-center font-semibold">
                    {title === "Collected" || title === "Pending"
                      ? `$${value}`
                      : value}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
        {/* Bar Chart */}
        <div className="flex flex-col h-full">
          <h3 className="font-semibold mb-[30px]">Recent Revenue</h3>
          <div className="bg-accent p-2 rounded-md h-full flex flex-col">
            <Card className="flex-1 flex flex-col">
              <CardContent className="flex-1">
                {isLoading ? (
                  <div className="h-full w-full animate-pulse space-y-4 py-4">
                    <div className="h-4 w-1/3 bg-muted rounded" />
                    <div className="h-4 w-1/4 bg-muted rounded" />
                    <div className="grid grid-cols-6 gap-3 items-end h-[220px]">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-full bg-muted rounded-md"
                          style={{ height: `${80 + i * 18}px` }}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <defs>
                        <linearGradient
                          id="barGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop offset="0%" stopColor="#01589A" />
                          <stop offset="100%" stopColor="#D0E6F7" />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          border: "1px solid #4b5563",
                          color: "#f9fafb",
                        }}
                        labelStyle={{ color: "#f9fafb" }}
                      />
                      <Bar
                        dataKey="value"
                        fill="url(#barGradient)"
                        radius={[4, 4, 0, 0]}
                        barSize={20}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
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
                  {isLoading
                    ? Array.from({ length: 5 }).map((_, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between border-b pb-2 animate-pulse"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-muted" />
                            <div className="space-y-2">
                              <div className="h-4 w-32 bg-muted rounded" />
                              <div className="h-3 w-20 bg-muted rounded" />
                            </div>
                          </div>
                          <div className="h-4 w-16 bg-muted rounded" />
                        </div>
                      ))
                    : latestInvoices.map((inv, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between border-b pb-2"
                        >
                          <div className="flex items-center gap-3">
                            {inv.image ? (
                              <img
                                src={inv.image}
                                alt="Profile"
                                loading="lazy"
                                decoding="async"
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <span className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-medium text-sm text-gray-700">
                                {inv.firstName?.[0]}
                                {inv.lastName?.[0]}
                              </span>
                            )}
                            <div>
                              <p className="font-medium">
                                {inv.firstName} {inv.lastName}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {inv.role}
                              </p>
                            </div>
                          </div>
                          <p className="font-semibold">
                            ${Number(inv.amount || 0).toLocaleString("en-US")}
                          </p>
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
