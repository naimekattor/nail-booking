"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Settings, Mail, Clock, User, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SendLog {
  id: string;
  sendTime: string;
  recipientEmail: string;
  templateName: string;
  status: "success" | "failed";
  errorMessage?: string;
}

export default function EmailAutomation() {
  const { toast } = useToast();
  const [triggerEvent, setTriggerEvent] = useState("");
  const [edmTemplate, setEdmTemplate] = useState("");
  const [automationEnabled, setAutomationEnabled] = useState(false);

  const [sendLogs] = useState<SendLog[]>([
    {
      id: "1",
      sendTime: "2024-01-15 14:30:25",
      recipientEmail: "john.smith@acme.com",
      templateName: "Welcome Email - Subscription Success",
      status: "success",
    },
    {
      id: "2",
      sendTime: "2024-01-15 14:25:12",
      recipientEmail: "admin@techstart.io",
      templateName: "Payment Success Confirmation",
      status: "success",
    },
    {
      id: "3",
      sendTime: "2024-01-15 13:45:33",
      recipientEmail: "finance@globalsol.com",
      templateName: "Payment Failed Notification",
      status: "failed",
      errorMessage: "Invalid email address",
    },
    {
      id: "4",
      sendTime: "2024-01-15 12:20:44",
      recipientEmail: "ceo@startupxy.com",
      templateName: "Account Registration Confirmation",
      status: "success",
    },
    {
      id: "5",
      sendTime: "2024-01-15 11:15:18",
      recipientEmail: "billing@enterprise.com",
      templateName: "Subscription Cancelled",
      status: "success",
    },
    {
      id: "6",
      sendTime: "2024-01-15 10:30:55",
      recipientEmail: "invalid@email",
      templateName: "Payment Success Confirmation",
      status: "failed",
      errorMessage: "Invalid email address",
    },
  ]);

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Email automation settings have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen ">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Top Section - Settings and Template Info */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Trigger Settings */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="h-5 w-5" />
                Trigger Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="trigger-event">Trigger Event</Label>
                <Select value={triggerEvent} onValueChange={setTriggerEvent}>
                  <SelectTrigger id="trigger-event" className="bg-background">
                    <SelectValue placeholder="Select trigger event" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="subscription">
                      New Subscription
                    </SelectItem>
                    <SelectItem value="payment">Payment Received</SelectItem>
                    <SelectItem value="cancellation">
                      Subscription Cancelled
                    </SelectItem>
                    <SelectItem value="renewal">
                      Subscription Renewal
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edm-template">EDM Template Selection</Label>
                <Select value={edmTemplate} onValueChange={setEdmTemplate}>
                  <SelectTrigger id="edm-template" className="bg-background">
                    <SelectValue placeholder="Select Brevo template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="welcome">Welcome Email</SelectItem>
                    <SelectItem value="payment-success">
                      Payment Success
                    </SelectItem>
                    <SelectItem value="payment-failed">
                      Payment Failed
                    </SelectItem>
                    <SelectItem value="cancellation">
                      Cancellation Notice
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border bg-background p-4">
                <div>
                  <p className="font-medium">Automation Status</p>
                  <p className="text-sm text-muted-foreground">
                    {automationEnabled
                      ? "Automation is enabled"
                      : "Automation is disabled"}
                  </p>
                </div>
                <Switch
                  checked={automationEnabled}
                  onCheckedChange={setAutomationEnabled}
                />
              </div>

              <Button
                onClick={handleSaveSettings}
                className="w-full bg-black text-white hover:bg-black/90"
              >
                Save Settings
              </Button>
            </CardContent>
          </Card>

          {/* EDM Template Info */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Mail className="h-5 w-5" />
                EDM Template Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-[300px] flex-col items-center justify-center text-center">
                <Mail className="mb-4 h-16 w-16 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">
                  Select a template to view details
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Send Logs */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5" />
              Send Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                      Send Time
                    </th>
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                      Recipient Email
                    </th>
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                      Template Name
                    </th>
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                      Error Message
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sendLogs.map((log) => (
                    <tr
                      key={log.id}
                      className="border-b border-border/50 last:border-0"
                    >
                      <td className="py-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {log.sendTime}
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-muted-foreground" />
                          {log.recipientEmail}
                        </div>
                      </td>
                      <td className="py-4 text-sm">{log.templateName}</td>
                      <td className="py-4">
                        {log.status === "success" ? (
                          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                            <span className="mr-1">✓</span> Success
                          </Badge>
                        ) : (
                          <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
                            <span className="mr-1">✕</span> Failed
                          </Badge>
                        )}
                      </td>
                      <td className="py-4">
                        {log.errorMessage ? (
                          <div className="flex items-center gap-2 text-sm text-red-500">
                            <AlertCircle className="h-4 w-4" />
                            {log.errorMessage}
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            -
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
