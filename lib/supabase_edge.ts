// lib/supabase_edge.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qfvivtpkrxfawzxusapg.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmdml2dHBrcnhmYXd6eHVzYXBnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjA2NTg3NCwiZXhwIjoyMDY3NjQxODc0fQ.V56q8el-cMi_TUDZDheQf6Dykr3CF-_VnnG2GNWW6HE'

// Create admin client with service role (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export const updateOverdueTagTimers = async () => {
  console.log("🚀 Running Supabase function to update overdue tag timers...");
  console.log("⏰ Current time:", new Date().toISOString());
  
  try {
    // Fetch all in-progress timers
    const { data: tagTimers, error: fetchError } = await supabase
      .from('TagTimer')
      .select('*')
      .is('endTime', null)
      .eq('tagStatus', 'in_progress');

    if (fetchError) {
      console.error("❌ Error fetching tag timers:", fetchError);
      throw fetchError;
    }

    console.log(`📊 Found ${tagTimers?.length || 0} in-progress timers to check`);

    if (!tagTimers || tagTimers.length === 0) {
      console.log("✨ No timers to update");
      return { success: true, updated: 0 };
    }

    const now = new Date().getTime();
    let updatedCount = 0;
    const timerUpdates = [];

    // Check each timer for overdue status
    for (const timer of tagTimers) {
      const startTime = new Date(timer.startTime).getTime();
      const deadline = startTime + (timer.countDownSec * 1000);
      const isOverdue = now > deadline;
      
      console.log(`⏱️  Timer ID ${timer.id}: Started ${timer.startTime}, Deadline ${new Date(deadline).toISOString()}, Overdue: ${isOverdue}`);
      
      if (isOverdue) {
        timerUpdates.push(timer.id);
      }
    }

    // Batch update all overdue timers
    if (timerUpdates.length > 0) {
      const { error: updateError } = await supabase
        .from('TagTimer')
        .update({ 
          tagStatus: 'overdue',
          updatedAt: new Date().toISOString()
        })
        .in('id', timerUpdates);

      if (updateError) {
        console.error("❌ Error updating timers:", updateError);
        throw updateError;
      }

      updatedCount = timerUpdates.length;
      console.log(`✅ Updated ${updatedCount} timers to overdue`);
    }
    
    console.log(`✨ Updated ${updatedCount} overdue timers successfully.`);
    console.log("🏁 Function completed successfully");
    
    return { 
      success: true, 
      updated: updatedCount,
      checked: tagTimers.length,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error("❌ Error in updateOverdueTagTimers:", error);
    throw error;
  }
}

// Alternative: Update specific timer by ID
export const updateTimerStatus = async (timerId: string, status: 'in_progress' | 'completed' | 'overdue') => {
  try {
    const { data, error } = await supabase
      .from('TagTimer')
      .update({ 
        tagStatus: status,
        updatedAt: new Date().toISOString(),
        ...(status === 'completed' ? { endTime: new Date().toISOString() } : {})
      })
      .eq('id', timerId)
      .select()
      .single();

    if (error) {
      console.error("Error updating timer status:", error);
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error in updateTimerStatus:", error);
    throw error;
  }
}

// Get overdue timers
export const getOverdueTimers = async () => {
  try {
    const { data, error } = await supabase
      .from('TagTimer')
      .select(`
        *,
        ClientEntry (
          id,
          Client (
            id,
            name
          )
        )
      `)
      .eq('tagStatus', 'overdue')
      .is('endTime', null)
      .order('startTime', { ascending: false });

    if (error) {
      console.error("Error fetching overdue timers:", error);
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error in getOverdueTimers:", error);
    throw error;
  }
}

// Check if a specific timer is overdue
export const checkTimerOverdue = async (entryId: string, tagName: string) => {
  try {
    const { data: timer, error } = await supabase
      .from('TagTimer')
      .select('*')
      .eq('entryId', entryId)
      .eq('tagName', tagName)
      .eq('tagStatus', 'in_progress')
      .is('endTime', null)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error("Error checking timer:", error);
      throw error;
    }

    if (!timer) {
      return { isOverdue: false, timer: null };
    }

    const now = new Date().getTime();
    const startTime = new Date(timer.startTime).getTime();
    const deadline = startTime + (timer.countDownSec * 1000);
    const isOverdue = now > deadline;

    if (isOverdue) {
      // Update to overdue
      await updateTimerStatus(timer.id, 'overdue');
    }

    return { 
      isOverdue, 
      timer,
      timeRemaining: Math.max(0, deadline - now)
    };
  } catch (error) {
    console.error("Error in checkTimerOverdue:", error);
    throw error;
  }
}

export async function testSupabase() {
  try {
    await updateOverdueTagTimers();
  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

testSupabase()