// "use client";

// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { Badge } from "@/components/ui/badge";
// import { Settings, Mail, Clock, User, AlertCircle } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// interface SendLog {
//   id: string;
//   sendTime: string;
//   recipientEmail: string;
//   templateName: string;
//   status: "success" | "failed";
//   errorMessage?: string;
// }

// export default function EmailAutomation() {
//   const { toast } = useToast();
//   const [triggerEvent, setTriggerEvent] = useState("");
//   const [edmTemplate, setEdmTemplate] = useState("");
//   const [automationEnabled, setAutomationEnabled] = useState(false);

//   const [sendLogs] = useState<SendLog[]>([
//     {
//       id: "1",
//       sendTime: "2024-01-15 14:30:25",
//       recipientEmail: "john.smith@acme.com",
//       templateName: "Welcome Email - Subscription Success",
//       status: "success",
//     },
//     {
//       id: "2",
//       sendTime: "2024-01-15 14:25:12",
//       recipientEmail: "admin@techstart.io",
//       templateName: "Payment Success Confirmation",
//       status: "success",
//     },
//     {
//       id: "3",
//       sendTime: "2024-01-15 13:45:33",
//       recipientEmail: "finance@globalsol.com",
//       templateName: "Payment Failed Notification",
//       status: "failed",
//       errorMessage: "Invalid email address",
//     },
//     {
//       id: "4",
//       sendTime: "2024-01-15 12:20:44",
//       recipientEmail: "ceo@startupxy.com",
//       templateName: "Account Registration Confirmation",
//       status: "success",
//     },
//     {
//       id: "5",
//       sendTime: "2024-01-15 11:15:18",
//       recipientEmail: "billing@enterprise.com",
//       templateName: "Subscription Cancelled",
//       status: "success",
//     },
//     {
//       id: "6",
//       sendTime: "2024-01-15 10:30:55",
//       recipientEmail: "invalid@email",
//       templateName: "Payment Success Confirmation",
//       status: "failed",
//       errorMessage: "Invalid email address",
//     },
//   ]);

//   const handleSaveSettings = () => {
//     toast({
//       title: "Settings Saved",
//       description: "Email automation settings have been updated successfully.",
//     });
//   };

//   return (
//     <div className="min-h-screen ">
//       <div className="mx-auto max-w-[1600px] space-y-6">
//         {/* Top Section - Settings and Template Info */}
//         <div className="grid gap-6 lg:grid-cols-2">
//           {/* Trigger Settings */}
//           <Card className="border-border bg-card">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-lg">
//                 <Settings className="h-5 w-5" />
//                 Trigger Settings
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="trigger-event">Trigger Event</Label>
//                 <Select value={triggerEvent} onValueChange={setTriggerEvent}>
//                   <SelectTrigger id="trigger-event" className="bg-background">
//                     <SelectValue placeholder="Select trigger event" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="subscription">
//                       New Subscription
//                     </SelectItem>
//                     <SelectItem value="payment">Payment Received</SelectItem>
//                     <SelectItem value="cancellation">
//                       Subscription Cancelled
//                     </SelectItem>
//                     <SelectItem value="renewal">
//                       Subscription Renewal
//                     </SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="edm-template">EDM Template Selection</Label>
//                 <Select value={edmTemplate} onValueChange={setEdmTemplate}>
//                   <SelectTrigger id="edm-template" className="bg-background">
//                     <SelectValue placeholder="Select Brevo template" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="welcome">Welcome Email</SelectItem>
//                     <SelectItem value="payment-success">
//                       Payment Success
//                     </SelectItem>
//                     <SelectItem value="payment-failed">
//                       Payment Failed
//                     </SelectItem>
//                     <SelectItem value="cancellation">
//                       Cancellation Notice
//                     </SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="flex items-center justify-between rounded-lg border border-border bg-background p-4">
//                 <div>
//                   <p className="font-medium">Automation Status</p>
//                   <p className="text-sm text-muted-foreground">
//                     {automationEnabled
//                       ? "Automation is enabled"
//                       : "Automation is disabled"}
//                   </p>
//                 </div>
//                 <Switch
//                   checked={automationEnabled}
//                   onCheckedChange={setAutomationEnabled}
//                 />
//               </div>

