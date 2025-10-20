import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

/**
 * GET - Fetch email send logs with pagination and filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Pagination parameters
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    // Filter parameters
    const status = searchParams.get("status"); // 'success' | 'failed'
    const recipient = searchParams.get("recipient");
    const templateId = searchParams.get("templateId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    // Build where clause
    const where: Prisma.EmailLogWhereInput = {};

    if (status) where.status = status;
    if (recipient)
      where.recipient = { contains: recipient, mode: "insensitive" };
    if (templateId) where.templateId = templateId;

    if (startDate || endDate) {
      where.timestamp = {};
      if (startDate) where.timestamp.gte = new Date(startDate);
      if (endDate) where.timestamp.lte = new Date(endDate);
    }

    // Fetch logs with pagination
    const [logs, totalCount] = await Promise.all([
      prisma.emailLog.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          timestamp: "desc",
        },
        include: {
          automationRule: {
            select: {
              id: true,
              trigger: true,
              templateId: true,
            },
          },
        },
      }),
      prisma.emailLog.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      logs: logs,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasNextPage: page * limit < totalCount,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching email logs:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch email logs",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * POST - Create new email log entry
 * This is typically called after sending an email via Brevo
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation
    if (!body.recipient || !body.templateId || !body.status) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing required fields: recipient, templateId, and status are required",
        },
        { status: 400 }
      );
    }

    const newLog = await prisma.emailLog.create({
      data: {
        timestamp: new Date(),
        recipient: body.recipient,
        templateId: body.templateId,
        templateName: body.templateName,
        status: body.status,
        errorMessage: body.errorMessage || null,
        messageId: body.messageId || null,
        automationRuleId: body.automationRuleId || null,
        metadata: body.metadata || {},
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Email log created successfully",
        data: newLog,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating email log:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create email log",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * GET - Fetch statistics about email logs
 * Endpoint: /api/brevo/logs/stats
 */
export async function getStats(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get("days") || "7");

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const [totalSent, successCount, failedCount, logsByTemplate] =
      await Promise.all([
        // Total emails sent
        prisma.emailLog.count({
          where: {
            timestamp: { gte: startDate },
          },
        }),

        // Success count
        prisma.emailLog.count({
          where: {
            status: "success",
            timestamp: { gte: startDate },
          },
        }),

        // Failed count
        prisma.emailLog.count({
          where: {
            status: "failed",
            timestamp: { gte: startDate },
          },
        }),

        // Logs grouped by template
        prisma.emailLog.groupBy({
          by: ["templateId", "templateName"],
          where: {
            timestamp: { gte: startDate },
          },
          _count: {
            id: true,
          },
          orderBy: {
            _count: {
              id: "desc",
            },
          },
        }),
      ]);

    const successRate = totalSent > 0 ? (successCount / totalSent) * 100 : 0;

    return NextResponse.json({
      success: true,
      stats: {
        totalSent,
        successCount,
        failedCount,
        successRate: successRate.toFixed(2),
        period: `Last ${days} days`,
        byTemplate: logsByTemplate.map((log) => ({
          templateId: log.templateId,
          templateName: log.templateName,
          count: log._count.id,
        })),
      },
    });
  } catch (error) {
    console.error("Error fetching email statistics:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch email statistics",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
