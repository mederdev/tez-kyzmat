import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, Layers, TrendingUp, Loader2 } from "lucide-react";
import { AdminStats as AdminStatsType } from "@/types";

interface AdminStatsProps {
  stats: AdminStatsType | null;
  loading: boolean;
}

export function AdminStats({ stats, loading }: AdminStatsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-20">
                <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-gray-500">
              Статистика жеткиликсиз
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statsData = [
    {
      title: "Жалпы колдонуучулар",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Жалпы кызматтар",
      value: stats.totalServices,
      icon: Package,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Категориялар",
      value: stats.totalCategories,
      icon: Layers,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Активдүү кызматтар",
      value: Object.values(stats.servicesByCategory).reduce((sum, count) => sum + count, 0),
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
} 