//               <Button
//                 onClick={handleSaveSettings}
//                 className="w-full bg-black text-white hover:bg-black/90"
//               >
//                 Save Settings
//               </Button>
//             </CardContent>
//           </Card>

//           {/* EDM Template Info */}
//           <Card className="border-border bg-card">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-lg">
//                 <Mail className="h-5 w-5" />
//                 EDM Template Info
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="flex h-[300px] flex-col items-center justify-center text-center">
//                 <Mail className="mb-4 h-16 w-16 text-muted-foreground/40" />
//                 <p className="text-sm text-muted-foreground">
//                   Select a template to view details
//                 </p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Send Logs */}
//         <Card className="border-border bg-card">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2 text-lg">
//               <Clock className="h-5 w-5" />
//               Send Logs
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-border">
//                     <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
//                       Send Time
//                     </th>
//                     <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
//                       Recipient Email
//                     </th>
//                     <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
//                       Template Name
//                     </th>
//                     <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
//                       Status
//                     </th>
//                     <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
//                       Error Message
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {sendLogs.map((log) => (
//                     <tr
//                       key={log.id}
//                       className="border-b border-border/50 last:border-0"
//                     >
//                       <td className="py-4">
//                         <div className="flex items-center gap-2 text-sm">
//                           <Clock className="h-4 w-4 text-muted-foreground" />
//                           {log.sendTime}
//                         </div>
//                       </td>
//                       <td className="py-4">
//                         <div className="flex items-center gap-2 text-sm">
//                           <User className="h-4 w-4 text-muted-foreground" />
//                           {log.recipientEmail}
//                         </div>
//                       </td>
//                       <td className="py-4 text-sm">{log.templateName}</td>
//                       <td className="py-4">
//                         {log.status === "success" ? (
//                           <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
//                             <span className="mr-1">✓</span> Success
//                           </Badge>
//                         ) : (
//                           <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
//                             <span className="mr-1">✕</span> Failed
//                           </Badge>
//                         )}
//                       </td>
//                       <td className="py-4">
//                         {log.errorMessage ? (
//                           <div className="flex items-center gap-2 text-sm text-red-500">
//                             <AlertCircle className="h-4 w-4" />
//                             {log.errorMessage}
//                           </div>
//                         ) : (
//                           <span className="text-sm text-muted-foreground">
//                             -
//                           </span>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  ExternalLink,
  Send,
  CheckCircle,
  XCircle,
  Eye,
  Settings,
  Mail,
  Clock,
  User,
  AlertTriangle,
  RefreshCw,
  Loader2,
} from "lucide-react";
// import { toast } from "sonner";

// Types
interface BrevoTemplate {
  id: string;
  name: string;
  subject: string;
  htmlContent?: string;
  tag?: string;
  createdAt?: string;
  modifiedAt?: string;
  isActive?: boolean;
}

interface SendLog {
  id: number;
  timestamp: string;
  recipient: string;
  templateName: string;
  status: "success" | "failed";
  errorMessage: string | null;
  messageId?: string;
}

interface AutomationRule {
  id?: string;
  trigger: string;
  templateId: string;
  isEnabled: boolean;
  conditions?: string;
}

export default function EDMSettings() {
  // State management
  const [selectedTrigger, setSelectedTrigger] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [testStatus, setTestStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [conditions, setConditions] = useState("");

  // initialize project toast helper (replaces sonner)
  const { toast } = useToast();

  // Brevo integration state
  const [brevoTemplates, setBrevoTemplates] = useState<BrevoTemplate[]>([]);
  const [sendLogs, setSendLogs] = useState<SendLog[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");
  const { addToast, ToastContainer } = useToast();

  const triggerEvents = [
    { value: "subscription_success", label: "Subscription Success" },
    { value: "payment_success", label: "Payment Success" },
    { value: "payment_failed", label: "Payment Failed" },
    { value: "subscription_cancelled", label: "Subscription Cancelled" },
    { value: "account_registered", label: "Account Registration Success" },
  ];

  // Fetch Brevo templates from API
  const fetchBrevoTemplates = async () => {
    if (!isApiKeySet) {
      addToast("Please set your Brevo API key first");
      return;
    }

    setIsLoadingTemplates(true);
    try {
      const response = await fetch("/api/brevo/templates", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch templates");

      const data = await response.json();
      setBrevoTemplates(data.templates || []);
      addToast(
        `Loaded ${data.templates?.length || 0} templates from Brevo success`
      );
    } catch (error) {
      console.error("Error fetching templates:", error);
      addToast("Failed to fetch templates from Brevo error");

      // Fallback to mock data for demo
      setBrevoTemplates([
        {
          id: "101",
          name: "Welcome Email - Subscription Success",
          subject: "Welcome to our platform!",
          modifiedAt: "2024-01-15",
          isActive: true,
        },
        {
          id: "102",
          name: "Payment Success Confirmation",
          subject: "Payment received - Thank you!",
          modifiedAt: "2024-01-10",
          isActive: true,
        },
        {
          id: "103",
          name: "Payment Failed Notification",
          subject: "Payment issue - Action required",
          modifiedAt: "2024-01-12",
          isActive: true,
        },
      ]);
    } finally {
      setIsLoadingTemplates(false);
    }
  };
  console.log(brevoTemplates);

  // Fetch send logs
  const fetchSendLogs = async () => {
    setIsLoadingLogs(true);
    try {
      const response = await fetch("/api/brevo/logs", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch logs");

      const data = await response.json();
      setSendLogs(data.logs || []);
    } catch (error) {
      console.error("Error fetching logs:", error);

      // Fallback to mock data
      setSendLogs([
        {
          id: 1,
          timestamp: new Date().toISOString(),
          recipient: "john.smith@acme.com",
          templateName: "Welcome Email",
          status: "success",
          errorMessage: null,
          messageId: "msg_123456",
        },
        {
          id: 2,
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          recipient: "admin@techstart.io",
          templateName: "Payment Success",
          status: "success",
          errorMessage: null,
          messageId: "msg_123457",
        },
      ]);
    } finally {
      setIsLoadingLogs(false);
    }
  };

  // Get template preview
  const fetchTemplatePreview = async (templateId: string) => {
    try {
      const response = await fetch(`/api/brevo/templates/${templateId}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch template preview");

      const data = await response.json();
      setPreviewHtml(data.htmlContent || "<p>No preview available</p>");
    } catch (error) {
      console.error("Error fetching preview:", error);
      setPreviewHtml(
        "<p>Preview not available. Please check your API connection.</p>"
      );
    }
  };

  // Save automation rule
  const handleSave = async () => {
    if (!selectedTrigger || !selectedTemplate) {
      addToast("Please select both trigger event and EDM template");
      return;
    }

    const automationRule: AutomationRule = {
      trigger: selectedTrigger,
      templateId: selectedTemplate,
      isEnabled,
      conditions,
    };

    try {
      const response = await fetch("/api/brevo/automation", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(automationRule),
      });

      if (!response.ok) throw new Error("Failed to save automation");

      const data = await response.json();
      addToast("EDM automation settings saved successfully");

      // Store rule ID for future updates
      console.log("Automation rule saved:", data);
    } catch (error) {
      console.error("Error saving automation:", error);
      addToast("Failed to save automation settings");
    }
  };

  // Send test email via Brevo
  const handleSendTestEmail = async () => {
    if (!testEmail || !selectedTemplate) {
      addToast("Please enter test email and select a template");
      return;
    }

    if (!isApiKeySet) {
      addToast("Please set your Brevo API key first");
      return;
    }

    setTestStatus("sending");

    try {
      const response = await fetch("/api/brevo/send-test", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          templateId: selectedTemplate,
          to: [{ email: testEmail }],
          params: {
            FIRSTNAME: "Test User",
            COMPANY: "Test Company",
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send test email");
      }

      const data = await response.json();
      setTestStatus("success");
      addToast(`Test email sent successfully! Message ID: ${data.messageId}`);

      // Add to logs
      const newLog: SendLog = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        recipient: testEmail,
        templateName: getSelectedTemplate()?.name || "Unknown",
        status: "success",
        errorMessage: null,
        messageId: data.messageId,
      };
      setSendLogs([newLog, ...sendLogs]);
    } catch (error) {
      console.error("Error sending test email:", error);
      setTestStatus("error");
      addToast("Failed to send test email");
    }

    setTimeout(() => setTestStatus("idle"), 3000);
  };

  // Open Brevo editor in new tab
  const openBrevoEditor = () => {
    const template = getSelectedTemplate();
    if (template) {
      // Official Brevo template editor URL
      window.open(
        `https://my.brevo.com/camp/template/${template.id}/message-setup`,
        "_blank"
      );
      addToast("Opening Brevo editor in new tab");
    }
  };

  const getSelectedTemplate = () => {
    return brevoTemplates.find((template) => template.id === selectedTemplate);
  };

  // Load templates on API key set
  useEffect(() => {
    if (isApiKeySet) {
      fetchBrevoTemplates();
      fetchSendLogs();
    }
  }, [isApiKeySet]);

  // Load preview when template selected
  useEffect(() => {
    if (selectedTemplate && isApiKeySet) {
      fetchTemplatePreview(selectedTemplate);
    }
  }, [selectedTemplate, isApiKeySet]);

  return (
    <div className="flex-1 overflow-auto">
      <ToastContainer />
      <div className="">
        <div className="">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">EDM Auto-Send Settings</h2>
            <p className="text-muted-foreground">
              Configure automated email campaigns integrated with Brevo EDM
              platform
            </p>
          </div>

          {/* API Key Configuration */}
          {!isApiKeySet && (
            <Card className="mb-6 border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-900">
                  Brevo API Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Brevo API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      placeholder="Enter your Brevo API key (xkeysib-...)"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={() => {
                        if (apiKey) {
                          setIsApiKeySet(true);
                          addToast("API key set successfully");
                        } else {
                          addToast("Please enter a valid API key");
                        }
                      }}
                    >
                      Connect
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Get your API key from Brevo Dashboard → SMTP & API → API
                    Keys
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Left Column - Trigger Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Trigger Settings
                  </div>
                  {isApiKeySet && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={fetchBrevoTemplates}
                      disabled={isLoadingTemplates}
                    >
                      {isLoadingTemplates ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Trigger Event Selection */}
                <div className="space-y-2">
                  <Label>Trigger Event</Label>
                  <Select
                    value={selectedTrigger}
                    onValueChange={setSelectedTrigger}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select trigger event" />
                    </SelectTrigger>
                    <SelectContent>
                      {triggerEvents.map((event) => (
                        <SelectItem key={event.value} value={event.value}>
                          {event.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Conditions */}
                <div className="space-y-2">
                  <Label>Conditions (Optional)</Label>
                  <Input
                    placeholder="e.g., Only send to first-time subscribers"
                    value={conditions}
                    onChange={(e) => setConditions(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Add specific conditions for when this automation should
                    trigger
                  </p>
                </div>

                {/* Template Selection */}
                <div className="space-y-2">
                  <Label>EDM Template Selection</Label>
                  <Select
                    value={selectedTemplate}
                    onValueChange={setSelectedTemplate}
                    disabled={!isApiKeySet || isLoadingTemplates}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          isLoadingTemplates
                            ? "Loading templates..."
                            : "Select Brevo template"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {brevoTemplates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name} (ID: {template.id})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Enable/Disable Toggle */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Automation Status</Label>
                    <p className="text-sm text-muted-foreground">
                      {isEnabled
                        ? "Automation is active"
                        : "Automation is disabled"}
                    </p>
                  </div>
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={setIsEnabled}
                    className="bg-[#F6339A]"
                  />
                </div>

                {/* Save Button */}
                <div className="pt-4">
                  <Button
                    onClick={handleSave}
                    className="w-full bg-gradient-to-r from-[#F6339A] to-[#9810FA]"
                    disabled={!isApiKeySet}
                  >
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Right Column - Template Info & Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  EDM Template Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {getSelectedTemplate() ? (
                  <>
                    {/* Template Details */}
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm">Template Name</Label>
                        <p className="text-sm mt-1">
                          {getSelectedTemplate()?.name}
                        </p>
                      </div>

                      <div>
                        <Label className="text-sm">Template ID</Label>
                        <p className="text-sm mt-1 font-mono">
                          {getSelectedTemplate()?.id}
                        </p>
                      </div>

                      <div>
                        <Label className="text-sm">Subject Line</Label>
                        <p className="text-sm mt-1">
                          {getSelectedTemplate()?.subject}
                        </p>
                      </div>

                      <div>
                        <Label className="text-sm">Last Modified</Label>
                        <p className="text-sm mt-1">
                          {getSelectedTemplate()?.modifiedAt}
                        </p>
                      </div>

                      <div>
                        <Label className="text-sm">Status</Label>
                        <Badge
                          variant={
                            getSelectedTemplate()?.isActive
                              ? "default"
                              : "secondary"
                          }
                          className="mt-1 bg-[#9810FA]"
                        >
                          {getSelectedTemplate()?.isActive
                            ? "Active"
                            : "Inactive"}
                        </Badge>
                      </div>
                    </div>

                    <Separator />

                    {/* Edit Button */}
                    <Button
                      variant="outline"
                      onClick={openBrevoEditor}
                      className="w-full"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Edit in Brevo Editor
                    </Button>

                    <Separator />

                    {/* Preview Area */}
                    <div className="space-y-3">
                      <Label className="text-sm">Email Preview</Label>
                      <div className="border-2 border-muted rounded-lg overflow-hidden bg-white">
                        {previewHtml ? (
                          <div
                            className="p-4 max-h-64 overflow-y-auto text-sm"
                            dangerouslySetInnerHTML={{ __html: previewHtml }}
                          />
                        ) : (
                          <div className="p-8 text-center">
                            <Eye className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">
                              Loading preview...
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator />

                    {/* Test Email Section */}
                    <div className="space-y-3">
                      <Label className="text-sm">Send Test Email</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter test email address"
                          value={testEmail}
                          onChange={(e) => setTestEmail(e.target.value)}
                          className="flex-1"
                          disabled={!isApiKeySet}
                        />
                        <Button
                          variant="outline"
                          onClick={handleSendTestEmail}
                          disabled={testStatus === "sending" || !isApiKeySet}
                        >
                          {testStatus === "sending" ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Send className="h-4 w-4" />
                          )}
                        </Button>
                      </div>

                      {testStatus === "success" && (
                        <div className="flex items-center text-green-600 text-sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Test email sent successfully
                        </div>
                      )}

                      {testStatus === "error" && (
                        <div className="flex items-center text-red-600 text-sm">
                          <XCircle className="h-4 w-4 mr-1" />
                          Failed to send test email
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Select a template to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Bottom Section - Send Logs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Send Logs
                </div>
                {isApiKeySet && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchSendLogs}
                    disabled={isLoadingLogs}
                  >
                    {isLoadingLogs ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 text-sm font-medium">
                        Send Time
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium">
                        Recipient Email
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium">
                        Template Name
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium">
                        Status
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium">
                        Message ID
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sendLogs.map((log) => (
                      <tr key={log.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2">
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            {new Date(log.timestamp).toLocaleString()}
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center text-sm">
                            <User className="h-4 w-4 mr-2 text-muted-foreground" />
                            {log.recipient}
                          </div>
                        </td>
                        <td className="py-3 px-2 text-sm">
                          {log.templateName}
                        </td>
                        <td className="py-3 px-2">
                          <Badge
                            className="bg-[#9810FA]"
                            variant={
                              log.status === "success"
                                ? "default"
                                : "destructive"
                            }
                          >
                            <div className="flex items-center">
                              {log.status === "success" ? (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              ) : (
                                <XCircle className="h-3 w-3 mr-1" />
                              )}
                              {log.status === "success" ? "Success" : "Failed"}
                            </div>
                          </Badge>
                        </td>
                        <td className="py-3 px-2 text-sm">
                          {log.errorMessage ? (
                            <div className="flex items-center text-red-600">
                              <AlertTriangle className="h-4 w-4 mr-1" />
                              {log.errorMessage}
                            </div>
                          ) : (
                            <span className="text-muted-foreground font-mono text-xs">
                              {log.messageId || "-"}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {sendLogs.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No email send logs yet</p>
                  <p className="text-sm">
                    Logs will appear here when automated emails are sent
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
