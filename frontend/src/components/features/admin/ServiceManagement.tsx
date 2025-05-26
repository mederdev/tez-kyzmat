import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Service } from "@/types";
import { Search, MoreHorizontal, Edit, Trash2, Eye, CheckCircle, XCircle, ToggleLeft, ToggleRight, Loader2 } from "lucide-react";
import { useDeleteService, useToggleAvailability } from '@/hooks/useServices';
import { useLanguage } from "@/contexts/LanguageContext";

interface ServiceManagementProps {
  services: Service[];
  loading: boolean;
  onUpdate: () => void;
}

export function ServiceManagement({ services, loading, onUpdate }: ServiceManagementProps) {
  const { t } = useLanguage();
  const { deleteService, loading: deleteLoading } = useDeleteService();
  const { toggleAvailability, loading: toggleLoading } = useToggleAvailability();
  const [actioningId, setActioningId] = useState<string | null>(null);

  const handleEdit = (service: Service) => {
    console.log(t("admin.services.editingService"), service);
    // TODO: Implement editing functionality
  };

  const handleDelete = async (serviceId: string) => {
    if (!confirm(t("admin.services.deleteConfirm"))) {
      return;
    }

    setActioningId(serviceId);
    const success = await deleteService(serviceId);
    
    if (success) {
      onUpdate();
    }
    setActioningId(null);
  };

  const handleToggleStatus = async (serviceId: string) => {
    setActioningId(serviceId);
    const result = await toggleAvailability(serviceId);
    
    if (result) {
      onUpdate();
    }
    setActioningId(null);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("admin.services.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">{t("common.loading")}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("admin.services.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        {services.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {t("admin.services.noServices")}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("admin.services.columns.name")}</TableHead>
                  <TableHead>{t("admin.services.columns.owner")}</TableHead>
                  <TableHead>{t("admin.services.columns.category")}</TableHead>
                  <TableHead>{t("admin.services.columns.location")}</TableHead>
                  <TableHead>{t("admin.services.columns.price")}</TableHead>
                  <TableHead>{t("admin.services.columns.status")}</TableHead>
                  <TableHead>{t("admin.services.columns.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service._id}>
                    <TableCell className="font-medium">
                      {service.name}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{service.ownerName}</div>
                        <div className="text-sm text-gray-500">{service.contact}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {t(`categories.${service.category}`)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div>{t(`locations.${service.location}`)}</div>
                        {service.districtName && (
                          <div className="text-sm text-gray-500">{service.districtName}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{service.price}</TableCell>
                    <TableCell>
                      <Badge variant={service.available ? 'default' : 'secondary'}>
                        {service.available ? t("services.card.available") : t("services.card.unavailable")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(service)}
                          title={t("admin.services.actions.edit")}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleStatus(service._id)}
                          disabled={actioningId === service._id && toggleLoading}
                          title={service.available ? t("admin.services.actions.disable") : t("admin.services.actions.enable")}
                        >
                          {service.available ? (
                            <ToggleRight className="h-4 w-4 text-green-600" />
                          ) : (
                            <ToggleLeft className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(service._id)}
                          disabled={actioningId === service._id && deleteLoading}
                          className="text-red-600 hover:text-red-700"
                          title={t("admin.services.actions.delete")}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            {t("admin.services.total")}: {services.length}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 