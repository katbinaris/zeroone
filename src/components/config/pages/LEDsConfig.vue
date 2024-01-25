<template>
  <TabsContent value="led-config" class="mt-0">
    <div class="w-96 bg-zinc-900 bg-opacity-40">
      <ScrollArea class="h-[720px]">
        <div class="flex flex-row h-12 items-center px-4 text-sm bg-zinc-900">

          <div class="flex-none">
            <GaugeCircle class="h-4 w-4" />
          </div>
          <div class="flex-initial"><h2 class="text-sm px-2 py-4">Feedback Type</h2></div>

        </div>
        <Separator />

        <Tabs default-value="fd">
          <TabsList class="grid grid-cols-4 h-auto text-muted-foreground">
            <TabsTrigger value="fd">
              <div class="grid grid-flow-row auto-rows-max justify-items-center ">
                <div class="size-16 mb-2">
                  <img src="../../../assets/gui-ico/ico-fd.svg">
                </div>
                <span class="text-xs leading-3 text-wrap">
        Fine Detents
      </span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="cd">
              <div class="grid grid-flow-row auto-rows-max justify-items-center">
                <div class="size-16 mb-2">
                  <img src="../../../assets/gui-ico/ico-cd.svg">
                </div>
                <span class="text-xs leading-3 text-wrap">
        Coarse Detents
      </span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="vr">
              <div class="grid grid-flow-row auto-rows-max justify-items-center">
                <div class="size-16 mb-2">
                  <img src="../../../assets/gui-ico/ico-vf.svg">
                </div>
                <span class="text-xs leading-3 text-wrap">
        Viscous Rotation
      </span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="rt">
              <div class="grid grid-flow-row auto-rows-max justify-items-center">
                <div class="size-16 mb-2">
                  <img src="../../../assets/gui-ico/ico-rc.svg">
                </div>
                <span class="text-xs leading-3 text-wrap">
        Return to Center
      </span>
              </div>
            </TabsTrigger>
          </TabsList>

        </Tabs>

        <Separator />
        <div class="flex flex-col p-8 pt-4">
          <span class="text-sm text-muted-foreground font-mono h-8 text-center">Total Positions</span>

          <div class="flex w-full max-w-sm items-center gap-0">
            <Button type="submit" class="rounded-l-full text-xl font-mono align-middle font-bold">
              -
            </Button>
            <Input
              id="positions" class="rounded-none text-xl font-pixellg" type="number" placeholder="10"
              default-value="60" max="65535" min="10" />
            <Button type="submit" class="rounded-r-full text-xl font-mono font-bold">
              +
            </Button>
          </div>

        </div>
        <Separator />

        <div class="flex flex-row h-12 items-center px-4 text-sm bg-zinc-900">

          <div class="flex-none">
            <AudioWaveform class="h-4 w-4" />
          </div>
          <div class="grow">
            <h2 class="text-sm px-2 py-4">Haptic Response</h2>
          </div>
          <div class="flex-none">
            <Toggle
              class="data-[state=on]:ring-emerald-600 data-[state=on]:ring-1" variant="outline"
              size="sm" :default-value="true" aria-label="EnablePrimary">
              <Power class="w-4 h-4" />
            </Toggle>
          </div>

        </div>
        <Separator />

        <div class="flex flex-col p-8 pt-4">
          <span class="text-sm text-muted-foreground font-mono">Feedback Strength</span>
          <Slider :default-value="[2]" :max="4" :step="1" class="pt-4" />
          <div class="flex flex-row px-1 py-1.5">
            <div class="flex-1 text-xs text-muted-foreground font-mono text-left">Min</div>
            <div class="flex-1 text-xs text-muted-foreground font-mono indent-4">|</div>
            <div class="flex-1 text-xs text-muted-foreground font-mono indent-3">Default</div>
            <div class="flex-1 text-xs text-muted-foreground font-mono indent-10">|</div>
            <div class="flex-1 text-xs text-muted-foreground font-mono text-right">Max</div>
          </div>

        </div>
        <Separator />
        <div class="flex flex-col p-8 pt-4">
          <span class="text-sm text-muted-foreground font-mono">Bounce Back Strength</span>
          <Slider :default-value="[2]" :max="4" :step="1" class="pt-4" />
          <div class="flex flex-row px-1 py-1.5">
            <div class="flex-1 text-xs text-muted-foreground font-mono text-left">Min</div>
            <div class="flex-1 text-xs text-muted-foreground font-mono indent-4">|</div>
            <div class="flex-1 text-xs text-muted-foreground font-mono indent-3">Default</div>
            <div class="flex-1 text-xs text-muted-foreground font-mono indent-10">|</div>
            <div class="flex-1 text-xs text-muted-foreground font-mono text-right">Max</div>
          </div>
        </div>
        <Separator />
        <div class="flex flex-col p-8 pt-4">
          <span class="text-sm text-muted-foreground font-mono">Output Ramp Dampening</span>
          <Slider :default-value="[4]" :max="4" :step="1" class="pt-4" />
          <div class="flex flex-row px-1 py-1.5">
            <div class="flex-1 text-xs text-muted-foreground font-mono text-left">Min</div>
            <div class="flex-1 text-xs text-muted-foreground font-mono indent-4">|</div>
            <div class="flex-1 text-xs text-muted-foreground font-mono indent-3">Default</div>
            <div class="flex-1 text-xs text-muted-foreground font-mono indent-10">|</div>
            <div class="flex-1 text-xs text-muted-foreground font-mono text-right">Max</div>
          </div>

        </div>
        <Separator />
        <div class="flex flex-row h-12 items-center px-4 text-sm bg-zinc-900">

          <div class="flex-none">
            <AudioLines class="h-4 w-4" />
          </div>
          <div class="grow"><h2 class="text-sm px-2 py-4"> Auditory Response</h2></div>
          <div class="flex-none">
            <Toggle
              class="data-[state=on]:ring-emerald-600 data-[state=on]:ring-1" variant="outline"
              size="sm" :default-value="true" aria-label="EnablePrimary">
              <Power class="w-4 h-4" />
            </Toggle>
          </div>
        </div>
        <Separator />
        <div class="flex flex-col p-8 pt-4">
          <span class="text-sm text-muted-foreground font-mono">Auditory Haptic Level</span>
          <Slider :default-value="[2]" :max="4" :step="1" class="pt-4" />
          <div class="flex flex-row px-1 py-1.5">
            <div class="flex-1 text-xs text-muted-foreground font-mono text-left">Min</div>
            <div class="flex-1 text-xs text-muted-foreground font-mono indent-4">|</div>
            <div class="flex-1 text-xs text-muted-foreground font-mono indent-3">Default</div>
            <div class="flex-1 text-xs text-muted-foreground font-mono indent-10">|</div>
            <div class="flex-1 text-xs text-muted-foreground font-mono text-right">Max</div>
          </div>
        </div>
        <Separator />
        <div class="flex flex-col p-8 pt-4">

          <span class="text-sm text-muted-foreground font-mono">Auditory Magnitude</span>
          <Slider :default-value="[2]" :max="4" :step="1" class="pt-4" />
          <div class="flex flex-row px-1 py-1.5">
            <div class="flex-1 text-xs text-muted-foreground font-mono text-left">Faint</div>
            <div class="flex-1 text-xs text-muted-foreground font-mono indent-2">Soft</div>
            <div class="flex-1 text-xs text-muted-foreground font-mono indent-3">Default</div>
            <div class="flex-1 text-xs text-muted-foreground font-mono indent-7">Medium</div>
            <div class="flex-1 text-xs text-muted-foreground font-mono text-right">Hard</div>
          </div>


        </div>
      </ScrollArea>
      <Separator />


    </div>
  </TabsContent>
</template>
<script setup>
import { ScrollArea } from '@/components/ui/scroll-area/index.js'
import { Tabs } from '@/components/ui/tabs/index.js'
import { Slider } from '@/components/ui/slider/index.js'
import { GaugeCircle, AudioLines, AudioWaveform, Power } from 'lucide-vue-next'
</script>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
  text-align: center;
}
</style>