import { Component, ElementRef, ViewChild } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'socket-client';

  /**
   * @type {ElementRef}
   * @memberof AppComponent
   * @description Reference to the canvas element
   */
  @ViewChild('hostCanvas', { static: true }) hostCanvas!: ElementRef;

  private ctx!: CanvasRenderingContext2D;
  private socket: any;

  constructor(private _socketService: SocketService) { }

  ngOnInit() {
    let x: number;
    let y: number;
    this.socket = this._socketService.socket; // get the socket instance from the service

    this.ctx = this.hostCanvas.nativeElement.getContext('2d'); // get the context of the canvas element
    let isDrawing = false;

    // mouse events to get coordinates
    this.hostCanvas.nativeElement.addEventListener('mousedown', (e: any) => {
      if (!e || !e.clientX || !e.clientY) return;
      x = e.clientX - this.hostCanvas.nativeElement.getBoundingClientRect().left;
      y = e.clientY - this.hostCanvas.nativeElement.getBoundingClientRect().top;
      isDrawing = true;
    });

    this.hostCanvas.nativeElement.addEventListener('mousemove', (e: any) => {
      if (isDrawing) {
        this.ctx.lineWidth = 10;
        this.ctx.strokeStyle = 'red';
        this.ctx.lineCap = 'round';
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();

        this.socket.emit('host-event', { x, y }); // emit the coordinates to the server
      }


    });

    this.hostCanvas.nativeElement.addEventListener('mouseup', (e: any) => {
      if (isDrawing) {
        isDrawing = false;
      }
    });

  };
}
