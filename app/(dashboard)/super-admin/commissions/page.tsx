"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  DollarSign,
  Clock,
  CheckCircle,
  TrendingUp,
  MoreVertical,
  Plus,
  Search,
  Filter,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CommissionRule {
  id: string;
  name: string;
  rate: string;
  govtTax: string;
  minWithdrawal: string;
}

export default function CommissionRules() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddRuleOpen, setIsAddRuleOpen] = useState(false);
  const [isEditRuleOpen, setIsEditRuleOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<CommissionRule | null>(null);
  const [newRule, setNewRule] = useState({
    name: "",
    rate: "",
    govtTax: "",
    minWithdrawal: "",
  });

  const [rules, setRules] = useState<CommissionRule[]>([
    {
      id: "1",
      name: "Standard commission rule",
      rate: "10%",
      govtTax: "5%",
      minWithdrawal: "NT$ 5,250",
    },
    {
      id: "2",
      name: "Premium commission rule",
      rate: "15%",
      govtTax: "5%",
      minWithdrawal: "NT$ 13,875",
    },
    {
      id: "3",
      name: "VIP partner rule",
      rate: "20%",
      govtTax: "5%",
      minWithdrawal: "NT$ 23,125",
    },
  ]);

  const handleAddRule = () => {
    if (!newRule.name || !newRule.rate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const rule: CommissionRule = {
      id: Date.now().toString(),
      name: newRule.name,
      rate: newRule.rate + "%",
      govtTax: newRule.govtTax + "%",
      minWithdrawal: "NT$ " + newRule.minWithdrawal,
    };

    setRules([...rules, rule]);
    setIsAddRuleOpen(false);
    setNewRule({ name: "", rate: "", govtTax: "", minWithdrawal: "" });
    toast({
      title: "Rule Added",
      description: "Commission rule has been created successfully.",
    });
  };

  const handleEditRule = (rule: CommissionRule) => {
    setEditingRule(rule);
    setIsEditRuleOpen(true);
  };

  const handleUpdateRule = () => {
    if (!editingRule) return;

    setRules(rules.map((r) => (r.id === editingRule.id ? editingRule : r)));
    setIsEditRuleOpen(false);
    setEditingRule(null);
    toast({
      title: "Rule Updated",
      description: "Commission rule has been updated successfully.",
    });
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter((r) => r.id !== id));
    toast({
      title: "Rule Deleted",
      description: "Commission rule has been removed.",
    });
  };

  return (
    <div className="min-h-screen ">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                  <DollarSign className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Commissions
                  </p>
                  <p className="text-2xl font-bold">NT$ 5,319</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-500/10">
                  <Clock className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">NT$ 925</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                  <CheckCircle className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold">NT$ 2,081</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Paid</p>
                  <p className="text-2xl font-bold">NT$ 2,313</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search commissions Rules"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              All Status
            </Button>
          </div>
        </div>

        {/* Commission Rules Table */}
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Commission Rules</h2>
              <Button
                onClick={() => setIsAddRuleOpen(true)}
                size="sm"
                className="bg-[#C06EF3] text-white hover:bg-[#8b32c2]"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add a Rule
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                      Rule name
                    </th>
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                      Commission Rate
                    </th>
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                      Govt. Business Tax
                    </th>
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                      Minimum withdrawal
                    </th>
                    <th className="pb-3 text-right text-sm font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rules.map((rule) => (
                    <tr
                      key={rule.id}
                      className="border-b border-border/50 last:border-0"
                    >
                      <td className="py-4 text-sm">{rule.name}</td>
                      <td className="py-4 text-sm">{rule.rate}</td>
                      <td className="py-4 text-sm text-red-500">
                        {rule.govtTax}
                      </td>
                      <td className="py-4 text-sm text-blue-500">
                        {rule.minWithdrawal}
                      </td>
                      <td className="py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEditRule(rule)}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteRule(rule.id)}
                              className="text-red-500"
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Rule Modal */}
      <Dialog open={isAddRuleOpen} onOpenChange={setIsAddRuleOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Add a Rule</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rule-name">Name of the rule</Label>
              <Input
                id="rule-name"
                placeholder="Name of the rule"
                value={newRule.name}
                onChange={(e) =>
                  setNewRule({ ...newRule, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="commission-rate">Commission Percentage</Label>
              <Input
                id="commission-rate"
                placeholder="10%"
                value={newRule.rate}
                onChange={(e) =>
                  setNewRule({ ...newRule, rate: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="govt-tax">Govt Tax</Label>
              <Input
                id="govt-tax"
                placeholder="Enter here"
                value={newRule.govtTax}
                onChange={(e) =>
                  setNewRule({ ...newRule, govtTax: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="min-withdrawal">Minimum withdrawal amount</Label>
              <Input
                id="min-withdrawal"
                placeholder="NT734"
                value={newRule.minWithdrawal}
                onChange={(e) =>
                  setNewRule({ ...newRule, minWithdrawal: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRuleOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddRule}
              className="bg-[#C06EF3] text-white hover:bg-[#8220be]"
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Rule Modal */}
      <Dialog open={isEditRuleOpen} onOpenChange={setIsEditRuleOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Edit Rule</DialogTitle>
          </DialogHeader>
          {editingRule && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-rule-name">Name of the rule</Label>
                <Input
                  id="edit-rule-name"
                  value={editingRule.name}
                  onChange={(e) =>
                    setEditingRule({ ...editingRule, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-commission-rate">Commission Rate</Label>
                <Input
                  id="edit-commission-rate"
                  value={editingRule.rate}
                  onChange={(e) =>
                    setEditingRule({ ...editingRule, rate: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-govt-tax">Govt Tax</Label>
                <Input
                  id="edit-govt-tax"
                  value={editingRule.govtTax}
                  onChange={(e) =>
                    setEditingRule({ ...editingRule, govtTax: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-min-withdrawal">Minimum withdrawal</Label>
                <Input
                  id="edit-min-withdrawal"
                  value={editingRule.minWithdrawal}
                  onChange={(e) =>
                    setEditingRule({
                      ...editingRule,
                      minWithdrawal: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditRuleOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdateRule}
              className="bg-gradient-to-r from-[#F6339A] to-[#9810FA] text-white hover:bg-black/90"
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
