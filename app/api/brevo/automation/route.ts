import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust path to your Prisma client

// Type definitions
interface AutomationRule {
  trigger: string;
  templateId: string;
  isEnabled: boolean;
  conditions?: string;
}

/**
 * GET - Fetch all automation rules
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const trigger = searchParams.get("trigger");
    const isEnabled = searchParams.get("isEnabled");

    // Build where clause
    const where: any = {};
    if (trigger) where.trigger = trigger;
    if (isEnabled !== null) where.isEnabled = isEnabled === "true";

    const automations = await prisma.automationRule.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: automations,
      count: automations.length,
    });
  } catch (error) {
    console.error("Error fetching automation rules:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch automation rules",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * POST - Create new automation rule
 */
export async function POST(request: NextRequest) {
  try {
    const body: AutomationRule = await request.json();

    // Validation
    if (!body.trigger || !body.templateId) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: trigger and templateId are required",
        },
        { status: 400 }
      );
    }

    // Get user from session/auth (adjust based on your auth system)
    // Example with NextAuth:
    // const session = await getServerSession(authOptions);
    // if (!session?.user?.id) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // For demo purposes, using a placeholder userId
    const userId = "user_placeholder_id"; // Replace with actual user ID from session

    // Check if automation rule already exists for this trigger
    const existingRule = await prisma.automationRule.findFirst({
      where: {
        trigger: body.trigger,
        userId: userId,
      },
    });

    if (existingRule) {
      // Update existing rule
      const updatedRule = await prisma.automationRule.update({
        where: {
          id: existingRule.id,
        },
        data: {
          templateId: body.templateId,
          isEnabled: body.isEnabled,
          conditions: body.conditions,
          updatedAt: new Date(),
        },
      });

      return NextResponse.json({
        success: true,
        message: "Automation rule updated successfully",
        data: updatedRule,
      });
    }

    // Create new automation rule
    const newRule = await prisma.automationRule.create({
      data: {
        trigger: body.trigger,
        templateId: body.templateId,
        isEnabled: body.isEnabled,
        conditions: body.conditions,
        userId: userId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Automation rule created successfully",
        data: newRule,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating automation rule:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create automation rule",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH - Update existing automation rule
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Automation rule ID is required" },
        { status: 400 }
      );
    }

    const updatedRule = await prisma.automationRule.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Automation rule updated successfully",
      data: updatedRule,
    });
  } catch (error) {
    console.error("Error updating automation rule:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update automation rule",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Delete automation rule
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Automation rule ID is required" },
        { status: 400 }
      );
    }

    await prisma.automationRule.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Automation rule deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting automation rule:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete automation rule",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
